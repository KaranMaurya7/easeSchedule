import Http from "../utils/http.js";

export class User extends Http{

    async execute(){

        const response = await this.mysql.query(
            `SELECT 
                *
            FROM
                users`
        );

        return response;
    }
}