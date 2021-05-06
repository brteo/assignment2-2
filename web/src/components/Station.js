/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Divider, Skeleton } from 'antd';

import ErrorModal from './ErrorModal';
import StationDepartures from './StationDepartures';
import StationArrivals from './StationArrivals';
import RealTimeTip from './RealTimeTip';

const Station = props => {
	const { stationId } = props;

	const REAL_TIME_INTERVAL = 5000;
	const interval = useRef(null);

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

	const realTimeInterval = () => {
		return setInterval(() => {
			call();
		}, REAL_TIME_INTERVAL);
	};

	const startInterval = () => {
		interval.current = realTimeInterval();
	};
	const stopInterval = () => {
		clearInterval(interval.current);
	};

	useEffect(() => {
		startInterval();

		return () => stopInterval();
	}, []);

	useEffect(() => {
		setShowDepartures(false);
		setShowArrivals(false);
		call();
	}, [stationId]);

	return (
		<>
			<RealTimeTip
				initValue="true"
				startInterval={startInterval}
				stopInterval={stopInterval}
				time={REAL_TIME_INTERVAL}
			/>
			<Divider style={{ borderWidth: 2, borderColor: '#389e0d' }}>Departures</Divider>
			{showDepartures ? <StationDepartures departures={departures} /> : <Skeleton active />}
			<Divider style={{ borderWidth: 2, borderColor: '#ff4d4f' }}>Arrivals</Divider>
			{showArrivals ? <StationArrivals arrivals={arrivals} /> : <Skeleton active />}
		</>
	);
};

export default Station;
