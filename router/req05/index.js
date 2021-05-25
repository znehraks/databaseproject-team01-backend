const express = require("express");
const connection = require("../../connection");
const app = express();

app.get("/:emp_no", (req, res) => {
  let sql = `SELECT * FROM client C INNER JOIN project P ON C.client_no = P.client_no
    INNER JOIN project_position PP ON P.project_no = PP.project_no
    WHERE role_no = 1 AND emp_no = ${req.params.emp_no};`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
