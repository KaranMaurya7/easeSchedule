class Routes {

    constructor(http, api) {
    
        this.http = http;

        this.api = api;

        this.setupRoutes();
    }

    setupRoutes() {

        this.http.call('get', '/', this.api.handleHome.bind(this.api));
    }
}

export default Routes;
