import React from 'react';
import _ from 'underscore';
import Styles from './errorMessage.less';
export default class ErrorMessages extends React.Component {
	/**
	 *
	 */
	constructor(props) {
		super();
		this.state = {
			error: null
		};
		props.serverConnection.on('error', (error) => {
			this.setState({
				error
			});
		});
	}
	/**
	 *
	 */
	handleError() {
		if (_.isObject(this.state.error)) {
			return <div className="md-error-massages__details">
				<div>
					Error:
				</div>
				<div>
					<span>error code: </span> <span>{this.state.error.errorCode}</span>
				</div>
				<div>
					<span>at request: </span> <span>{JSON.stringify(this.state.error.request)}</span>
				</div>
			</div>
		}
	}
	/**
	 *
	 */
	render() {
		return <div className="md-error-massages">
			{this.handleError()}
		</div>
	}
}