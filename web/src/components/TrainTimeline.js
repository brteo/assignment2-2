import React from 'react';
import Moment from 'react-moment';
import { Timeline, Tag, Typography, Space } from 'antd';

const { Text } = Typography;

const TrainTimeline = props => {
	const { stops, dataKey } = props;

	return (
		<Timeline>
			{stops.map(stop => (
				<Timeline.Item key={dataKey + ' ' + stop.id} color={stop.partenzaReale ? 'green' : 'gray'}>
					<Tag>{stop.stazione}</Tag>
					{stop.partenzaReale ? (
						<Space>
							<Text type="secondary">left at</Text>
							<Moment format="HH:mm">{stop.partenzaReale}</Moment>
							{stop.ritardo > 0 ? <Text type="danger">Delay {stop.ritardo}m</Text> : ''}
						</Space>
					) : (
						<Space>
							<Text type="secondary">leave at</Text>
							<Moment format="HH:mm">{stop.partenzaProgrammata}</Moment>
						</Space>
					)}
				</Timeline.Item>
			))}
		</Timeline>
	);
};

export default TrainTimeline;
