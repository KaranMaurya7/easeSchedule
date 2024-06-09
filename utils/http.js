import express from 'express';
import { config } from '../config/config.js';

class Http {
	
	mysql

	constructor(api, mysql) {

		Object.assign(this, api);

		this.mysql = mysql;
		
		this.app = express();
	}

	setup() {
        this.setupMiddleware
        this.setupRoutes();
        this.exception();
		this.listen(config['node-port']);
    }

    setupMiddleware() {
        
		this.app.use(express.json());
        
		this.app.use(express.urlencoded({ extended: true }));
    }

    async setupRoutes() {
	
		const [name] = await this.mysql.query(`SELECT * FROM users Where id = ?`,[1])

        this.app.get('/', (req, res) => {
            return res.status(200).send(`Welcome to the Appointment Center! ${name.first_name}`);
        });

    }

    exception() {
       
		this.app.use((err, req, res, next) => {
        
			console.error(err.stack);
        
			res.status(500).send('Something broke!');
        });
    }


	listen(port) {

		this.app.listen(port, () => {

			console.log(`Server is running on port ${port} \n`);
		});
	}

	static async call(apiPath, options = {}) {

        const response = await fetch(`http://localhost:3000${apiPath}`, options);
        
		if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
		return await response.json();
    }
}

export default Http;
