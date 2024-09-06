export class Page {
	constructor() {
	}

	render(req, res, route) {
		// Render the page content based on the page name
		switch (route) {
		  case 'home':
			const homePage = new Home();
			homePage.fetch()
			res.send(homePage.container);
			break;
		  case 'about':
			res.send(`<h1>Welcome to the about page!</h1>`);
			break;
		  default:
			res.status(404).send('Page not found');
		}
	}
}


class Home extends Page {

	async fetch() {


		console.log(1);
		
	}
	
	get container() {
		this.home = `ertyu`

		return `
		  <!DOCTYPE html>
		  <html lang="en">
		  <head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>My Page</title>
		  </head>
		  <body>
			<div id="page-content">
			 <h1>Lets go </h1>
			</div>
		  </body>
		  </html>
		`;
	}	
}