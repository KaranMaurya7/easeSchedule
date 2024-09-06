import { User } from "../server/user.js";
import path from 'path';
import { Page } from "../web/page.js";

class Routes {

	constructor(http, router) {
	
		Object.assign(this, http);
	
		this.http = http;
		this.router = router;

	}

	async setupRoutes() {

		const page = new Page()

		this.router.get('/', (req, res) => {
    		page.render(req, res, 'home'); // Assuming Page has a render method
		});
		
	}

	async setupApiRoutes() {

		this.router.get('/api/users', async(req, res) => {
			const use = new User()
			const user = await this.http.serverCall(use)
			return res.send(user);
		});

	}
}

export default Routes;
