import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'antd';
import { FieldTimeOutlined, StopOutlined } from '@ant-design/icons';

const RealTimeTip = props => {
	const [realtimeActive, setRealtimeActive] = useState(true);

	const toggleRealTime = () => {
		if (!realtimeActive) {
			props.startInterval();
		} else {
			props.stopInterval();
		}
		setRealtimeActive(!realtimeActive);
	};

	useEffect(() => {
		setRealtimeActive(props.initValue);
	}, []);

	return realtimeActive ? (
		<Alert
			icon={<FieldTimeOutlined />}
			showIcon
			message={'Realtime active every ' + props.time / 1000 + 's'}
			type="success"
			action={
				<Button size="small" type="text" onClick={toggleRealTime}>
					STOP
				</Button>
			}
		/>
	) : (
		<Alert
			icon={<StopOutlined />}
			showIcon
			message="Realtime stopped"
			type="warning"
			action={
				<Button size="small" type="text" onClick={toggleRealTime}>
					ACTIVE
				</Button>
			}
		/>
	);
};

export default RealTimeTip;
