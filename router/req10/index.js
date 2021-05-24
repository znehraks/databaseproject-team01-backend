const express = require("express");
const connection = require("../../connection");
const app = express();

//10. 직원 개개인의 기본 연봉에 인사점수가 존재하는 경우 인사점수로 연봉이 자동으로
// 추가되는 기능(원래연봉+인사점수*5%로 연봉 계산
app.get("/", (req, res) => {
  let sql = `
  UPDATE emp a SET a.salary = 
  (a.salary + 0.05 * (SELECT SUM(hr_change) FROM performance_evaluation_resume b GROUP BY b.emp_no HAVING b.emp_no = a.emp_no))`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err, "req10");
  });
});

module.exports = app;
