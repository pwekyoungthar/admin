const express = require("express");
const batchController = require("./batchController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

// Create Batch Number
router
  .route("/batch")
  .post(adminController.adminProtect, batchController.createBatch);

// Get All Lucky Number
router
  .route("/allluckynumber")
  .get(adminController.adminProtect, luckyNumberController.getAllLuckyNumber);
module.exports = router;
