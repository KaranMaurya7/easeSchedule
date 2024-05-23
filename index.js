import { config } from "./config/config.js";
import { API } from "./utils/api.js";
import { MySQL } from "./utils/mysql.js";

const mysql = new MySQL();
const api = new API();

api.setupRoutes();

console.log(`                    
	Welcome to the source, enjoy your stay.
	====================================
	App Name: Ease/Schedule
	Environment: 'development'
	Server is running on port: ${config["node-port"]}
	====================================
`);

mysql.connectAll()

const res = await mysql.query(`SELECT * FROM users WHERe id = ?`, [1]);

console.log(res);