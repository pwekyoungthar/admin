const mongoose = require("mongoose");
const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be add"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const UserRole = mongoose.model("UserRole", userRoleSchema);
module.exports = UserRole;
