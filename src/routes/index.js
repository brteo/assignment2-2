import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './Main';
import ErrorPage from '../components/ErrorPage';

const Routes = props => {
	return (
		<BrowserRouter history={props.history}>
			<Layout className="layout fullpage">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route component={() => <ErrorPage status="404" />} />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
};

export default Routes;
