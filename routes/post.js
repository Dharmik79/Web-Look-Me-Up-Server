const express = require("express");
const routes = express.Router();
const postController = require("../controller/postController");
const { authentication } = require("../middleware/auth");

routes.post("/add", authentication, postController.create);
routes.post("/findAll", authentication, postController.findAll);
routes.get("/:id", authentication, postController.get);
routes.put("/update/:id", authentication, postController.update);
routes.delete("/:id", authentication, postController.delete);
routes.post("/", authentication, postController.likeDislike);
module.exports = routes;