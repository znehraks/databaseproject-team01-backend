const express = require("express");
const connection = require("../../connection");
const app = express();
//palettea_user(C R U D) (/api/users)

//전체조회
app.get("/", (req, res) => {
  let sql = `
  SELECT a.emp_no emp_no, a.emp_name emp_name, b.emp_no manager_no, b.emp_name manager_name, b.emp_rrn manager_rrn, b.emp_final_edu manager_final_edu, b.emp_rank_no manager_rank_no, b.dept_no manager_dept_no, b.hr_score_history_no manager_hr_score_history_no, t.role_name, b.emp_manager_no manager_manager_no, b.salary manager_salary, ep.project_no, ep.enter_date, ep.finish_date, ep.finish_reason, pp.role_no, d.dept_name, p.project_name FROM emp a INNER JOIN emp b ON a.emp_manager_no = b.emp_no INNER JOIN employee_in_project ep ON b.emp_no = ep.emp_no INNER JOIN project_position pp ON ep.emp_no = pp.emp_no AND ep.project_no = pp.project_no INNER JOIN department d ON d.dept_no = b.dept_no INNER JOIN project p ON p.project_no = ep.project_no INNER JOIN task t on t.role_no = pp.role_no
    `;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
