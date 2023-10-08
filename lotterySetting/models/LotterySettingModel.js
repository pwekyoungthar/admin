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
    type: Date,
    required: [true, "Please Insert Date"],
  },
  startTime: {
    type: String,
    required: [true, "Please Insert Date"],
  },
  endDate: {
    type: Date,
    required: [true, "Please Insert Date"],
  },
  endTime: {
    type: String,
    required: [true, "Please Insert Date"],
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
