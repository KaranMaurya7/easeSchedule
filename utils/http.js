import express from 'express';

class Http {

	constructor() {

		this.app = express();

		this.setupMiddleware();
	}

	setupMiddleware() {

		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: true }));
	}

	call(method, route, handler) {

		this.app[method](route, handler);
	}

	exception(handler) {

		this.app.use((err, req, res, next) => {

			handler(err, req, res, next);
		});
	}

	error(status, message, res) {

		res.status(status).json({ error: message });
	}

	getApp() {
		return this.app;
	}

	listen(port) {

		this.app.listen(port, () => {

			console.log(`Server is running on port ${port} \n`);
		});
	}
}

export default Http;
