const User = require("../../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Profile Data Read
exports.getUserProfile = async (req, res) => {
  try {
    console.log("Hello World");
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    res.status(200).json({
      status: "Success",
      data: {
        currentUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
