import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const ErrorPage = props => {
	return (
		<Result
			status="error"
			title={props.status}
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Link to="/">
					<Button type="primary">Back Home</Button>
				</Link>
			}
		/>
	);
};

ErrorPage.propTypes = { status: PropTypes.string.isRequired };
export default ErrorPage;
