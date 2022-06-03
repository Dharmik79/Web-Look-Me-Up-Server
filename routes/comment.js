const express = require("express");
const routes = express.Router();
const commentController = require("../controller/commentController");
const { authentication } = require("../middleware/auth");

routes.post("/add", authentication, commentController.create);
routes.post("/findAll", authentication, commentController.findAll);
module.exports = routes; 
