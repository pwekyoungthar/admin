const express = require("express");
const mainUnitController = require("../controller/mainUnitController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .get(mainUnitController.getMainUnitValue)
  .post(mainUnitController.createMainUnit)
  .patch(adminController.adminProtect, mainUnitController.mainUnitUpdate);

module.exports = router;
