const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.static('ludo'));

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

app.listen(PORT, () => {
	console.log(`server started at port ${PORT}`);
});
