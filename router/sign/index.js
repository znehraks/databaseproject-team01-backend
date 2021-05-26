const express = require("express");
const connection = require("../../connection");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
app.get("/", (req, res) => {
  let sql = "ALTER TABLE emp MODIFY emp_no INT AUTO_INCREMENT";
  connection.query(sql, (err, result, fields) => {
    if (err) return res.json(err);
    return result;
  });
});

app.post("/signup", (req, res) => {
  let sql = "INSERT INTO emp_online_account SET ?";
  let userAccount = req.body;

  // // 비밀번호 암호화
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(userAccount.emp_auth_pwd , salt, (err, hash) => {
  //     userAccount.emp_auth_pwd = hash;
  //   });
  // });

  // connection.query(sql, userAccount ,(err, result, fields) => {
  //   if (err) return res.json(err);
  //   return res.json({
  //     ...result,
  //     pwd: userAccount.emp_auth_pwd
  //   });
  // });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.emp_auth_pwd, salt, (err, hash) => {
      let sql = `INSERT INTO emp_online_account (emp_auth_id, emp_auth_pwd)values('${req.body.emp_auth_id}','${hash}')`;
      connection.query(sql, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
      });
    });
  });
});

app.post("/signin", (req, res) => {
  let sql = "SELECT * FROM emp_online_account WHERE emp_auth_id = ?";
  connection.query(sql, req.body.emp_auth_id, (err, user, fields) => {
    if (err) return res.json(err);
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "ID에 해당하는 유저가 없습니다.",
      });
    const isSame = bcrypt.compareSync(
      req.body.emp_auth_pwd,
      user[0].emp_auth_pwd
    );
    if (isSame) {
      // 로그인 성공 토큰 생성 추후 config로 암호화 필요
      let token = jwt.sign(user[0].emp_auth_id, "secretToken");
      res.cookie("user", token).status(200).json({
        loginSuccess: true,
        userId: user[0].emp_auth_id,
      });
    } else {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다",
      });
    }
  });
});

app.get("/auth", auth, (req, res) => {
  res.status(200).json({
    id: req.user,
  });
});

app.get("/signout", auth, (req, res) => {
  res.clearCookie("user").json({
    logoutSuccess: true,
  });
});

module.exports = app;
