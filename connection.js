const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "",
  user: "",
  password: "",
  port: "",
  database: ""
});

module.exports = pool;
