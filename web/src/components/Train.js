import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Collapse, Skeleton, Typography } from 'antd';
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
