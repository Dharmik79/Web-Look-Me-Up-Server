const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));
router.use("/user", require("./user"));

module.exports = router;