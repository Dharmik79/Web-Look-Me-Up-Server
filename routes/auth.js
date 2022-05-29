const express = require("express");
const routes = express.Router();
const authController = require("../controller/authController");

routes.post("/login", authController.login);
routes.post("/register", authController.register);
module.exports = routes;
