const express = require("express");
const connection = require("../../connection");
const app = express();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
//palettea_user(C R U D) (/api/users)

//전체조회
app.get("/", (req, res) => {
  let sql = "SELECT * FROM emp";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
