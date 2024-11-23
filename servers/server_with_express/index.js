/*
 * Run: npm run start
 *    : npx nodemon ./index.js
 * Hot Reload run: "npx nodemon ./index.js"
 */
const express = require("express");
let cors = require('cors')
const app = express();

// Use for system configurations
const dotenv = require("dotenv")
dotenv.config();

const hostname = "127.0.0.1";
const port = process.env.PORT || 2000;

let allowlist = ['http://example1.com']
let corsOptions = (req, callback) => {
	let corsOptions;
	//   console.log("From: ", req.header('Origin'));
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	//  corsOptions = { origin: true } // for all
	callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptions));

// Use routes
app.get("/", (req, res) => {
	res.send("Node Express server working");
});
app.use(express.json());
app.use('/contactActions', require('./router/contactActions'))

app.listen(port, hostname, () => {
	console.log(`Server running on port: http://${hostname}:${port}/`)
});
