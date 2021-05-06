import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import Main from './Main';
import ErrorPage from '../components/ErrorPage';
import ApiCheck from '../components/ApiCheck';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const Routes = props => {
	return (
		<BrowserRouter history={props.history}>
			<Layout>
				<Header>
					<Title level={3}>PCD - Ass #02/2</Title>
					<ApiCheck />
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
