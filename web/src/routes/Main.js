/* eslint-disable no-nested-ternary */
/* eslint-disable react/display-name */
import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { Skeleton, Space, Drawer } from 'antd';

import ErrorModal from '../components/ErrorModal';
import SolutionsForm from '../components/SolutionsForm';
import SolutionCard from '../components/SolutionCard';
import Station from '../components/Station';

const Home = props => {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [results, setResults] = useState([]);
	const [stationVisible, setStationVisible] = useState(false);
	const [station, setStation] = useState(null);
	const [isMobile, setMobile] = useState(false);

	useLayoutEffect(() => {
		const checkMobile = () => {
			setMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', checkMobile);
		checkMobile();

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

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
				setResults(res.data);
			})
			.catch(error => {
				setLoading(false);
				setShow(false);
				setResults([]);
				ErrorModal(error);
			});
	};

	const getStationInfo = (id, name) => {
		setStationVisible(true);
		setStation(null);
		const ret = { id, name };

		axios
			.get(process.env.REACT_APP_ENDPOINT + 'stations/arrivals/' + id)
			.then(arr => {
				ret.arrivals = arr.data;
				axios
					.get(process.env.REACT_APP_ENDPOINT + 'stations/departures/' + id)
					.then(dep => {
						ret.departures = dep.data;
						setStation(ret);
					})
					.catch(error => {
						setStation(null);
						ErrorModal(error);
					});
			})
			.catch(error => {
				setStation(null);
				ErrorModal(error);
			});
	};

	const onCloseStation = () => {
		setStationVisible(false);
		setStation(null);
	};

	return (
		<>
			<section>
				<SolutionsForm submit={solutionSubmit} loading={loading} />
				<Space direction="vertical" style={{ width: '100%' }}>
					{show ? (
						loading ? (
							<Skeleton active />
						) : (
							results.map(item => (
								<SolutionCard key={item.idsolution} solution={item} stationHandler={getStationInfo} />
							))
						)
					) : (
						''
					)}
				</Space>
			</section>
			<Drawer
				title={station ? station.name : ''}
				placement="right"
				visible={stationVisible}
				onClose={onCloseStation}
				mask={false}
				width={isMobile ? '80%' : '50%'}
			>
				{!station ? (
					<Skeleton active />
				) : (
					<Station stationId={station.id} arrivals={station.arrivals} departures={station.departures} />
				)}
			</Drawer>
		</>
	);
};

export default Home;
