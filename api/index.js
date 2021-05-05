/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const { errorMiddleware } = require('./lib/errors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// trim all incoming post body --> da migliorare in funzionale puro
app.use((req, res, next) => {
	if (req.method === 'POST') {
		// eslint-disable-next-line no-restricted-syntax
		for (const [key, value] of Object.entries(req.body)) {
			req.body[key] = value.trim();
		}
	}
	next();
});

app.get('/', (req, res) => {
	const response = { message: `Trains RestAPI is live!` };
	res.send(response);
});

// dynamic routes for express
fs.readdirSync(path.join(__dirname, '/routes'))
	.filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
	.forEach(file => {
		const f = path.parse(file).name;
		app.use(`/${f}`, require(`./routes/${f}`));
	});

app.use(errorMiddleware);

app.listen(3000);
