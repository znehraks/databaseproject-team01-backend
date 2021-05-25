const express = require("express");
const connection = require("../../connection");
const app = express();

// 4. 경영진이나 관리자 권한을 받은 자가 직원에 대한 검색 후 해당 직원이 현재 참여중
// 인 프로젝트목록 조회, 프로젝트에서의 직무 조회, 프로젝트에서의 직무 수정하는 기능
app.get("/", (req, res) => {
  let sql = `SELECT * FROM employee_in_project b 
  INNER JOIN project_position a ON a.emp_no=b.emp_no AND a.project_no = b.project_no INNER JOIN project p ON a.project_no = p.project_no
  INNER JOIN task t ON a.role_no = t.role_no INNER JOIN emp e on e.emp_no = b.emp_no ORDER BY a.emp_no; `;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//직무 수정
app.post("/update", (req, res) => {
  let sql = `
  UPDATE project_position SET role_no = ${req.body.role_no} WHERE emp_no = ${req.body.emp_no} AND project_no = ${req.body.project_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
