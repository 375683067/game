import Styles from 'modules/SymbolsMonitor/symbolMonitor.less';
import React from 'react';
import _ from 'underscore';
import LineHighlight from 'LineHighlight/index.js';
export default class SymbolMonitor extends React.Component {
	/**
	 *
	 * @param {object} props
	 * @param {object} props.serverConnection
	 * @param {object} props.configuration - {symbolId: {img, text}, ...}
	 */
	constructor(props) {
		super();
		console.info(props);
		const SHOW_WIN_LINES_DURATION = 1500;
		let timeountId = null;
		this.state = {
			symbols: [],
			highlightedLines: []
		};
		/**
		 * information about lines configuration
		 * @type {Array}
		 */
		this.linesConfiguration = {};
		/**
		 * 
		 */
		props.serverConnection.on('symbolsInfo', (data) => {
			this.setState(data);
		});
		props.serverConnection.on('slotConfiguration', ({reels, rows, lines}) => {
			this.linesConfiguration = _.indexBy(lines, 'id');
			this.setState({
				reels,
				rows
			});
		});
		props.serverConnection.on('winLinesInfo', (data) => {
			let lines = [];
			_.each(data.lineResults, (lineInfo) => {
				lines.push(this.linesConfiguration[lineInfo.lineId]);
			});
			this.setState({
				highlightedLines: lines
			});
			clearTimeout(timeountId);
			if (!_.isEmpty(lines)) {
				timeountId = setTimeout(() => {
					this.setState({
						highlightedLines: []
					});
				}, SHOW_WIN_LINES_DURATION);
			}
		})
	}
	/**
	 *
	 * @param symbol
	 */
	getImage(symbol) {
		if (this.props.configuration) {
			if (this.props.configuration[symbol]) {
				if (_.isString(this.props.configuration[symbol].text)) {
					return <span className="md-symbol-monitor__symbol-text-content">{this.props.configuration[symbol].text}</span>
				} else {
					return <span className="md-symbol-monitor__symbol-text-content">{symbol}</span>
				}
			}
		}
		return <span className="md-symbol-monitor__symbol-text-content">{symbol}</span>;
	}
	/**
	 *
	 * @param symbol
	 */
	getText(symbol) {
		if (this.props.configuration) {
			if (this.props.configuration[symbol]) {
				if (_.isString(this.props.configuration[symbol].img)) {
					return <div className="md-symbol-monitor__symbol-image" style={{'backgroundImage': 'url(' + this.props.configuration[symbol].img + ')'}}></div>
				}
			}
		}
	}
	/**
	 *
	 */
	getReelContent(reelInfo) {
		return reelInfo.map((symbol, i)=> {
			return <div key={i} className={'md-symbol-monitor__symbol md-symbol-monitor__symbol_' + symbol}>
				{this.getText(symbol)}
				{this.getImage(symbol)}
			</div>
		});

	}
	/**
	 * generates reels
	 */
	getReels() {
		return this.state.symbols.map((reelInfo, i) => {
			return <div key={i} className={'md-symbol-monitor__reel md-symbol-monitor__reel_' + i}>
				{this.getReelContent(reelInfo)}
			</div>
		});
	}
	/**
	 * 
	 * @return {string}
	 */
	getClass() {
		return [
			'md-symbol-monitor',
			'md-symbol-monitor__rows-count-' + this.state.rows,
			'md-symbol-monitor__reels-count-' + this.state.reels
		].join(' ');
	}
	/**
	 *
	 * @return {XML}
	 */
	render() {
		return <div className={this.getClass()}>
			{this.getReels()}
			<LineHighlight rows={this.state.rows}
						   reels={this.state.reels}
						   highlightLines={this.state.highlightedLines}></LineHighlight>
		</div>
	}

}