import { config } from './config/config.js';
import Api from './utils/api.js';


const api = new Api();

api.listen(config['node-port']);

api.setupDatabase();
