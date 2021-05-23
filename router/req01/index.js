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
    let sql = "SELECT department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no";
    connection.query(sql,(err, rows, fields) => {
        res.send(rows);
    });
});
//부서 내의 연봉 순위 ->1번 요구사항
app.get("/by_salary/:dept_name", (req, res) => {
    let sql = "SELECT emp.emp_no, emp.emp_name, emp.emp_rank_no, emp.salary, department.dept_name, DENSE_RANK() OVER (ORDER BY emp.salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no WHERE department.dept_name = ?";
    let params = [req.params.dept_name];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});
//연봉 1위인 부서 조회 ->1번 요구사항
app.get("/by_salary_rank1/", (req, res) => {
    let sql = "SELECT * FROM (SELECT department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no) Salary_rank WHERE rank = 1";
    connection.query(sql,(err, rows, fields) => {
        res.send(rows);
    });
});
//연봉 1위인 부서 내의 직원조회 ->1번 요구사항
app.get("/by_salary_rank1/employee", (req, res) => {
    let sql = "SELECT * FROM emp where emp.dept_no in (SELECT Salary_rank.dept_no FROM (SELECT department.dept_no ,department.dept_name, sum(emp.salary) as department_salary, DENSE_RANK() OVER (ORDER BY department_salary DESC) as rank from emp INNER JOIN department on emp.dept_no = department.dept_no GROUP BY department.dept_no) Salary_rank WHERE rank = 1) ORDER BY emp.salary DESC";
    connection.query(sql,(err, rows, fields) => {
        res.send(rows);
    });
});
//부서 등록
app.post('/department/add', (req, res) => {
    const{name} = req.body;
    let sql = `INSERT INTO department(dept_name) values(${name})`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//부서 수정
app.put('/department/:dept_id/edit',((req, res) => {
    const {name} = req.body;
    let params = [req.params.dept_id];
    let sql = `update department set dept_name = ${name} where dept_id = ?`
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//부서 삭제
app.delete('/department/:dept_id/delete',((req, res) => {
    let params = [req.params.dept_id];
    let sql = "delete FROM department where dept_id = ?";
    connection.query(sql, params, (err, result) => {
        res.redirect('/');
    });
}));
//직무등록
app.post('/position/add', (req, res) => {
    const{name} = req.body;
    let sql = `INSERT INTO position(role_name) values(${name})`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//직무수정
app.put('/position/:role_id/edit',((req, res) => {
    const {name} = req.body;
    let params = [req.params.role_id];
    let sql = `update position set role_name = ${name} where role_id = ?`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//직무삭제
app.delete('/position/:role_id/delete',((req, res) => {
    let params = [req.params.role_id];
    let sql = "delete FROM position where role_id = ?";
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//발주처 전체 조회
app.get('/', (req, res) => {
    let sql = "SELECT * FROM client";
    connection.query(sql,(err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//발주처 등록
app.post('/add', (req, res) => {
    const{client_name} = req.body;
    let sql = `INSERT INTO client(client_name) values(${client_name})`;
    connection.query(sql,(err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//발주처 수정
app.put('/:client_no/edit',((req, res) => {
    const {client_name} = req.body;
    let params = [req.params.client_no];
    let sql = `update client set client_name = ${client_name} where client_no = ?`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//발주처 삭제
app.delete('/:client_no/delete',((req, res) => {
    let params = [req.params.client_no];
    let sql = "delete FROM client where client_no = ?";
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//직원 권한 관련 라우터들(수정일자의 경우 DB에서 설정으로 되어있다는 전제임)
//직원등급
app.get('/', (req, res) => {
    let sql = "SELECT * FROM emp_grage";
    connection.query(sql,(err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//등급 등록
app.post('/add', (req, res) => {
    const{emp_rank_name, modify_access, read_access} = req.body;
    let sql = `INSERT INTO emp_grage(emp_rank_name, modify_access, read_access) values(${emp_rank_name},${modify_access},${read_access})`;
    connection.query(sql,(err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
});
//등급 수정
app.put('/:emp_rank_no/edit',((req, res) => {
    const {emp_rank_name, modify_access, read_access} = req.body;
    let params = [req.params.emp_rank_no];
    let sql = `update emp_grade set emp_rank_name = ${emp_rank_name} where emp_rank_no = ?`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//등급 삭제
app.delete('/:emp_rank_no/delete',((req, res) => {
    let params = [req.params.emp_rank_no];
    let sql = "delete FROM emp_grade where emp_rank_no = ?";
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));

module.exports = app;