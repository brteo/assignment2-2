import React from 'react';
import Moment from 'react-moment';
import { Button, Layout } from 'antd';

const { Content } = Layout;

const Home = props => {
	return (
		<section>
			<p>
				<Button type="primary">Primary Button</Button>
			</p>
			<p>
				<Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment>
			</p>
		</section>
	);
};

export default Home;
