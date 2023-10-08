const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();
//User Register
router.route("/singup").post(authController.singup);

//User Login
router.route("/login").post(authController.login);

//All Get User
router.route("/").get(userController.getUsersAll);

// router.route("/:id").patch(adminController.updateAdminAcc);

module.exports = router;
