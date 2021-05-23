//부서전체조회
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
    connection.query(sql,(err, result) => {
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
app.post('/', (req, res) => {
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
app.put('/:client_id/edit',((req, res) => {
    const {client_name} = req.body;
    let params = [req.params.client_id];
    let sql = `update client set role_name = ${client_name} where client_id = ?`;
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));
//발주처 삭제
app.delete('/:client_id/delete',((req, res) => {
    let params = [req.params.client_id_id];
    let sql = "delete FROM client where client_id = ?";
    connection.query(sql, params, (err, result) => {
        if(err){
            throw err;
            res.redirect('/');
        }
        res.redirect('/');
    });
}));