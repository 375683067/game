import Protocol from './protocol';
import fetch from 'isomorphic-fetch';
import _ from 'underscore';
import querryString from 'query-string';
export default class v1 extends Protocol {
	/**
	 *
	 * @param options
	 */
	constructor(options) {
		super(options);
		this.protocol_version = options.protocol_version;
		this.SERVER_REQUEST = {
			'getConfiguration': {
				id: '/slot/config',
				handleResponse: ({coinValue, lines, maxCoins, minCoins, reels, rows}, request) => {
					this.trigger('coinsInfo', {
						coinValue: coinValue * 100,
						maxCoins,
						minCoins
					});
					this.trigger('slotConfiguration', {
						reels,
						rows,
						lines
					});
				}
			},
			'getCurrentState': {
				id: '/slot/state',
				handleResponse: (data, request) => {
					this.trigger('symbolsInfo', {
						symbols: this.normalizeSymbols(data.symbols)
					});
					this.trigger('balance', {
						balance: data.balance
					});
					this.trigger('gameStatus', {
						roundId: data.gameRoundId,
						totalBet: data.totalBet,
						totalWin: data.totalWin
					});
				}
			},
			'makeBet': {
				id: '/slot/spin',
				//requestDataHandler: (data, request) => {
				//	var querry = '?' + querryString
				//	return {
				//		fetchUrl: this.api_url +
				//	}
				//},
				handleResponse: (data, request) => {
					this.trigger('symbolsInfo', {
						symbols: this.normalizeSymbols(data.symbols)
					});
					this.trigger('gameStatus', {
						roundId: data.gameRoundId,
						totalBet: data.totalBet,
						totalWin: data.totalWin
					});
					this.trigger('winLinesInfo', {
						lineResults: _.filter(data.lineResults, (lineInfo) => {
							return lineInfo.win > 0;
						})
					});
					this.send('getCurrentState');
				}
			}
		}
	}

	/**
	 *
	 * @param symbols
	 */
	normalizeSymbols(symbols) {
		let toReturn = [];
		let i, len, j_len, j;
		for (i = 0, len = symbols.length; i < len; i++) {
			toReturn.push([]);
			for (j = 0, j_len = symbols[i].length; j < j_len; j++) {
				toReturn[i][j] = symbols[j][i];
			}
		}
		return toReturn;
	}

	send(eventName, data) {
		let request = this.SERVER_REQUEST[eventName];
		if (request) {
			if (request.id) {
				request.fetchUrl = this.api_url + request.id;
			}
			if (_.isObject(data)) {
				request.fetchUrl += '?' + querryString.stringify(data);
			}
			if (request.requestDataHandler) {
				Object.assign(request, request.requestDataHandler.call(this, data, request));
			}
			fetch(request.fetchUrl).then(function (response) {
				return response.json();
			}).then((data) => {
				if (data.errorCode) {
					this.trigger('error', {
						eventName: eventName,
						request: request,
						errorCode: data.errorCode
					});
				}
				if (request.handleResponse) {
					request.handleResponse.call(this, data, request);
				}
			});
		} else {
			console.warn('request', eventName, 'doesn\'t supported in protocol v' + this.protocol_version);
		}

	}
};