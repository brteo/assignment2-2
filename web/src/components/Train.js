import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Collapse, Skeleton, Typography, Space } from 'antd';
import { FieldNumberOutlined } from '@ant-design/icons';

import ErrorModal from './ErrorModal';
import TrainTimeline from './TrainTimeline';

const { Panel } = Collapse;
const { Text } = Typography;

const Train = props => {
	const { train, dataKey } = props;
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	const getRealTimeInfo = () => {
		console.log('GO');
		setLoading(true);
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

	const onCollapse = key => {
		if (key.length) {
			getRealTimeInfo();
		} else {
			setResult(null);
		}
	};

	const info = result ? (
		<>
			<Space wrap>
				<Text type="secondary">Ritardo</Text>
				<Text type={result.ritardo > 0 ? 'danger' : 'success'}>{result.compRitardo[1]}</Text>
				<Text type="secondary">Last Detection</Text>
				{result.oraUltimoRilevamento ? (
					<Text>{moment(result.oraUltimoRilevamento, 'x').fromNow()}</Text>
				) : (
					<Text>-</Text>
				)}
			</Space>
			<TrainTimeline stops={result.fermate} keyData={dataKey} />
		</>
	) : (
		''
	);

	const title = (
		<>
			TRAIN <FieldNumberOutlined /> {train.trainid}
		</>
	);

	return (
		<Collapse onChange={onCollapse}>
			<Panel header={title} key={dataKey}>
				{loading ? <Skeleton active /> : info}
			</Panel>
		</Collapse>
	);
};

export default Train;
