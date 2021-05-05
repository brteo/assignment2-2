/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import axios from 'axios';
import { Skeleton, Space } from 'antd';

import ErrorModal from '../components/ErrorModal';
import SolutionsForm from '../components/SolutionsForm';
import SolutionCard from '../components/SolutionCard';

const Home = props => {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [results, setResults] = useState([]);

	const solutionSubmit = values => {
		setLoading(true);
		axios
			.get(process.env.REACT_APP_ENDPOINT + 'solutions', {
				params: {
					from: values.from,
					to: values.to,
					ar: 'A',
					date: values.date,
					time: values.time,
					adults: '1',
					childrens: '0',
					direction: 'A',
					frecce: 'false',
					onlyRegional: 'false'
				}
			})
			.then(res => {
				setLoading(false);
				setShow(true);
				setResults(
					res.data.map(item => {
						return {
							key: item.idsolution,
							idsolution: item.idsolution,
							origin: item.origin,
							destination: item.destination,
							departuretime: item.departuretime,
							arrivaltime: item.arrivaltime
						};
					})
				);
			})
			.catch(error => {
				setLoading(false);
				setShow(false);
				ErrorModal(error);
			});
	};

	return (
		<section>
			<SolutionsForm submit={solutionSubmit} loading={loading} />
			<Space direction="vertical" style={{ width: '100%' }}>
				{show ? (
					loading ? (
						<Skeleton active />
					) : (
						results.map(item => <SolutionCard key={item.idsolution} solution={item} />)
					)
				) : (
					''
				)}
			</Space>
		</section>
	);
};

export default Home;
