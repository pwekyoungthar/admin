const express = require("express");
const userRoleController = require("../controllers/userRoleController");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userRoleController.getUsersRoleAll)
  .post(userRoleController.createUserRole);

router.route("/:id").patch(userRoleController.userRoleUpdate);

module.exports = router;
