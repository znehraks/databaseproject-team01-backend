const express = require("express");
const connection = require("../../connection");
const app = express();

//전체조회
app.get("/", (req, res) => {
  let sql =
    "SELECT * FROM project INNER JOIN client ON project.client_no = client.client_no where project.is_deleted = 0";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
