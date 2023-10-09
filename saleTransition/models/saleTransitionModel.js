const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  productName: String,
  productID: String,
  price: Number,
});

const saleSchema = new mongoose.Schema({
  userName: String,
  userId: Number,
  subCategoryID: Number,
  subCategoryName: String,
  date: Date,
  sale: [saleItemSchema], // Array of sale items
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
