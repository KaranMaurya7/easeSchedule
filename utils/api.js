import Http from './http.js';
import { MySQL } from './mysql.js';


class Api {

	constructor() {
		
		this.mysql = new MySQL();
		this.http = new Http(this, this.mysql);
	}

	async setup() {
		
		console.log(`Ease Schedule \n Setup`);

		MySQL.connectAll();
		
		this.http.setup(); // Set up HTTP server
		
	}	
}	


export class ApiError extends Error {

    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default Api;
