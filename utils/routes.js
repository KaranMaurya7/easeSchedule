//import { User } from "../server/user.js";

class Routes {

    constructor(http, app) {
    
        Object.assign(this,http);
    
        this.http = http;

        this.app = app;
        this.mysql = this.mysql;
        this.setupRoutes();
    }

    async setupRoutes() {

        //const user = new User().execute();
        
        this.app.get('/', (req, res) => {
            return res.status(200).send(`<h1>HI</h1>`)
        });
        
        this.app.get('/api/users', (req, res) => {
            return res.status(200).send(   );
        });

    }
}

export default Routes;
