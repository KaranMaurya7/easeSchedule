import Http from "../utils/http.js";

class Home {
	constructor() {
		this.http = new Http
	}

	async execute(params) {
		const user = await Http.call(`/api/users`)
		console.log(user);
	}
}