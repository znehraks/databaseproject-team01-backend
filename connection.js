const fs = require("fs");
// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
const mysql = require("mysql");

// const pool = mysql.createPool({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database,
//   connectionLimit: 50,
// });
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  connectionLimit: 50,
});

module.exports = pool;
