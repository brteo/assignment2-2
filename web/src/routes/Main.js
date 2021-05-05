/* eslint-disable react/display-name */
import React, { useState } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button, Table } from 'antd';

import ApiCheck from '../components/ApiCheck';
import ErrorModal from '../components/ErrorModal';
import SolutionsForm from '../components/SolutionsForm';

const Home = props => {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [results, setResults] = useState([]);
	const columns = [
		{
			title: 'ID',
			dataIndex: 'idsolution',
			key: 'idsolution',
			render: id => (
				// eslint-disable-next-line no-use-before-define
				<Button type="link" onClick={() => detailHandler(id)}>
					{id}
				</Button>
			)
		},
		{
			title: 'Origin',
			dataIndex: 'origin',
			key: 'origin'
		},
		{
			title: 'Destination',
			dataIndex: 'destination',
			key: 'destination'
		},
		{
			title: 'Departure',
			dataIndex: 'departuretime',
			key: 'departuretime',
			render: time => <Moment format="DD/MM/YYYY HH:mm">{time}</Moment>
		},
		{
			title: 'Arrival',
			dataIndex: 'arrivaltime',
			key: 'arrivaltime',
			render: time => <Moment format="DD/MM/YYYY HH:mm">{time}</Moment>
		}
	];

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
				ErrorModal(error);
			});
	};

	const detailHandler = id => {
		axios
			.get(process.env.REACT_APP_ENDPOINT + 'solutions/' + id)
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				ErrorModal(error);
			});
	};

	return (
		<section>
			<ApiCheck />
			<SolutionsForm submit={solutionSubmit} />
			{show ? <Table columns={columns} dataSource={results} /> : ''}
		</section>
	);
};

export default Home;
