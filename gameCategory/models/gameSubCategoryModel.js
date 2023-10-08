const mongoose = require("mongoose");

const gameSubCatSchema = new mongoose.Schema({
  subcat_name: {
    type: String,
    required: [true, "Please Add Sub Category Name Of Game"],
  },
  cat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamecategories",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const GameSubCat = mongoose.model("GameSubCat", gameSubCatSchema);

module.exports = GameSubCat;
