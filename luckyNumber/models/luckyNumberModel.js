const mongoose = require("mongoose");
const thai2DNumSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "2D Number must be add"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  limitAmount: {
    type: Number,
    default: 0,
  },
});
const Thai2DNum = mongoose.model("Thai2DNum", thai2DNumSchema);
module.exports = Thai2DNum;
