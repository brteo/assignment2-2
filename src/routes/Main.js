import React from 'react';
import Moment from 'react-moment';
import { Button, Layout } from 'antd';
import logo from '../img/logo.svg';

const { Content } = Layout;

const Home = props => {
	return (
		<Content>
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				<Button type="primary">Primary Button</Button>
			</p>
			<p>
				<Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment>
			</p>
		</Content>
	);
};

export default Home;
