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
    default: Date.now,
  },
  startTime: {
    type: String,
    default: "hello",
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: String,
    default: "hello",
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
