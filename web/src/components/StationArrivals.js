/* eslint-disable react/display-name */
import React from 'react';
import Moment from 'react-moment';
import { Table, Tag } from 'antd';

const StationArrivals = props => {
	const { arrivals } = props;

	const columns = [
		{
			title: 'Train',
			dataIndex: 'compNumeroTreno',
			key: 'compNumeroTreno',
			width: '110px',
			render: id => (
				<Tag color="default" style={{ display: 'inline-block', width: '100%' }}>
					{id}
				</Tag>
			)
		},
		{
			title: 'Origin',
			dataIndex: 'origine',
			key: 'origine'
		},
		{
			title: 'Time',
			dataIndex: 'orarioArrivo',
			key: 'orarioArrivo',
			render: time => <Moment format="HH:mm">{time}</Moment>
		},
		{
			title: 'Delay',
			dataIndex: 'ritardo',
			key: 'ritardo',
			render: ritardo => (ritardo > 0 ? <Tag color="error">{ritardo}</Tag> : '-'),
			width: '75px'
		},
		{
			title: 'Rail',
			dataIndex: 'binario',
			key: 'binario',
			width: '75px'
		}
	];

	return (
		<Table columns={columns} dataSource={arrivals} pagination={{ defaultPageSize: 5, size: 'small' }} rowKey="id" />
	);
};

export default StationArrivals;
