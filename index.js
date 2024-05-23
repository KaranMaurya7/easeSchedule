import { MySQL } from "./server/mysql.js";

const mysql = new MySQL();

mysql.connectAll()

const res = await mysql.query(`SELECT * FROM users WHERe id = ?`, [1]);

console.log(res);