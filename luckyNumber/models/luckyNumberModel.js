const mongoose = require("mongoose");
const luckyNumber2DSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamesubcats",
    required: [true, "Please Insert Sub Category Id"],
  },
  gameName: {
    type: String,
    required: [true, "Please Insert Sub Category Name"],
  },
  number: {
    type: String,
    required: [true, "2D Number must be add"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const LuckyNumber2D = mongoose.model("LuckyNumber2D", luckyNumber2DSchema);
module.exports = LuckyNumber2D;
