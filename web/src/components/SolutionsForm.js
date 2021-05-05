import React from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, TimePicker } from 'antd';

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
				// eslint-disable-next-line no-nested-ternary
				[k]: k === 'date' ? moment(v).format(dateFormat) : k === 'time' ? moment(v).format(timeFormat) : v
			}),
			{}
		);

		props.submit({ ...cleanValues });
	};

	return (
		<Form layout="inline" initialValues={initialValues} onFinish={onSubmit}>
			<Form.Item name="from" rules={[{ required: true, message: 'Please input the origin station!' }]}>
				<Input placeholder="From" />
			</Form.Item>
			<Form.Item name="to" rules={[{ required: true, message: 'Please input the destination station!' }]}>
				<Input placeholder="To" />
			</Form.Item>
			<Form.Item name="date">
				<DatePicker format={dateFormat} />
			</Form.Item>
			<Form.Item name="time">
				<TimePicker format={timeFormat} />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Search
				</Button>
			</Form.Item>
		</Form>
	);
};

export default SolutionsForm;
