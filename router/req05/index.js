//PM의 발주처 정보조회 ->직무테이블이 존재하지 않아 결과 확인 못함
app.get("/client", (req, res) => {
    let sql = `"SELECT client.client_no, client.client_name FROM EMP INNER JOIN employee_in_project ON EMP.emp_no = employee_in_project.emp_no INNER JOIN project ON employee_in_project.project_no = project.no INNER JOIN client on client.client_no = project.client_no INNER JOIN project_position ON project.project_no = project_position.project_no and project_position.emp_no = emp.emp_no INNER JOIN position on project_position.role_no = position.role_no INNER JOIN client on client.client_no = project.client_no WHERE position = PM and emp.emp_no = ${req.params.emp_no}"`;
    connection.query(sql, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});