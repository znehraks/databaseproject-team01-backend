const express = require("express");
const connection = require("../../connection");
const app = express();

// 3. PM이나 PL직무로 3번 이상 참여한 직원에 대해 해당 직원의 연봉에서 200만원을 추
// 가하는 기능
app.get("/", (req, res) => {
  let sql = `
  SELECT * FROM emp INNER JOIN (SELECT * FROM project_position WHERE role_no = 1 OR role_no = 2)AS A ON emp.emp_no = A.emp_no
  GROUP BY A.emp_no HAVING COUNT(A.emp_no)>=3`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});
app.get("/update", (req, res) => {
  let sql = `UPDATE emp SET salary = salary + 200, updated_at = NOW() WHERE emp_no IN (SELECT A.emp_no FROM emp INNER JOIN (SELECT * FROM project_position WHERE role_no = 1 OR role_no = 2)AS A ON emp.emp_no = A.emp_no
  GROUP BY A.emp_no HAVING COUNT(A.emp_no)>=3)`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
