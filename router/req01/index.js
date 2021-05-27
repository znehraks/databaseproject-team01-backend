//부서전체조회
const express = require("express");
const connection = require("../../connection");
const app = express();
app.get("/", (req, res) => {
  let sql = "SELECT * FROM department";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});
//부서 별 연봉순위 ->1번 요구사항
app.get("/by_salary", (req, res) => {
  let sql =
    "SELECT department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});
//부서 내의 연봉 순위 ->1번 요구사항
app.get("/by_salary/:dept_name", (req, res) => {
  let sql =
    "SELECT emp.emp_no, emp.emp_name, emp.emp_rank_no, emp.salary, department.dept_name, DENSE_RANK() OVER (ORDER BY emp.salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
  let params = [req.params.dept_name];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});
//연봉 1위인 부서 조회 ->1번 요구사항
app.get("/by_salary_rank1/", (req, res) => {
  let sql =
    "SELECT * FROM (SELECT department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no) Salary_rank WHERE rank = 1";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});
//연봉 1위인 부서 내의 직원조회 ->1번 요구사항
app.get("/by_salary_rank1/employee", (req, res) => {
  let sql =
    "SELECT * FROM emp where emp.dept_no in (SELECT Salary_rank.dept_no FROM (SELECT department.dept_no ,department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no) Salary_rank WHERE rank = 1) ORDER BY emp.salary DESC";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

//기본요구사항
//부서 등록
app.post("/department/add", (req, res) => {
  const { name } = req.body;
  let sql = `INSERT INTO department(dept_name) values('${name}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(err);
    res.send(result);
  });
});

//부서조회
app.get("/department", (req, res) => {
  let sql = "SELECT * FROM department where is_deleted=0";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//부서 수정
app.post("/department/edit", (req, res) => {
  const { name, dept_no } = req.body;
  let sql = `update department set dept_name = '${name}' where dept_no = ${dept_no}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//부서 삭제
app.get("/department/delete/:dept_no", (req, res) => {
  let params = [req.params.dept_no];
  let sql = "update department set is_deleted = 1 where dept_no = ?";
  connection.query(sql, params, (err, result) => {
    res.send(result);
  });
});

//직무조회
app.get("/task", (req, res) => {
  let sql = "SELECT * FROM task where is_deleted=0";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//직무등록
app.post("/task/add", (req, res) => {
  const { name } = req.body;
  let sql = `INSERT INTO task(role_name, updated_at) values('${name}', curdate())`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//직무수정
app.post("/task/edit", (req, res) => {
  const { name, role_no } = req.body;
  let sql = `update task set role_name = '${name}', updated_at = curdate() where role_no = ${role_no}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//직무삭제
app.get("/task/delete/:role_no", (req, res) => {
  let params = [req.params.role_no];
  let sql = "update task set is_deleted = 1 where role_no = ?";
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//발주처 전체 조회
app.get("/client", (req, res) => {
  let sql = "SELECT * FROM client where is_deleted=0";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//발주처 등록
app.post("/client/add", (req, res) => {
  const { client_name } = req.body;
  let sql = `INSERT INTO client(client_name, updated_at) values('${client_name}', curdate())`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//발주처 수정
app.post("/client/edit", (req, res) => {
  let sql = `update client set client_name = '${req.body.client_name}', updated_at = curdate() where client_no = ${req.body.client_no}`;
  connection.query(sql, (err, result) => {
    console.log(err);
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//발주처 삭제
app.get("/client/delete/:client_no", (req, res) => {
  let params = [req.params.client_no];
  let sql = "update client set is_deleted = 1 where client_no = ?";
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//직원 권한 관련 라우터들(수정일자의 경우 DB에서 설정으로 되어있다는 전제임)
//직원등급
app.get("/employee_grade", (req, res) => {
  let sql = "SELECT * FROM employee_grade where is_deleted=0";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//등급 등록
app.post("/employee_grade/add", (req, res) => {
  const { emp_rank_name, modify_access, read_access } = req.body;
  let sql = `INSERT INTO employee_grade(emp_rank_name, modify_access, read_access, updated_at) values('${emp_rank_name}',${modify_access},${read_access}, curdate())`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//등급 수정
app.post("/employee_grade/edit", (req, res) => {
  const { emp_rank_name, modify_access, read_access, emp_rank_no } = req.body;
  let sql = `update employee_grade set emp_rank_name = ${emp_rank_name}, modify_access = ${modify_access}, read_access = ${read_access}  where emp_rank_no =${emp_rank_no}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//등급 삭제
app.get("/employee_grade/delete/:emp_rank_no", (req, res) => {
  let params = [req.params.emp_rank_no];
  let sql = "update employee_grade set is_deleted=1 where emp_rank_no = ?";
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//프로젝트 등록
app.post("/project/add", (req, res) => {
  const { project_name, client_no } = req.body;
  let sql = `INSERT INTO project(project_name, project_startdate,  client_no, updated_at) VALUES('${project_name}', now(),  ${client_no}, curdate())`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//프로젝트 삭제
app.get("/project/delete/:project_no", (req, res) => {
  let params = [req.params.project_no];
  let sql = `update project set is_deleted=1 where project_no = ?`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//프로젝트 수정
app.post("/project/edit", (req, res) => {
  const {
    project_name,
    project_startdate,
    project_enddate,
    client_no,
    storage_period,
    project_no,
  } = req.body;
  let sql = `update project set project_name = ${project_name}, project_startdate = ${project_startdate}, project_enddate = ${project_enddate}, client_no = ${client_no}, storage_period = ${storage_period}, updated_at = curdate() where project_no = ${project_no} and EXISTS(SELECT * FROM client WHERE client = ${client_no})`;
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
module.exports = app;
