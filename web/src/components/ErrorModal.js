import { Modal } from 'antd';

const ErrorModal = error => {
	let status = 1;
	let message = '';

	if (error.response) {
		message = error.response.data.message;
		status = error.response.status;
	} else if (error.request) {
		message = error.request;
	} else {
		message = error.message;
	}

	return Modal.error({
		title: 'Error: ' + status,
		content: message
	});
};

export default ErrorModal;
