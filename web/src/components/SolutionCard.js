import React from 'react';
import Moment from 'react-moment';
import { Card } from 'antd';

const SolutionCard = props => {
	const { solution } = props;

	return (
		<Card title={solution.idsolution}>
			<p>{solution.origin}</p>
			<p>{solution.destination}</p>
			<p>
				<Moment format="DD/MM/YYYY HH:mm">{solution.departuretime}</Moment>
			</p>
			<p>
				<Moment format="DD/MM/YYYY HH:mm">{solution.arrivaltime}</Moment>
			</p>
		</Card>
	);
};

export default SolutionCard;
