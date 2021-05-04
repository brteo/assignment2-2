/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// trim all incoming post body
/*
app.use((req, res, next) => {
	Object.keys(req.body).map(key => {
		if (typeof req.body[key] === 'string' || req.body[key] instanceof String)
			return (req.body[key] = req.body[key].trim());
	});
	next();
});
*/

app.get('/', (req, res) => {
	const response = { message: `Trains REST API!` };
	res.send(response);
});

// dynamic routes for express
fs.readdirSync(path.join(__dirname, '/routes'))
	.filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
	.forEach(file => {
		const f = path.parse(file).name;
		app.use(`/${f}`, require(`./routes/${f}`));
	});

app.listen(3000);
