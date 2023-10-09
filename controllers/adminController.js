const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Read All Admin Account
exports.getAdminAccAll = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Admin.find(JSON.parse(queryStr));

    // Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    // Find
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // Pagination

    const allAdminAcc = await query;

    res.status(200).json({
      status: "Success",
      data: {
        allAdmins: allAdminAcc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body);
    const token = signToken(newAdmin._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        newAdmin,
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

    // ၁. DB ထဲမှာ Email / Password နဲ့ User ရှိ/မရှိ စစ်
    if (!email || !password) {
      return next(new AppError("Please Provide Email and Password", 400));
    }

    // ၂. ရှိတယ်ဆိုရင် Password ကိုတိုက်စစ်ပြီး User က လက်ရှိ သုံးနေ / မသုံးနေကို စစ်
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return next(new AppError("Incorrect Email or Password", 400));
    }

    // ၃. အပေါ်နှစ်ခုမှန်ရင် JWT ကို Client ဘက်ကိုပို့
    const token = signToken(admin._id);
    res.status(200).json({
      stauts: "Success",
      token,
      admin,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.adminProtect = catchAsync(async (req, res, next) => {
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
  const currentAdmin = await Admin.findById(decoded.id);
  if (!currentAdmin) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  //4. Token ယူပြီးမှ User က Password ချိန်းလိုက်တဲ့အခြေအနေကိုလဲ စစ်ထားဖို့လိုပါတယ်။
  if (currentAdmin.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently Change Password ! Please Login Again", 401)
    );
  }
  req.admin = currentAdmin;
  // console.log(req.admin);

  next();
});
