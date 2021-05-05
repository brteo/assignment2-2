import React from 'react';
import Moment from 'react-moment';
import { Card, Divider, Badge, Typography, Space, Row, Col } from 'antd';
import { ClockCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';

import Train from './Train';

const { Ribbon } = Badge;
const { Text } = Typography;

const SolutionCard = props => {
	const { solution } = props;

	const title = (
		<>
			{solution.origin} <DoubleRightOutlined /> {solution.destination}
		</>
	);

	return (
		<Ribbon text={solution.idsolution} color="cyan">
			<Card title={title}>
				<Row gutter={[8, 8]}>
					<Col xs={{ span: 24 }} md={{ span: 8 }}>
						<Space>
							<ClockCircleOutlined />
							<Text type="secondary">Departure time</Text>
							<Moment format="DD/MM/YYYY HH:mm">{solution.departuretime}</Moment>
						</Space>
					</Col>
					<Col xs={{ span: 24 }} md={{ span: 8 }}>
						<Space>
							<ClockCircleOutlined />
							<Text type="secondary">Arrival time</Text>
							<Moment format="DD/MM/YYYY HH:mm">{solution.arrivaltime}</Moment>
						</Space>
					</Col>
					<Col xs={{ span: 24 }} md={{ span: 8 }}>
						<Space>
							<ClockCircleOutlined />
							<Text type="secondary">Duration</Text>
							<Text type="primary">{solution.duration}</Text>
						</Space>
					</Col>
				</Row>
				<Divider orientation="left" plain>
					Trains
				</Divider>
				{solution.trains.map(train => (
					<Train
						key={solution.idsolution + '-' + train.trainid}
						dataKey={solution.idsolution + '-' + train.trainid}
						train={train}
					/>
				))}
			</Card>
		</Ribbon>
	);
};

export default SolutionCard;
