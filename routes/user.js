const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const { authentication } = require("../middleware/auth");

routes.put("/:id", authentication, userController.update);
routes.get("/:id", authentication, userController.get);
routes.post("/findAll", authentication, userController.findAll);

routes.post("/suggestions", authentication, userController.suggestions);
routes.post("/followFriend", authentication, userController.followFriend);
routes.post("/friends", authentication, userController.friends);
routes.post("/followers", authentication, userController.followers);

module.exports = routes;
