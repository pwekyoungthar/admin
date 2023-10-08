const express = require("express");
const gameCategoryController = require("../controllers/gameCategoryController");
const authController = require("../../controllers/authController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .get(
    adminController.adminProtect,
    gameCategoryController.getGameCategoryAllAdmin
  )
  .post(
    adminController.adminProtect,
    gameCategoryController.createGameCategoryAllAdmin
  );
router
  .route("/:id")
  .patch(
    adminController.adminProtect,
    gameCategoryController.updateGameCategoryAllAdmin
  );

router
  .route("/usergamecat")
  .get(authController.userProtect, gameCategoryController.getGameCategoryOther);

module.exports = router;
