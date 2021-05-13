const express = require("express");
const connection = require("../../connection");
const app = express();
//palettea_user(C R U D) (/api/users)

//전체조회
app.get("/", (req, res) => {
  let sql = `SELECT a.emp_no emp_no, b.emp_no manager_no FROM emp a INNER JOIN emp b 
      ON a.emp_manager_no = b.emp_no`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
