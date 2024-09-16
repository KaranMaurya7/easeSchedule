import { Middle } from "../utils/middle.js";

export class User {

	constructor(mysql) {
	}

	async execute(mysql){

		this.mysql = mysql;
		
		const response = await this.mysql.query(
			`SELECT 
				*
			FROM
				users`
		);

		return response;
	}
}