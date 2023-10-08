const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const reqTime = new Date();

    // ၁. request body ထဲမှာ Email / Password နဲ့ User ရှိ/မရှိ စစ်
    if (!email || !password) {
      return next(new AppError("Please Provide Email and Password", 400));
    }

    // ၂. ရှိတယ်ဆိုရင် Password ကိုတိုက်စစ်ပြီး User က လက်ရှိ သုံးနေ / မသုံးနေကို စစ်
    const user = await User.findOneAndUpdate(
      { email },
      { loginTime: reqTime }
    ).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or Password", 400));
    }

    // ၃. အပေါ်နှစ်ခုမှန်ရင် JWT ကို Client ဘက်ကိုပို့
    const token = signToken(user._id);
    res.status(200).json({
      stauts: "Success",
      token,
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.userProtect = catchAsync(async (req, res, next) => {
  //1. Request လုပ်တဲ့ Client မှာ Token ရှိ/မရှိ စစ်ပါတယ်။
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not login , Please Login!", 401));
  }
  //2. ရှိတယ်ဆိုတဲ့ Token ကရော တစ်ကယ် မှန်/မမှန် စစ်ပါတယ်။

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Token မှန်တယ်ဆိုရင်တောင် Token ပိုင်ရှင် User က ရှိနေသေးတာ ဟုတ်/မဟုတ် ကိုစစ်ပါတယ်။
  const currentUser = await User.findById(decoded.id);
  console.log(currentUser.status, "line 85");
  if (!currentUser.status) {
    return next(new AppError("This User has been banned", 401));
  }
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  //4. Token ယူပြီးမှ User က Password ချိန်းလိုက်တဲ့အခြေအနေကိုလဲ စစ်ထားဖို့လိုပါတယ်။
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently Change Password ! Please Login Again", 401)
    );
  }
  req.user = currentUser;
  // console.log(req, "This is req value");

  next();
});
