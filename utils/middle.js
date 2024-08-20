/*
	This class work as a middle man between server and utils where we do not have to maintain myql object in every file in server.
	Need to work on this with better solutions.
**/

export class Middle {

	mysql

	constructor(routes, mysql) {

		Object.assign(this, routes);

		this.mysql = mysql;        
	}
}