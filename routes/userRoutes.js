const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .post("/signup", authController.signupUser)
  .delete(
    "/:userId",
    authController.authenticateUser,
    authController.deleteUser
  );

module.exports = router;
