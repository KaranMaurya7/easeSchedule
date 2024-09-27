import { User } from "../server/user.js";
import { ApiError, ApiResponse } from "./api.js";

class Routes {

	constructor(http, router) {
	
		Object.assign(this, http);
	
		this.http = http;
		this.router = router;

	}

	async setupRoutes() {

		this.router.get('/', (req, res) => {
			return res.json(new ApiResponse(200,null,'Ease Schedule server is up'));
		});

	}

	async setupApiRoutes() {

		this.router.post('/api/login', async (req, res) => {

			console.log(121);
			
			try {
				const { firstName, lastName, userName, email, password } = req.body;
		
				const userObject = {
					first_name: firstName,
					last_name: lastName,
					username: userName,
					email,
					password
				};
		
				const newUser = new User();
		
				const savedUser = await this.http.serverCall(newUser, userObject, newUser.createUser);
		
				// Send a success response with the saved user details
				return res.json(new ApiResponse(200, savedUser, 'User created successfully'));
			} catch (error) {
				console.error("Error creating user:", error);
				return res.json(new ApiError(500, null, 'Failed to create user'));
			}
		});

		this.router.get('/api/users', async(req, res) => {	
			
			const use = new User()
			const user = await this.http.serverCall(use)
			console.log(user);
		
			return res.json(new ApiResponse(200, user,'Ease Schedule server is up'));
		});

	}
}

export default Routes;
