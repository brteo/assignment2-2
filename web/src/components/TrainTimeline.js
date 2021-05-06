import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { Timeline, Tag, Typography, Space } from 'antd';

const { Text } = Typography;

const TrainTimeline = props => {
	const { stops, dataKey } = props;

	const timestamp = new Date().toString().replace(/ *\([^)]*\) */g, '');
	console.log(timestamp);

	console.log('http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/arrivi/S01700/' + timestamp);

	return (
		<Timeline>
			{stops.map(stop => (
				<Timeline.Item key={dataKey + ' ' + stop.id} color={stop.partenzaReale ? 'green' : 'gray'}>
					{stop.partenzaReale ? (
						<>
							<div className="mobile-block">
								<Tag color="green">{stop.stazione}</Tag>
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
								<Tag>{stop.stazione}</Tag>
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
