//부서목록 전체조회 ->2번 요구사항
const express = require("express");
const connection = require("../../connection");
const app = express();
app.get("/", (req, res) => {
    let sql = "SELECT * FROM department";
    connection.query(sql, (err, rows, fields) => {
        res.send(rows);
    });
});
//부서별 인원 목록 ->2번 요구사항
app.get("/by_dept_name/:dept_name", (req, res) => {
    let sql = "SELECT emp_no, emp_name, emp_final_edu, salary from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});


//부서별 인원수(부서 이름)
app.get("/by_dept_name/count/:dept_name", (req, res) => {
    let sql = "SELECT count(emp.emp_no) from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
module.exports = app;