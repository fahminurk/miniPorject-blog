const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");

//register
router.post("/", userController.register);

//login
router.post("/login", userController.login);

//cek token saat login
router.get("/token", userController.getByToken, userController.getUserByToken);

//validasi lewat email
router.get("/generate-token/email", userController.generateTokenByEmail);

//verify email
router.get("/resendVerif/:email", userController.resendVerification);

//patch verif
router.patch(
  "/update-verif",
  userController.getByToken,
  userController.verifyByToken
);

//edit profile
router.patch(
  "/editProfile/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.editProfile
);

//forgot password
router.patch(
  "/forgot-password",
  userController.getByToken,
  userController.forgotPassword
);

module.exports = router;
