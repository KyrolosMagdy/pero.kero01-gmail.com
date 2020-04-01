const express = require("express");

const AuthController = require("../controller/auth.controller");

const router = express.Router();

router.put("/signup", AuthController.signUp);

router.post("/login", AuthController.login);

module.exports = router;
