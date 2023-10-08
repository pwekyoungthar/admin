const mongoose = require("mongoose");

const mainUnitHistorySchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
  unit_status: {
    type: String,
    required: [true, "Must Be in or out status value"],
  },
  userId: String,
  date: Date,
  time: String,
});

const MainUnitHistory = mongoose.model(
  "MainUnitHistory",
  mainUnitHistorySchema
);

module.exports = MainUnitHistory;
