const express = require("express");
const connection = require("../../connection");
const app = express();

// 8. 직원이 프로젝트 조회를 할 때 오랜 기간동안 참여한 프로젝트 기준, 최근 참여한 프
// 로젝트 기준, 오래전 참여한 프로젝트 기준, 종료기간이 임박한 프로젝트 기준으로 프로
// 젝트를 정렬하는 기능(이때의 프로젝트는 열람가능기간이 안 지난 프로젝트를 의미)

//최근 참여한 프로젝트 기준 정렬
app.get("/recent_project", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = 2 ORDER BY enter_date DESC))`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/ago_project", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = 2 ORDER BY enter_date))`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/imminent_project", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = 2 ORDER BY project_enddate desc))`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/longtime_project", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = 2 ORDER BY finish_date-enter_date desc))`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
