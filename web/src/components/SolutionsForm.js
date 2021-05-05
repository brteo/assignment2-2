/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, TimePicker, Row, Col } from 'antd';

const SolutionsForm = props => {
	const dateFormat = 'DD/MM/YYYY';
	const timeFormat = 'HH:mm';

	const initialValues = {
		from: 'FANO',
		to: 'CESENA',
		date: moment(),
		time: moment()
	};

	const onSubmit = values => {
		const cleanValues = Object.entries(values).reduce(
			(p, [k, v]) => ({
				...p,
				[k]: k === 'date' ? moment(v).format(dateFormat) : k === 'time' ? moment(v).format(timeFormat) : v.trim()
			}),
			{}
		);

		props.submit({ ...cleanValues });
	};

	return (
		<Form initialValues={initialValues} onFinish={onSubmit}>
			<Row gutter={[8, 8]}>
				<Col xs={{ span: 24 }} md={{ span: 6 }}>
					<Form.Item name="from" rules={[{ required: true, message: 'Please input the origin station!' }]}>
						<Input placeholder="From" />
					</Form.Item>
				</Col>
				<Col xs={{ span: 24 }} md={{ span: 6 }}>
					<Form.Item name="to" rules={[{ required: true, message: 'Please input the destination station!' }]}>
						<Input placeholder="To" />
					</Form.Item>
				</Col>
				<Col xs={{ span: 12 }} md={{ span: 4 }}>
					<Form.Item name="date">
						<DatePicker format={dateFormat} style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col xs={{ span: 12 }} md={{ span: 4 }}>
					<Form.Item name="time">
						<TimePicker format={timeFormat} style={{ width: '100%' }} />
					</Form.Item>
				</Col>
				<Col xs={{ span: 24 }} md={{ span: 4 }}>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={props.loading} style={{ width: '100%' }}>
							Search
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default SolutionsForm;
