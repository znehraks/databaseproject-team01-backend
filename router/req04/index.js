const express = require("express");
const connection = require("../../connection");
const app = express();

//전체조회
app.get("/:emp_no", (req, res) => {
  let sql = `
    SELECT * FROM project_position a 
        INNER JOIN employee_in_project b ON 
        a.emp_no=b.emp_no AND a.project_no = b.project_no
        WHERE a.emp_no = ${req.params.emp_no}`;
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = app;
