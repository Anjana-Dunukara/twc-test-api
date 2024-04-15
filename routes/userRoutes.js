const express = require("express");
const router = express.Router();
const { Logout, GetMyDetails } = require("../controllers/userController");
const { Login, Register } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/me").get(auth, GetMyDetails);
router.route("/logout").post(auth, Logout);

module.exports = router;
