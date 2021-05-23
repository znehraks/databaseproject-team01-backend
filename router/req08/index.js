const express = require("express");
const connection = require("../../connection");
const app = express();

// 8. 직원이 프로젝트 조회를 할 때 오랜 기간동안 참여한 프로젝트 기준, 최근 참여한 프
// 로젝트 기준, 오래전 참여한 프로젝트 기준, 종료기간이 임박한 프로젝트 기준으로 프로
// 젝트를 정렬하는 기능(이때의 프로젝트는 열람가능기간이 안 지난 프로젝트를 의미)

//최근 참여한 프로젝트 기준 정렬
app.get("/", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip ON p.project_no = eip.project_no ORDER BY enter_date DESC`;
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.get("/recent_project/:emp_no", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip ON p.project_no = eip.project_no WHERE emp_no = ? ORDER BY enter_date DESC`;
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.get("/ago_project/:emp_no", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = ? ORDER BY enter_date`;
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.get("/imminent_project/:emp_no", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = ? ORDER BY project_enddate desc`;
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

app.get("/longtime_project/:emp_no", (req, res) => {
  let sql = `
    SELECT * FROM project p INNER JOIN employee_in_project eip
    ON p.project_no = eip.project_no WHERE emp_no = ? ORDER BY finish_date-enter_date desc`;
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
