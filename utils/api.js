import { MySQL } from "./mysql.js";
import express from 'express';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

export class API {

	constructor(){

		this.mysql = new MySQL();
		this.app = express();
	}

	load() {
		this.mysql.connectAll();
	}

	async setupRoutes() {
        // Get the directory path of the current module
        const currentFilePath = fileURLToPath(import.meta.url);
        const currentDirPath = dirname(currentFilePath);
        
        // Navigate to the web directory (two directories above)
        const webDirPath = resolve(currentDirPath, '../');
		console.log('webDirPath : ',webDirPath)

        
        // Construct the path to the routes folder
        const routesPath = resolve(webDirPath, 'web');
		console.log('routesPath : ',routesPath)

        
        // Read the content of the routes folder
        const routeFolders = readdirSync(routesPath);
		console.log('routeFolders : ',routeFolders)


        // Dynamically load route modules
        for (const folder of routeFolders) {
            const routePath = join(routesPath, folder);
            const { default: routeModule } = await import(routePath);
            this.app.use(`/${folder}`, routeModule);
        }
    }	

	// setupRoutes() {
       
	// 	const routesPath = resolve(__dirname, 'routes');
        
	// 	const routeFolders = readdirSync(routesPath);

    //     routeFolders.forEach(folder => {
        
	// 		const routePath = join(routesPath, folder);
        
	// 		const routeModule = require(routePath).default; // Assuming route modules export a default function or Router object
        
	// 		this.app.use(`/${folder}`, routeModule);
    //     });
    // }

	listen(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}