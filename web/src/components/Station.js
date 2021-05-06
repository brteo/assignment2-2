/* eslint-disable react/display-name */
import React from 'react';
import { Divider } from 'antd';

import StationDepartures from './StationDepartures';
import StationArrivals from './StationArrivals';

const Station = props => {
	const { arrivals, departures } = props;

	return (
		<>
			<Divider style={{ borderWidth: 2, borderColor: '#389e0d' }}>Departures</Divider>
			<StationDepartures departures={departures} />
			<Divider style={{ borderWidth: 2, borderColor: '#ff4d4f' }}>Arrivals</Divider>
			<StationArrivals arrivals={arrivals} />
		</>
	);
};

export default Station;
