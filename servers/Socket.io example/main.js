// npm start  .\main.js 

/* 	Some links for help
	https://socket.io/docs/v4/
	https://youtu.be/tVUE_JiPU-k
	
	import express1 from 'express';		// Can import specific exports thus static
	// will not work as we are not in class base app
	*/

// Logger: pino --- https://getpino.io/#/
// const logger = require("pino")();


// To connect client-client on audio/video/data or anything live we can use liveSwitch library.
// LiveSwitch: https://www.liveswitch.io/ 
let importingModule = ["express", "pino"];
const express = require(importingModule[0]);	// Imports whole file thus dynamic
const logger = require(importingModule[1])();
// Both will work goog practice is import as it will convert into ES module
const app = express();	// New instance for application
const port = process.env.PORT || 8800;
const path = require('path');

/* Socket code starts */
// Attach the express app to the http module (doing for socket.io later use)
const http = require('http').Server(app);

// Attach the http with the socket.io
const socket = require('socket.io')(http);

app.get("/socketExample", (req, res) => {
	res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Create a new connection (from server side)
socket.on('connection', connection => {
	connection.on('disconnect', () => {
		console.log(`Disconnected from: ${connection.id}`);
	});
	connection.on('text', (data) => {
		console.log(`text from:`, data);
		if (data.typing == true) {
			connection.emit("showStatusTyping", { typingStatus: true });
		} else {
			connection.emit("showStatusTyping", { typingStatus: false, messageReceived: true, message: data.message });
			connection.emit("showStatusTyping1", { typingStatus1: false, messageReceived: true, message: data.message });
		}
	});
	connection.on('shareInGroup', (data) => {
		console.log(data);
		//	To share message to a group we have to maintain a database table with id of person in the group and share the details to them once they are online (on connection)
		// let clients = socket.sockets.clients();
		// let roomClients = socket.sockets.clients('room'); // all users from room `room`
		let list = socket.sockets.sockets
		// console.log(list);
		list.forEach(element => {
			// console.log(element.id);
			element.emit("showStatusTyping1", { typingStatus1: false, messageReceived: true, message: data.message });
		});
	});
	console.log(`Connected on: ${connection.id}`);
});


/* Socket code ends */


//	Routes
app.get("/", (req, res) => {
	res.json(`Response message: Your are at '/'.`);
});
/* // Express
app.listen(port, () => {
	console.log("Server started at port: http://localhost:" + port + "/ | First page: http://localhost:" + port + "/socketExample/");
}); */
// http for socket
http.listen(port, () => {
	console.log("Server started at port: http://localhost:" + port + "/ | First page: http://localhost:" + port + "/socketExample/");
});