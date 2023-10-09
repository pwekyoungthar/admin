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
    default: function () {
      const currentDate = new Date();
      currentDate.setHours(0, 1, 0, 0);
      return currentDate;
    },
  },
  endDate: {
    type: Date,
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
