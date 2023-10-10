const mongoose = require("mongoose");
const batchSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamesubcats",
    required: [true, "Please Insert Sub Category Id"],
  },
  gameName: {
    type: String,
    required: [true, "Please Insert Sub Category Name"],
  },
  batchNumber: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
