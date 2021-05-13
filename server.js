const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const port = 3002;
const multer = require("multer");
const router = require("./router");
const connection = require("./connection");

// "Origin, X-Requested-With, Content-Type, Accept"
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// setup the logger

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

connection.getConnection(function (err, connection) {
  if (!err) {
    console.log("getConnected");
  }
  connection.release();
});
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(router);
