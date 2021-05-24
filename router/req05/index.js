app.get("/:emp_no/client", (req, res) => {
    let params = [req.params.emp_no];
    let sql = `"SELECT client.client_no, client.client_name FROM EMP INNER JOIN employee_in_project ON EMP.emp_no = employee_in_project.emp_no INNER JOIN project ON employee_in_project.project_no = project.no INNER JOIN client on client.client_no = project.client_no INNER JOIN project_position ON project.project_no = project_position.project_no and project_position.emp_no = emp.emp_no INNER JOIN task on project_position.role_no = task.role_no WHERE task.role_no = "PM" and emp.emp_no = ${req.params.emp_no}"`;
    connection.query(sql,params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});