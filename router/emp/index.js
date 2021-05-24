const express = require("express");
const connection = require("../../connection");
const app = express();

//전체조회
app.get("/", (req, res) => {
  let sql = "SELECT * FROM emp where is_deleted = 0";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.get("/:emp_no", (req, res) => {
  let sql =
    "SELECT emp.emp_no, emp_name, emp_rrn, emp_final_edu, emp_rank_no, dept_no, hr_score_history_no, emp_manager_no, salary, project_no, enter_date, finish_date, finish_reason FROM emp INNER JOIN employee_in_project ON emp.emp_no = employee_in_project.emp_no WHERE emp.emp_no = ?";
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
