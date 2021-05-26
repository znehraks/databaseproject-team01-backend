const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  connectionLimit: 50,
});

module.exports = pool;
