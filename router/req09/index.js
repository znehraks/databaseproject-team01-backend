const express = require("express");
const connection = require("../../connection");
const app = express();

//전체조회
app.get("/:emp_no", (req, res) => {
  let sql = `
  SELECT * FROM emp e
  INNER JOIN project_position pp
  ON e.emp_no = pp.emp_no AND pp.project_no IN (
  SELECT pp.project_no FROM project_position pp 
  INNER JOIN project p 
  ON pp.project_no = p.project_no WHERE pp.emp_no = ${req.params.emp_no})
  WHERE pp.role_no <> 3`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
