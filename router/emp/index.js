const express = require("express");
const connection = require("../../connection");
const app = express();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
//palettea_user(C R U D) (/api/users)

//전체조회
app.get("/", (req, res) => {
  let sql = "SELECT * FROM emp";
  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/:emp_no", (req, res) => {
  let sql =
    "SELECT emp.emp_no, emp_name, emp_rrn, emp_final_edu, emp_rank_no, dept_no, hr_score_history_no, emp_manager_no, salary, project_no, enter_date, finish_date, finish_reason FROM emp INNER JOIN employee_in_project ON emp.emp_no = employee_in_project.emp_no WHERE emp.emp_no = ?";
  let params = [req.params.emp_no];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//user_code로 조회
app.get("/by_user_code/:user_code", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE user_code = ?";
  let params = [req.params.user_code];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_id로 조회
app.get("/by_user_id/:user_id", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE user_id = ?";
  let params = [req.params.user_id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_name로 조회
app.get("/by_user_name/:user_name", (req, res) => {
  let params = [req.params.user_name];
  let sql = `SELECT * FROM palettea_user WHERE user_name = ? OR user_name LIKE '%${req.params.user_name}%'`;

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//user_email로 조회
app.get("/by_user_email/:user_email", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_email = ? OR user_email LIKE '%${req.params.user_email}%'`;
  let params = [req.params.user_email];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_cellphone로 조회
app.get("/by_user_cellphone/:user_cellphone", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_cellphone = ? OR user_cellphone LIKE '%${req.params.user_cellphone}%'`;
  let params = [req.params.user_cellphone];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_homephone로 조회
app.get("/by_user_homephone/:user_homephone", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_homephone = ? OR user_homephone LIKE '%${req.params.user_homephone}%'`;
  let params = [req.params.user_homephone];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_zipcode로 조회
app.get("/by_user_zipcode/:user_zipcode", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_zipcode = ?`;
  let params = [req.params.user_zipcode];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_address1로 조회
app.get("/by_user_address1/:user_address1", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_address1 = ? OR user_address1 LIKE '%${req.params.user_address1}%'`;
  let params = [req.params.user_address1];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_address2로 조회
app.get("/by_user_address2/:user_address2", (req, res) => {
  let sql = `SELECT * FROM palettea_user WHERE user_address2 = ? OR user_address2 LIKE '%${req.params.user_address2}%'`;
  let params = [req.params.user_address2];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_gender로 조회
app.get("/by_user_gender/:user_gender", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE user_gender = ?";
  let params = [req.params.user_gender];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_mileage로 조회
app.get("/by_user_mileage/:user_mileage", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE user_mileage = ?";
  let params = [req.params.user_mileage];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//user_is_deleted로 조회
app.get("/by_is_deleted/:is_deleted", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE is_deleted = ?";
  let params = [req.params.is_deleted];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//created_at로 조회
app.get("/by_created_at/:created_at", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE created_at = ?";
  let params = [req.params.created_at];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//updated_at로 조회
app.get("/by_updated_at/:updated_at", (req, res) => {
  let sql = "SELECT * FROM palettea_user WHERE updated_at = ?";
  let params = [req.params.updated_at];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});
//Client용 조회
//my_page에서 조회할 내 정보
app.get("/client/my_page/:user_code", (req, res) => {
  let sql =
    "SELECT user_code, user_id, user_name, user_password, user_email, user_cellphone, user_homephone, user_zipcode, user_address1, user_address2, user_mileage FROM palettea_user WHERE user_code = ?";
  let params = [req.params.user_code];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

//회원 정보 추가(모두수정)(관리자용)
app.post("/", (req, res) => {
  let sql =
    "INSERT INTO palettea_user(user_id, user_name, user_password, user_email, user_cellphone, user_homephone, user_zipcode, user_address1, user_address2, user_gender, user_mileage) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let user_id = req.body.user_id;
  let user_name = req.body.user_name;
  let user_password = req.body.user_password;
  let user_email = req.body.user_email;
  let user_cellphone = req.body.user_cellphone;
  let user_homephone = req.body.user_homephone;
  let user_zipcode = req.body.user_zipcode;
  let user_address1 = req.body.user_address1;
  let user_address2 = req.body.user_address2;
  let user_gender = req.body.user_gender;
  let user_mileage = req.body.user_mileage;
  let params = [
    user_id,
    user_name,
    user_email,
    user_password,
    user_cellphone,
    user_homephone,
    user_zipcode,
    user_address1,
    user_address2,
    user_gender,
    user_mileage,
  ];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});
//로그인
//bcrypt 디버깅하기 - 완료
app.post("/client/login", (req, res) => {
  let sql = `SELECT user_code, user_password FROM palettea_user WHERE user_email = ?`;
  let params = [req.body.user_email.value];
  connection.query(sql, params, (err, rows, fields) => {
    bcrypt
      .compare(req.body.user_password.value, rows[0].user_password)
      .then((result) => {
        if (result) {
          code = `${generateToken(rows)}${rows[0].user_code}`;
          res.send(code);
          console.log(rows[0].user_password);
          console.log(req.body.user_password.value);
          console.log("login success");
        } else {
          console.log(err);
          console.log(req.body.user_password.value);
          console.log(rows[0].user_password);
          console.log("login failed");
          res.send("fail");
        }
      });
    // console.log(req.body.user_email.value, req.body.user_password.value);
    // console.log(err);
  });
});

//회원가입
app.post("/client/register", (req, res) => {
  let sql = `INSERT INTO palettea_user(user_id, user_name, user_email, user_password) VALUES(?, ?, ?, ?)`;
  //user_id 에는 jsonwebtoken 줌
  bcrypt.hash(req.body.user_password.value, 10).then((result) => {
    let params = [
      req.body.user_email.value,
      req.body.user_name.value,
      req.body.user_email.value,
      result,
    ];
    connection.query(sql, params, (err, rows, fields) => {
      res.send(rows);
      console.log(rows);
      console.log(req.body.user_name.value, req.body.user_email.value, result);
      console.log(err);
    });
  });
});

//회원 정보 업데이트(마이페이지 수정)
app.post("/update", (req, res) => {
  let sql = `UPDATE palettea_user SET user_password = ?, user_email = ?, user_cellphone = ?, user_homephone = ?, user_zipcode = ?, user_address1 = ?, user_address2 = ?, updated_at = NOW() WHERE user_code = ?`;
  let params = [
    req.body.user_password,
    req.body.user_email,
    req.body.user_cellphone,
    req.body.user_homephone,
    req.body.user_zipcode,
    req.body.user_address1,
    req.body.user_address2,
    req.body.user_code,
  ];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//회원 주소 업데이트
app.post("/update/address", (req, res) => {
  let sql = `UPDATE palettea_user SET user_zipcode = ?, user_address1 = ?, user_address2 = ?, updated_at = NOW() WHERE user_code = ?`;
  let params = [
    req.body.user_zipcode,
    req.body.user_address1,
    req.body.user_address2,
    req.body.user_code,
  ];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

//회원 정보 삭제처리(is_deleted => 0)(관리자용)
app.delete("/delete/:user_code", (req, res) => {
  let sql =
    "UPDATE palettea_user SET is_deleted = 1, updated_at = now() WHERE user_code = ?";
  let params = [req.params.user_code];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });
});

module.exports = app;
