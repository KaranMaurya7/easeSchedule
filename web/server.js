//import { config } from "../config/config.js";


export class Server {
	
	static async call(endpoint, data, headers = {}) {

		const API_URL = 'http://localhost:9898';

		try {
			const response = await fetch(`${API_URL}/${endpoint}`);
		
			return response.json();
		
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

	