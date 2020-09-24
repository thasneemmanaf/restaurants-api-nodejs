const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .post("/signup", authController.signupUser)
  .post("/login", authController.loginUser)
  .delete(
    "/:userId",
    authController.authenticateUser,
    authController.deleteUser
  );

module.exports = router;
