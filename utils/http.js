import express from 'express';
import { config } from '../config/config.js';
import Routes from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from 'cookie-parser';

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
		this.listen(config['node-port']);

		this.routes = new Routes(this, this.router);
		await this.routes.setupRoutes();
		await this.routes.setupApiRoutes();
	}

	setupMiddleware() {

		this.app.use(express.json());
		this.app.use(cors({
			origin:config.CORS_URL,
			credentials:true,
		}));
		this.app.use(express.json({ limit:'1024kb'}));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(this.router);
	}


	listen(port) {

		this.app.listen(port, () => {
			console.log(`Server is running on port ${port} \n`);
		});
	}

	async serverCall(cls, parameters = null, func = null) {

		if(func) {

			console.log(313)
			try {
				return await func(this.mysql, parameters);
			} catch (error) {
				return error;
			}
		}

		try {
			return await cls.execute(this.mysql);
		} catch (error) {
			console.log(`ServerCall- ---------------->`,error);
		}
	}

}

export default Http;
