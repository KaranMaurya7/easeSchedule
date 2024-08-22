import { User } from "../server/user.js";
import path from 'path';

class Routes {

	constructor(http, router) {
	
		Object.assign(this, http);
	
		this.http = http;
		this.router = router;
	}

	async setupRoutes() {
		
		this.router.get('/', (req, res) => {
			return res.sendFile(path.join(this.__dirname, '../web/index.html'))
		});
		
		this.router.get('/api/users', async(req, res) => {
			const user = this.http.call(`server/users`)
			return res.send(user);
		});
	}
}

export default Routes;
