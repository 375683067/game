import React from 'react';
import Selector from 'Selector/index.js';
export default class CoinCount extends React.Component {
	/**
	 * @param props
	 * @param {object} props.serverConnection
	 * @param {object} props.betManager
	 */
	constructor (props) {
		super();
		this.state = {
			coinValue: 0,
			maxCoins: 0,
			minCoins: 0
		};
		props.serverConnection.on('coinsInfo', (coinsInfo) => {
			this.props.betManager.setLineBet(coinsInfo.minCoins);
			this.setState(coinsInfo);
		});
	}

	/**
	 * triggers when selector change valued
	 * @param {number} newVal
	 */
	changed (newVal) {
		this.props.betManager.setLineBet(newVal);
	}
	/**
	 *
	 */
	render () {
		return <div className="md-line-bet">
			<div className="md-line-bet__title">Coins count</div>
			<Selector
				onChange={this.changed.bind(this)}
				min={this.state.minCoins}
				max={this.state.maxCoins}
				step={1}
				currentValue={this.state.minCoins}></Selector>
		</div>
	}
}