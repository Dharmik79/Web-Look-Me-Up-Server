const express = require("express");
const routes = express.Router();
const postController = require("../controller/postController");

routes.post("/add", postController.create);
routes.post("/findAll", postController.findAll);
routes.get("/:id", postController.get);
routes.put("/update/:id", postController.update);
routes.delete("/:id", postController.delete);

module.exports = routes;