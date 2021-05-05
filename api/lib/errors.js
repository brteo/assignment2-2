module.exports.errorMiddleware = (error, req, res, next) => {
	let status = 500;
	let message = '';

	if (error.response) {
		message = error.response.data;
		status = error.response.status;
	} else if (error.request) {
		message = error.request;
	} else {
		message = error.message;
	}

	res.status(status).json({ message });
};
