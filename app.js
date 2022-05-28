const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const http = require("http");

global.__basedir = __dirname;

const app = express();
const server = http.createServer(app);
require("./config/db");
// Middleware for all the requests

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.options("*", cors());

server.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});
