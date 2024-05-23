import { config } from "../config/config.js";
import mysql2 from 'mysql2';

export class MySQL {

    static #connections = new Map();

    async connectAll() {

        const credential = config.mysql;

        console.log('MySQL connections:');
        
        credential.forEach(( config ) => {

            const pool = mysql2.createPool({
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.database,
                waitForConnections: true,
                connectionLimit: config.connectionLimit,
                queueLimit: 0
            }).promise();

            MySQL.#connections.set(config.name, pool);

            console.log(" connection:  ",`${config.name} connected.\n`);
        });

    }


    async query(sql, params, connection_name = "admin") {

        if (!MySQL.#connections.has(connection_name)) {

            throw new Error(`No connection found for ${connection_name}`);
        }
    
        const connection = MySQL.#connections.get(connection_name);
        
        try {

            const [rows, fields] = await connection.query(sql, params);

            return rows;

        } catch (err) {

            console.error(`Error executing query on pool ${poolName}:`, err);

            throw err;
        }
    }

    static closeAll() {

        for (const [name, pool] of MySQL.#connections) {

            pool.end((err) => {
            
                if (err) {

                    console.error(`Error closing pool ${name}:`, err);
                } else {

                    console.log(`Pool ${name} closed.`);
                }
                
            });
        }
    }
}