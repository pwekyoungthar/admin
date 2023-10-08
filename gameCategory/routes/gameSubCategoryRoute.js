const express = require("express");
const gameSubCatController = require("../controllers/gameSubCategoryController");
const authController = require("../../controllers/authController");
const adminController = require("../../controllers/adminController");

const router = express.Router();

router
  .route("/")
  .get(gameSubCatController.getGameSubCatForAdmin)
  .post(gameSubCatController.createGameSubCat);
router.route("/:id").patch(gameSubCatController.updateGameSubCat);

router
  .route("/usergamesubcat")
  .get(authController.userProtect, gameSubCatController.getGameSubCatOther);

module.exports = router;
