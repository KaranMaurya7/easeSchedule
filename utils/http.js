import express from 'express';
import { config } from '../config/config.js';
import Routes from './routes.js';


class Http {
	
	mysql

	constructor(api, mysql) {

		Object.assign(this, api);

		this.mysql = mysql;
		this.app = express();
		this.router = express.Router() 	
	}

	async setup() {

		this.setupMiddleware()
		this.exception();
		this.listen(config['node-port']);

		this.routes = new Routes(this, this.router);
		await this.routes.setupRoutes();
	}

	setupMiddleware() {
		
		this.app.use(express.json());
		this.app.use(this.router);
		this.app.use(express.urlencoded({ extended: true }));
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

	async call(apiPath, options = {}) {

		//const response = await fetch(`http://localhost:3000${apiPath}`, options);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		console.log(`fghjk`);
		
		
		return await response.json();
	}
}

export default Http;
