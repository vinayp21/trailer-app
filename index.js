const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.get('/getAllEvents', (req, res) => {
	request(
		`https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs`,
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				res.json(body); // Show the HTML for the Google homepage.
			}
		}
	);
});
app.listen('3001', () => {
	console.log('server started at port 3001');
});
