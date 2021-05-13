const express = require("express");
const connection = require("../../connection");
const app = express();

//부서목록 전체조회 ->2번 요구사항
app.get("/", (req, res) => {
    let sql = "SELECT * FROM department";
    connection.query(sql, (err, rows, fields) => {
        res.send(rows);
    });
});
//부서별 인원 목록 ->2번 요구사항
app.get("/by_dept_name/:dept_name", (req, res) => {
    let sql = "SELECT emp.emp_no, emp.emp_name, emp.emp_final_edu, emp.emp_rank_no, department.dept_name from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
//부서별 인원수(부서 이름)
app.get("/by_count/:dept_name", (req, res) => {
    let sql = "SELECT count(emp.emp_no) from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
//부서 별 연봉순위 ->1번 요구사항
app.get("/by_salary", (req, res) => {
    let sql = "SELECT department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no";
    connection.query(sql,(err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
//부서 내의 연봉 순위 ->1번 요구사항
app.get("/by_salary/:dept_name", (req, res) => {
    let sql = "SELECT emp.emp_no, emp.emp_name, emp.emp_rank_no, emp.salary, department.dept_name, DENSE_RANK() OVER (ORDER BY emp.salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
module.exports = app;