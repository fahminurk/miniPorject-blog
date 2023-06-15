const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

//register
router.post("/", userController.register);

//login
router.post("/login", userController.login);

//cek token saat login
router.get("/token", userController.getByToken, userController.getUserByToken);

//validasi lewat email
router.get("/generate-token/email", userController.generateTokenByEmail);

//forgot password
router.patch(
  "/forgot-password",
  userController.getByToken,
  userController.forgotPassword
);

module.exports = router;
