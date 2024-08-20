import { User } from "../server/user.js";

class Routes {

	constructor(http, router) {
	
		Object.assign(this, http);
	
		this.http = http;

		this.router = router;
	}

	async setupRoutes() {
		
		this.router.get('/', (req, res) => {
			return res.status(200).send(`<h1>HI</h1>`)
		});
		
		this.router.get('/api/users', async(req, res) => {
			const user = new User(this.mysql)
			const userD = await user.execute();
			return res.send(userD);
		});
	}
}

export default Routes;
