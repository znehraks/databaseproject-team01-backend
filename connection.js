const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "dbproject.c12pm8whu2kc.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  port: "3306",
  database: "dbproject"
});

module.exports = pool;
