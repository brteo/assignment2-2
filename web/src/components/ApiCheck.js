import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APICheck = props => {
	const [message, setMessage] = useState(false);

	useEffect(() => {
		axios.get(process.env.REACT_APP_ENDPOINT).then(res => {
			setMessage(res.data.message);
		});
	}, []);

	return <p>{message}</p>;
};

export default APICheck;
