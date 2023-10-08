const express = require("express");
const mainUnitHistoryController = require("../controller/mainUnitHistoryController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .get(
    adminController.adminProtect,
    mainUnitHistoryController.getMainUnitHistory
  );

module.exports = router;
