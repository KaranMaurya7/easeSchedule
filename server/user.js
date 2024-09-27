
import bcrypt from "bcrypt"
import { ApiError } from "../utils/api";

export class User {

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

	async createUser(mysql, parameters) {
		try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(parameters.password, saltRounds);

            const sql = `
                INSERT INTO users (first_name, last_name, username, email, password) 
                VALUES (?, ?, ?, ?, ?)
            `;

            const result = await mysql.query(sql, [
                parameters.first_name,  
                parameters.last_name,   
                parameters.username,    
                parameters.email,     
                hashedPassword        
            ]);

			console.log(232);
			
            return {
                id: result.insertId, 
                ...parameters,
                password: hashedPassword, 
            };
        } catch (error) {
            console.error("Error creating user:", error);
            return new ApiError(500, "Error creating user"); 
        }
	}
}