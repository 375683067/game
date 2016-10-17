import React from 'react';
import Balance from 'GameBalance/index.js';
import Coins from 'Coins/index.js';
import SymbolsMonitor from 'SymbolsMonitor/index.js';
import GameStatus from 'GameStatus/index.js';
import ErrorMessages from 'ErorrMessages/index.js';
import CoinCount from 'CoinCount/index.js';
import SpinButton from 'SpinButton/index.js';
import LineCount from 'LineCount/index.js';
import _ from 'underscore';
import layoutLess from 'layout.less';
import Wheel from 'Wheel/wheel.js';
class AppLayout extends React.Component {
	/**
	 *
	 * @param props
	 * @param {object} props.betManager - manage bets
	 * @param {object} props.serverConnection - communication with server
	 * @param {object} props.configuration
	 */
	constructor(props) {
		super();
		let defaultConfig = {
			symbols: {}
		};
		this.configuration = {};
		if (_.isEmpty(props.configuration)) {
			this.configuration = defaultConfig;
		} else {
			Object.assign(this.configuration, defaultConfig, props.configuration);
		}
	}

	/**
	 * method that render application layout
	 * @return {XML}
	 */
	render() {
		return <div id="lt-game">
			<Wheel/>
		</div>
	}
};

export default AppLayout;