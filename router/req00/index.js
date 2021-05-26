const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../../connection");
const app = express();
//-----------------------------
// emp
//read
app.get("/emp", (req, res) => {
  let sql = "SELECT * FROM emp";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});
//insert
app.post("/emp/insert", (req, res) => {
  let sql = `INSERT INTO emp(emp_name, emp_rrn, emp_final_edu, emp_rank_no, dept_no, emp_manager_no, salary, updated_at) values('${req.body.emp_name}','${req.body.emp_rrn}','${req.body.emp_final_edu}',${req.body.emp_rank_no},${req.body.dept_no},${req.body.emp_manager_no},${req.body.salary},now())`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//update
app.post("/emp/update", (req, res) => {
  let sql = `UPDATE emp SET emp_name = '${req.body.emp_name}', emp_final_edu = '${req.body.emp_final_edu}', emp_rank_no=${req.body.emp_rank_no}, dept_no = ${req.body.dept_no}, hr_score_history_no = ${req.body.hr_score_history_no}, emp_manager_no = ${req.body.emp_manager_no}, salary=${req.body.salary}, updated_at=now() where emp_no = ${req.body.emp_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//delete(is_deleted to 1)
app.post("/emp/delete", (req, res) => {
  let sql = `UPDATE emp SET is_deleted=1,updated_at=now() where emp_no = ${req.body.emp_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//------------------------------------------------------------------------------------------------------
// employee_in_project
//read
app.get("/employee_in_project", (req, res) => {
  let sql = "SELECT * FROM employee_in_project where is_deleted = 0";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});
//insert
app.post("/employee_in_project/insert", (req, res) => {
  let sql = `INSERT INTO employee_in_project(project_no, emp_no, enter_date,  finish_reason, updated_at) values (${req.body.project_no},${req.body.emp_no},'${req.body.finish_date}',${req.body.finish_reason},now())`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//update
app.post("/employee_in_project/update", (req, res) => {
  let sql = `UPDATE employee_in_project SET finish_date=now(), finish_reason=${req.body.finish_reason}, updated_at=now() where emp_no = ${req.body.emp_no} and project_no=${req.body.project_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//delete(is_deleted to 1)
app.post("/employee_in_project/delete", (req, res) => {
  let sql = `UPDATE employee_in_project SET is_deleted=1,updated_at=now() where emp_no = ${req.body.emp_no} and project_no=${req.body.project_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//------------------------------------------------------------------------------------------------------
// emp_online_account
//read
app.get("/emp_online_account", (req, res) => {
  let sql = "SELECT * FROM emp_online_account where is_deleted = 0";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});
//insert(회원가입 기능으로 이미 구현됨)

//update
app.post("/emp_online_account/update", (req, res) => {
  // 비밀번호 암호화
  bcrypt.genSalt(10, (err, salt) => {
    let userAccount = req.body;
    bcrypt.hash(userAccount.emp_auth_pwd, salt, (err, hash) => {
      let sql = `UPDATE emp_online_account SET emp_auth_pwd='${hash}',updated_at=now() where emp_auth_id = '${req.body.emp_auth_id}'`;
      connection.query(sql, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
    });
  });
});

//delete(is_deleted to 1)
app.post("/emp_online_account/delete", (req, res) => {
  let sql = `UPDATE emp_online_account SET is_deleted=1,updated_at=now() where emp_auth_id = '${req.body.emp_auth_id}'`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//------------------------------------------------------------------------------------------------------
// performance_evaluation_resume
//read
app.get("/performance_evaluation_resume", (req, res) => {
  let sql =
    "SELECT * FROM performance_evaluation_resume  where is_deleted=0  order by updated_at desc";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});
//insert
app.post("/performance_evaluation_resume/insert", (req, res) => {
  let sql = `INSERT INTO performance_evaluation_resume(emp_no, hr_score, hr_change, updated_at) values (${
    req.body.emp_no
  },(select IFNULL(hr_score, 0) + ${Number(
    req.body.hr_change
  )} from performance_evaluation_resume a where a.emp_no = ${
    req.body.emp_no
  } and is_deleted = 0 order by updated_at desc limit 1) ,${
    req.body.hr_change
  },now())`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//update
app.post("/performance_evaluation_resume/update", (req, res) => {
  let sql = `UPDATE performance_evaluation_resume SET hr_score=${req.body.hr_score}, hr_change=${req.body.hr_change}, updated_at=now() where hr_score_history_no = ${req.body.hr_score_history_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//delete(is_deleted to 1)
app.post("/performance_evaluation_resume/delete", (req, res) => {
  let sql = `UPDATE performance_evaluation_resume SET is_deleted=1,updated_at=now() where hr_score_history_no = ${req.body.hr_score_history_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
