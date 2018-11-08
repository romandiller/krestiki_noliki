// sockets
'use strict';

module.exports = (server, ai, db) => {

	const io = require('socket.io')(server);

	io.sockets.on('connection', (client) => {
	    
	  	console.log('новое соединение');

	  	client.on('insertHistory', (data) => {

	  		db.insertHistory(data);

	  	})

	  	client.on('getLastGames', () => {

	  		let lastGames = db.getLastGames((result) => {

				client.emit('lastGamesList', result);

	  		});

	  	});

	  	client.on('compMove', (data) => {

	  		let step = ai.getStep(data.freeBlocks);

	  		client.emit('compStep', step);

	  	});

	});

}