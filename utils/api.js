import Http from './http.js';
import { MySQL } from './mysql.js';
import Routes from './routes.js';

class Api {

	constructor() {

		this.http = new Http();

		this.setupRoutes();
		
		this.setupExceptionHandler();

		this.mysql = new MySQL();
	}

	listen(port) {

		this.http.listen(port);
	}

	async setupDatabase() {

		try {
			await MySQL.connectAll();

		} catch (error) {

			console.error('Failed to connect to the database:', error);
		}

	}

	setupRoutes() {

		console.log('Ease Schedule \n', 'Setup\n\n');

		new Routes(this.http, this);
	}

	setupExceptionHandler() {

		this.http.exception((err, req, res, next) => {

			console.error(err.stack);

			this.http.error(500, 'Internal Server Error', res);	
		});
	}

	async handleHome(req, res) {

		const [q] = await this.mysql.query(`SELECT * FROM users WHERE id =?`,[1]);

		console.log(q.first_name);
		
		res.status(200).send(`Welcome to the Appointment Center! ${q.first_name}`);
	}
}

export default Api;
