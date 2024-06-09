import Http from './http.js';
import { MySQL } from './mysql.js';
import Routes from './routes.js';

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

	// static Exception = class {

	// } 	
}	

export default Api;
