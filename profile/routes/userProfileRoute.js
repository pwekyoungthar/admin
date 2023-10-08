const express = require("express");
const userProfileController = require("../../profile/controllers/userProfileController");
const authController = require("../../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.userProtect, userProfileController.getUserProfile);
//   .post(authController.userProtect, userProfileController.createMainUnit)
//   .patch(authController.adminProtect, userProfileController.mainUnitUpdate);

module.exports = router;
