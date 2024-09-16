import Http from "../../utils/http";

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
  }

  render() {
    
	const html = `
      <h1>Welcome to Appointment Maker and Tracker</h1>
      <p>This is the homepage.</p>
    `;

	Http.call('/api/users').then(response => {
	  console.log(response);
	}).catch(error => {
	  console.error(error);
	});

	console.log('/api/users')
    this.setContent(html);
  }
}

const pageContainer = document.getElementById('page-container');
const page = new Page(pageContainer);
const homePage = new HomePage(pageContainer);
homePage.render();