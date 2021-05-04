import React, { useState } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Button, Table } from 'antd';
import ApiCheck from '../components/ApiCheck';

const Home = props => {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [results, setResults] = useState([]);
	const columns = [
		{
			title: 'ID',
			dataIndex: 'idsolution',
			key: 'idsolution'
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
			// eslint-disable-next-line react/display-name
			render: time => <Moment format="DD/MM/YYYY HH:mm">{time}</Moment>
		},
		{
			title: 'Arrival',
			dataIndex: 'arrivaltime',
			key: 'arrivaltime',
			// eslint-disable-next-line react/display-name
			render: time => <Moment format="DD/MM/YYYY HH:mm">{time}</Moment>
		}
	];

	const buttonHandler = () => {
		setLoading(true);
		axios
			.get(process.env.REACT_APP_ENDPOINT + 'solutions', {
				params: {
					from: 'FANO',
					to: 'CESENA',
					ar: 'A',
					date: '04/05/2021',
					time: '10.00',
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
				console.log('Error', error);
			});
	};

	return (
		<section>
			<ApiCheck />
			<p>
				<Button type="primary" loading={loading} onClick={buttonHandler}>
					Click
				</Button>
			</p>
			{show ? <Table columns={columns} dataSource={results} /> : ''}
		</section>
	);
};

export default Home;
