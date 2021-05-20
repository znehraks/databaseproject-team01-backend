const express = require("express");
const connection = require("../../connection");
const app = express();

// 9. 일반 직원이 본인이 현재 참여하고 있는 프로젝트에 대한 보고를 위해 해당 프로젝트
// 의 PM, PL을 조회하는 기능
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
