/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Divider, Skeleton, Alert, Button } from 'antd';
import { FieldTimeOutlined, StopOutlined } from '@ant-design/icons';

import ErrorModal from './ErrorModal';
import StationDepartures from './StationDepartures';
import StationArrivals from './StationArrivals';

const Station = props => {
	const REAL_TIME_INTERVAL = 5000;
	const interval = useRef(null);
	const { stationId } = props;
	const [realtime, setRealtime] = useState(true);

	const [showArrivals, setShowArrivals] = useState(false);
	const [arrivals, setArrivals] = useState([]);

	const [showDepartures, setShowDepartures] = useState(false);
	const [departures, setDepartures] = useState([]);

	const call = () => {
		axios
			.get(process.env.REACT_APP_ENDPOINT + 'stations/arrivals/' + stationId)
			.then(result => {
				setArrivals(result.data);
				setShowArrivals(true);
			})
			.catch(error => {
				setShowArrivals(false);
				setArrivals([]);
				ErrorModal(error);
			});

		axios
			.get(process.env.REACT_APP_ENDPOINT + 'stations/departures/' + stationId)
			.then(result => {
				setDepartures(result.data);
				setShowDepartures(true);
			})
			.catch(error => {
				setShowDepartures(false);
				setDepartures([]);
				ErrorModal(error);
			});
	};

	const realTime = () => {
		return setInterval(() => {
			call();
		}, REAL_TIME_INTERVAL);
	};

	const toggleRealTime = () => {
		if (!realtime) {
			interval.current = realTime();
		} else {
			clearInterval(interval.current);
		}
		setRealtime(!realtime);
	};

	useEffect(() => {
		call();

		interval.current = realTime();
		return () => clearInterval(interval.current);
	}, []);

	useEffect(() => {
		setShowDepartures(false);
		setShowArrivals(false);
		call();
	}, [stationId]);

	return (
		<>
			{realtime ? (
				<Alert
					icon={<FieldTimeOutlined />}
					showIcon
					message={'Realtime active every ' + REAL_TIME_INTERVAL / 1000 + 's'}
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
			)}
			<Divider style={{ borderWidth: 2, borderColor: '#389e0d' }}>Departures</Divider>
			{showDepartures ? <StationDepartures departures={departures} /> : <Skeleton active />}
			<Divider style={{ borderWidth: 2, borderColor: '#ff4d4f' }}>Arrivals</Divider>
			{showArrivals ? <StationArrivals arrivals={arrivals} /> : <Skeleton active />}
		</>
	);
};

export default Station;
