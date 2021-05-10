const express = require("express");
const connection = require("../../connection");
const app = express();

//전체조회
app.get("/:project_no", (req, res) => {
  let sql =
    "SELECT * FROM employee_in_project INNER JOIN project ON employee_in_project.project_no = project.project_no INNER JOIN emp ON emp.emp_no = employee_in_project.emp_no LEFT OUTER JOIN career ON employee_in_project.emp_no = career.emp_no WHERE employee_in_project.project_no = ?";
  let params = [req.params.project_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
