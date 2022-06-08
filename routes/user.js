const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const { authentication } = require("../middleware/auth");


routes.put("/:id", authentication, userController.update);
routes.get("/:id", authentication, userController.get);
routes.post("/findAll", authentication, userController.findAll);

module.exports = routes;