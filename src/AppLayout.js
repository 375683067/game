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


export default class AppLayout extends React.Component {
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

	render() {
		return <div id="lt-game">
			<div className="lt-line-count">
				<LineCount betManager={this.props.betManager} serverConnection={this.props.serverConnection}></LineCount>
			</div>
			<div className="lt-line-bet-editor">
				<CoinCount  serverConnection={this.props.serverConnection} betManager={this.props.betManager}></CoinCount>
			</div>
			<div className="lt-coins-layout">
				<Coins serverConnection={this.props.serverConnection}></Coins>
			</div>
			<div className="lt-balance-layout">
				<Balance serverConnection={this.props.serverConnection}></Balance>
			</div>
			<div className="lt-symbols">
				<SymbolsMonitor configuration={this.configuration.symbols} serverConnection={this.props.serverConnection}></SymbolsMonitor>
			</div>
			<div className="lt-error-messages">
				<ErrorMessages serverConnection={this.props.serverConnection}></ErrorMessages>
			</div>
			<div className="lt-game-status">
				<GameStatus serverConnection={this.props.serverConnection}></GameStatus>
			</div>
			<div className="lt-spin-button">
				<SpinButton serverConnection={this.props.serverConnection} betManager={this.props.betManager}></SpinButton>
			</div>
		</div>
	}
};