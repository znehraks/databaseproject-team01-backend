const express = require("express");
const connection = require("../../connection");
const app = express();
const bcrypt = require("bcrypt");

app.get("/insert", (req, res) => {
  let sql = `INSERT INTO ${req.query.id} SET ?`;
  let info = req.body;
  connection.query(sql, info, (err, result, fields) => {
    if (err) return res.json(err);
    return res.send(result)
  });
})
module.exports = app;