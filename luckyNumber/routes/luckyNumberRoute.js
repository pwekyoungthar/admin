const express = require("express");
const luckyNumberController = require("../controllers/luckyNumberController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

// Create Lucky Number
router
  .route("/thai2dmorning")
  .post(
    adminController.adminProtect,
    luckyNumberController.createThai2DMorningLuckyNumber
  );

// Get All Lucky Number
router
  .route("/allluckynumber")
  .get(adminController.adminProtect, luckyNumberController.getAllLuckyNumber);
module.exports = router;
