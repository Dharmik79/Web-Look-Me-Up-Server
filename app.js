const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const http = require("http");
const session = require("express-session");
let logger = require("morgan");
const passport = require("passport");
let cookieParser = require("cookie-parser");
global.__basedir = __dirname;
const { JWT } = require("./config/authConstant");
const app = express();
const server = http.createServer(app);

// Middleware for all the requests
app.use(session({ secret: JWT.SECRET, saveUninitialized: true, resave: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static("assets"));
app.use(cors());
app.options("*", cors());

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// connecting to the database
require("./config/db");
// Routes for the api
app.use(require("./routes/index"));

server.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});
