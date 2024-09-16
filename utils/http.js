import express from 'express';
import { config } from '../config/config.js';
import Routes from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

class Http {
	
	mysql

	constructor(api, mysql) {

		Object.assign(this, api);

		this.mysql = mysql;
		this.app = express();
		this.router = express.Router();
		const __filename = fileURLToPath(import.meta.url);
		this.__dirname = path.dirname(__filename);
	}

	async setup() {

		this.setupMiddleware()
		this.exception();
		this.listen(config['node-port']);

		this.routes = new Routes(this, this.router);
		await this.routes.setupRoutes();
		await this.routes.setupApiRoutes();
	}

	setupMiddleware() {

		this.app.use(express.static(path.join(this.__dirname, '../web')));
		this.app.use(express.json());
		this.app.use(this.router);
		this.app.use(express.urlencoded({ extended: true }));
	}

	exception() {
	   
		this.app.use((err, req, res, next) => {
			console.error(err.stack);
			res.status(500).send('Exception Something broke!');
		});
	}


	listen(port) {

		this.app.listen(port, () => {
			console.log(`Server is running on port ${port} \n`);
		});
	}

	async serverCall(cls) {
		try {
			return await cls.execute(this.mysql)
		} catch (error) {
			console.log(`ServerCall- ---------------->`,error);
		}
	}

}

export default Http;
