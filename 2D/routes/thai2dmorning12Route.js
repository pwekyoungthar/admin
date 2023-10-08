const express = require("express");
const thai2dmorning12Controller = require("../controllers/thai2dmorning12Controller");
const authController = require("../../controllers/authController");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(thai2dmorning12Controller.getAll2DNum)
  .post(thai2dmorning12Controller.create2DNum);

router.route("/:id").patch(thai2dmorning12Controller.update2DNum);

router
  .route("/morning2d12amuser")
  .get(authController.userProtect, thai2dmorning12Controller.getAll2DNumUser);

module.exports = router;
