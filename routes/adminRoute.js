const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();
// Read All Admin Account
router.route("/").get(adminController.getAdminAccAll);

//User Register
router.route("/admin/singup").post(adminController.singup);

//User Login
router.route("/admin/login").post(adminController.login);

module.exports = router;
