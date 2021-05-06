import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Collapse, Skeleton, Typography, Divider } from 'antd';

import ErrorModal from './ErrorModal';
import TrainTimeline from './TrainTimeline';
import RealTimeTip from './RealTimeTip';

const { Panel } = Collapse;
const { Text } = Typography;

const Train = props => {
	const { train, dataKey } = props;

	const REAL_TIME_INTERVAL = 5000;
	const interval = useRef(null);

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	const getRealTimeInfo = () => {
		axios
			.get(process.env.REACT_APP_ENDPOINT + 'trains/' + train.trainid, {
				params: { origin: train.origin, time: train.time }
			})
			.then(res => {
				setLoading(false);
				setResult(res.data);
			})
			.catch(error => {
				setLoading(false);
				setResult(null);
				ErrorModal(error);
			});
	};

	const realTimeInterval = () => {
		return setInterval(() => {
			getRealTimeInfo();
		}, REAL_TIME_INTERVAL);
	};

	const startInterval = () => {
		interval.current = realTimeInterval();
	};
	const stopInterval = () => {
		clearInterval(interval.current);
	};

	const onCollapse = key => {
		if (key.length) {
			setLoading(true);
			getRealTimeInfo();
			startInterval();
		} else {
			setResult(null);
			stopInterval();
		}
	};

	useEffect(() => {
		return () => stopInterval;
	}, []);

	const info = result ? (
		<>
			<div className="mobile-block">
				<Text type="secondary">Ritardo</Text>&nbsp;
				<Text type={result.ritardo > 0 ? 'danger' : 'success'}>{result.compRitardo[1]}</Text>
			</div>
			<div className="mobile-block margin-left">
				<Text type="secondary">Last Detection</Text>&nbsp;
				{result.oraUltimoRilevamento ? (
					<Text>{moment(result.oraUltimoRilevamento, 'x').fromNow()}</Text>
				) : (
					<Text>-</Text>
				)}
			</div>
			<Divider />
			<RealTimeTip
				initValue="true"
				startInterval={startInterval}
				stopInterval={stopInterval}
				time={REAL_TIME_INTERVAL}
			/>
			<TrainTimeline stops={result.fermate} keyData={dataKey} stationHandler={props.stationHandler} />
		</>
	) : (
		''
	);

	const title = (
		<>
			{train.acronym} {train.trainid}
		</>
	);

	const disabled = train.error ? 'disabled' : 'enabled';

	return (
		<Collapse onChange={onCollapse} collapsible={disabled}>
			<Panel header={title} key={dataKey}>
				{loading ? <Skeleton active /> : info}
			</Panel>
		</Collapse>
	);
};

export default Train;
