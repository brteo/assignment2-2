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
					{stop.partenzaReale ? (
						<>
							<div className="mobile-block">
								<Tag data-id={stop.id} color="green">
									{stop.stazione}
								</Tag>
							</div>
							<Space wrap>
								<Text type="secondary">left at</Text>
								<Moment format="DD/MM HH:mm">{stop.partenzaReale}</Moment>
								{stop.ritardo > 0 ? <Text type="danger">Delay {stop.ritardo}m</Text> : ''}
							</Space>
						</>
					) : (
						<>
							<div className="mobile-block">
								<Tag data-id={stop.id}>{stop.stazione}</Tag>
							</div>
							<Space wrap>
								<Text type="secondary">leave at</Text>
								<Moment format="DD/MM HH:mm">{stop.partenzaProgrammata}</Moment>
							</Space>
						</>
					)}
				</Timeline.Item>
			))}
		</Timeline>
	);
};

export default TrainTimeline;
