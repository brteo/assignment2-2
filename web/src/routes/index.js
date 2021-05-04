import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Tag, Typography } from 'antd';

import Main from './Main';
import ErrorPage from '../components/ErrorPage';
import {} from 'antd/lib/layout/layout';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const Routes = props => {
	return (
		<BrowserRouter history={props.history}>
			<Layout>
				<Header>
					<Title level={2}>Trains</Title>
					<Tag color="blue">Assignment #02/2</Tag>
				</Header>
				<Content className="content">
					<Switch>
						<Route exact path="/" component={Main} />
						<Route component={() => <ErrorPage status="404" />} />
					</Switch>
				</Content>
				<Footer className="footer">Programmazione Concorrente e Distribuita - Assignment #02/2</Footer>
			</Layout>
		</BrowserRouter>
	);
};

export default Routes;
