const express = require("express");
const lotterySettingController = require("../controllers/LotterySettingController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .post(
    adminController.adminProtect,
    lotterySettingController.createLotterySetting
  );

router
  .route("/thai2dmorningsetting")
  .get(
    adminController.adminProtect,
    lotterySettingController.getThai2DMorningSetting
  );

router
  .route("/thai2dmorningsetting/updatetime")
  .patch(
    adminController.adminProtect,
    lotterySettingController.updateThai2DMorningSettingTime
  );
module.exports = router;
