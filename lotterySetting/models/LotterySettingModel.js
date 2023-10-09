const mongoose = require("mongoose");

const lotterySettingSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamesubcats",
    required: [true, "Please Insert Sub Category Id"],
    unique: true,
  },
  gameName: {
    type: String,
    required: [true, "Please Insert Sub Category Name"],
  },
  startDate: {
    type: String,
    default: Date.now,
  },
  endDate: {
    type: String,
    default: Date.now,
  },
  mainCompensation: {
    type: Number,
    default: 0,
  },
  otherCompensation: {
    type: Number,
    default: 0,
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

const lotterySetting = mongoose.model("lotterySetting", lotterySettingSchema);
module.exports = lotterySetting;
