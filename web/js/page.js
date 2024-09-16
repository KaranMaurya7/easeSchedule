import { Server } from "../server.js";

export class Page {

	constructor(container) {
		this.container = container;
		this.content = '';
	}
  
	setContent(html) {
		this.container.innerHTML = html;
	}
  
	clearContent() {
		this.container.innerHTML = '';
	}
  
	render() {
	  // This method will be overridden by child classes
	}
}


export class HomePage extends Page {

	constructor(container) {
		super(container);	
		(async() => await this.tert())()
	}

	async tert() {
		const data = await Server.call('api/users')
		console.log(data);
	}

	render() {

		const html = `
			<h1>Welcome to Appointment Maker and Tracker</h1>
			<p>This is the homepage.</p>
		`;	

		console.log('/api/users')
		this.setContent(html);
	}
}

const pageContainer = document.getElementById('page-container');
const page = new Page(pageContainer);
const homePage = new HomePage(pageContainer);
homePage.render();