//종료 날짜가 null인 경우 무조건 현재 날짜로 변경함
//현재 진행중인 프로젝트의 인원수와 해당 프로젝트의 직원조회
app.get("/proceeding_project/count", (req, res) => {
    let sql = "SELECT project.project_name, count(emp.emp_no) FROM project INNER JOIN employee_in_project on project.project_no = employee_in_project.project_no INNER JOIN emp on employee_in_project.emp_no = emp.emp_no WHERE IFNULL(project.project_enddate, curdate())>=curdate() and IFNULL(employee_in_project.finish_date, curdate())>=curdate() GROUP BY project.project_no";
    connection.query(sql,(err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});
//현재 진행 중인 프로젝트에서 참여중인 직원목록 조회
app.get("/proceeding_project/:project_no", (req, res) => {
    let sql = "SELECT department.dept_name,emp.emp_no, emp.emp_name FROM project INNER JOIN employee_in_project on project.project_no = employee_in_project.project_no INNER JOIN emp on employee_in_project.emp_no = emp.emp_no INNER JOIN department on department.dept_no = emp.dept_no WHERE IFNULL(project.project_enddate, curdate())>=curdate() and IFNULL(employee_in_project.finish_date, curdate())>=curdate() and project.project_no = ?";
    let params = [req.params.project_no];
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});