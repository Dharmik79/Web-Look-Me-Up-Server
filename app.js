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
const path=require("path")
const multer = require("multer");
const AWS = require('aws-sdk');
const fs = require('fs');
const fileupload = require("express-fileupload");
// Middleware for all the requests


app.use(session({ secret: JWT.SECRET, saveUninitialized: true, resave: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(cors());
app.use(fileupload());
app.options({ origin: process.env.FRONT_END_URL}, cors());

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// connecting to the database
require("./config/db");

// upload routes 
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

var s3 = new AWS.S3();



app.post("/upload", (req, res) => {

  var params = {
    Bucket: 'look-me-up',
    Body : req.files.file.data,
    Key : "images/"+Date.now()+"_"+req.files.file.name
  };
  
  s3.upload(params, function (err, data) {
    if (err) {
      res.status(200).json({
        message: 'success!',
      });
    }
    if (data) {
     res.status(200).json({fileName:data.key})
    }
  });


 
});

app.get("/assets/:id",(req,res)=>{
  console.log("assets",req.params.id)
  var params = {
    Bucket: 'look-me-up',
    Key : req.params.id
      };
      s3.getObject(params, function(err, data){
         if(err) {
          res.status(200).json({
            message: 'success!',
          });
         } else {
             let image = new Buffer(data.Body).toString('base64');
             image = "data:"+data.ContentType+";base64,"+image;
             let response = {
              "statusCode": 200,
              "headers": {
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': data.ContentType
              },
              "body":image,
              "isBase64Encoded": true
          };
      }
      });
  
})
// Routes for the api 
app.use(require("./routes/index"));

server.listen(process.env.PORT, () => {
  console.log(`your application is running on ${process.env.PORT}`);
});
