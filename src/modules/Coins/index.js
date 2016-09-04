import React from 'react';
import ServerConnection from 'modules/Coins/index.js';
export default class Coins extends React.Component {
	/**
	 *
	 */
	constructor (props) {
		super();
		this.state = {
			coinValue: 0,
			maxCoins: 0,
			minCoins: 0
		};
		props.serverConnection.on('coinsInfo', (coinsInfo) => {
			this.setState(coinsInfo);
		});
	}
	/**
	 *
	 */
	render () {
		return <div>
			<div><span>Coin value: </span><span>{this.state.coinValue / 100}</span></div>
			<div><span>Max coins: </span><span>{this.state.maxCoins}</span></div>
			<div><span>Min coins: </span><span>{this.state.minCoins}</span></div>
		</div>
	}
}