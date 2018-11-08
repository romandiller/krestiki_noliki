'use strict';
// mysql
const mysql = require('mysql');
const config = require('../config.json');

class Db {

	constructor() {

		this.connection = mysql.createConnection({
		
			host     : config.db.name,
			user     : config.db.user,
			password : config.db.password,
			database : config.db.database
		
		});
		this.sql = {

			createTable: "CREATE TABLE gameHistory (id INT AUTO_INCREMENT PRIMARY KEY, winner VARCHAR(255), winCombs VARCHAR(255), firstStep VARCHAR(255), actions MEDIUMTEXT)",
			showTables: 'SHOW TABLES',
			dropTable: "DROP TABLE gameHistory",
			clearTable: "TRUNCATE TABLE gameHistory",
			selectAll: "SELECT * from gameHistory ORDER BY id DESC"

		}

	}

	service() {

		this.connection.connect((err) => {

			this.connection.query(this.sql.clearTable, (err, result) => {

				console.log(result);

			});

		});

	}

	insertHistory(data) {

		let actions = [];

		data.actions.forEach((item) => {

			actions.push(JSON.stringify(item));

		});

		let sql = "INSERT INTO gameHistory (winner, winCombs, firstStep, actions) VALUES ("
					+ "'" + data.winner + "', " 
					+ "'" + data.winCombs + "', "
					+ "'" + data.firstStep + "', "
					+ "'" + actions + "')";

		this.connection.connect((err) => {

			this.connection.query(sql, (err, result) => {

				if (err) console.log(err);

				if (result) console.log('Данные добавлены!');

			});

		});

	}

	getLastGames(callback) {

		this.connection.connect((err) => {

			this.connection.query(this.sql.selectAll, (err, result) => {

				callback(result);

			}); 

		});

	}

}

module.exports = Db;