const mongoose = require("mongoose");

const mainUnitSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
});

const MainUnit = mongoose.model("MainUnit", mainUnitSchema);

module.exports = MainUnit;
