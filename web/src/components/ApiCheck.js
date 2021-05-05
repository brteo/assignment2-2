import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

const APICheck = props => {
	const [message, setMessage] = useState('Checking if Api is reachable...');
	const [color, setColor] = useState('processing');

	useEffect(() => {
		setTimeout(() => {
			axios
				.get(process.env.REACT_APP_ENDPOINT)
				.then(res => {
					setMessage(res.data.message);
					setColor('green-inverse');
				})
				.catch(err => {
					setMessage('Api unreachable!');
					setColor('red-inverse');
				});
		}, 1000);
	}, []);

	let icon;
	if (color === 'green-inverse') {
		icon = <CheckCircleOutlined />;
	} else if (color === 'red-inverse') {
		icon = <CloseCircleOutlined />;
	} else icon = <SyncOutlined spin />;

	return (
		<Tag icon={icon} color={color}>
			{message}
		</Tag>
	);
};
export default APICheck;
