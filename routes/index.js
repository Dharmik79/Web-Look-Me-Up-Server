const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));

module.exports = router;