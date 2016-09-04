import React from 'react';
export default class SpinButton extends React.Component {
	/**
	 *
	 * @param props
	 * @param {object} props.betManager
	 * @param {object} props.serverConnection
	 */
	constructor(props) {
		super();
	}

	spin() {
		this.props.serverConnection.send('makeBet', this.props.betManager.getBetInfo());
	}

	render() {
		return <button onClick={this.spin.bind(this)} className="lt-spin-btn">
			<span>spin</span>
		</button>
	}
}