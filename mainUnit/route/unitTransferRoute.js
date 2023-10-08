const express = require("express");
const unitTransferController = require("../controller/unitTransferController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .patch(adminController.adminProtect, unitTransferController.mainUnitTransfer);

module.exports = router;
