const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminAccSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide A Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide A Password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm Your Password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and Confirm Password are not same and Try Again.",
    },
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userroles",
    required: true,
  },
  profileImg: String,
  unit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mainunits",
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
});

adminAccSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; // Update to 'confirmPassword'
  next();
});

adminAccSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

adminAccSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
const AdminAcc = mongoose.model("AdminAcc", adminAccSchema);
module.exports = AdminAcc;
