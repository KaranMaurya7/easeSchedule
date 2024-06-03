import Http from "../utils/http";

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