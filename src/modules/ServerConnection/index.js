let instance = null;
import _ from 'underscore';
/**
 * @class ServerConnection - singleton that exist for handling communication with server
 * @type {Object|*}
 *
 */
export default class ServerConnection{
	/**
	 * @constructor
	 * @param {object} options - configuration object
	 * @param {string} options.api_url - url of server with API
	 * @param {number} options.protocol_version - information about witch protocol is uses
	 * @return {*}
	 */
	constructor(options) {
		this.REQUEST_VALIDATION = {
			getConfiguration: true,
			getCurrentState: true,
			makeBet: {
				linesCount: 'number',
				lineBet: 'number'
			}
		};
		this.RESPONSE_VALIDATION = {
			slotConfiguration: {
				rows: 'number',
				reels: 'number',
				lines: Array
			},
			symbolsInfo: {
				symbols: Array
			},
			winLinesInfo: {
				lineResults: Array	
			},
			error: {
				eventName: 'string',
				request: Object,
				errorCode: 'string'
			},
			balance: {
				balance: 'number'
			},
			coinsInfo: {
				coinValue: 'number',
				maxCoins: 'number',
				minCoins: 'number'
			},
			gameStatus: {
				roundId: 'number',
				totalBet: 'number',
				totalWin: 'number'
			},
			winAmount: {
				type: 'number'
			}
		};
		let Protocol = require('./Protocols/v' + options.protocol_version +'.js').default;
		this.protocol = new Protocol(options);
		
	}

	/**
	 * custom validator of data todo use some library or move to separate module
	 */
	validateData(data, validationConfiguration) {
		if (_.isUndefined(validationConfiguration)) {
			return false;
		}
		if (validationConfiguration == true) {
			return true;
		}
		let isValid = true;
		let key;
		let value;
		for (key in data) {
			value = data[key];
			let propertyInfo = validationConfiguration[key];
			if (_.isUndefined(propertyInfo)) {
				return false;
			}
			if (_.isString(propertyInfo)) {
				if (typeof  value !== propertyInfo) {
					isValid = false;
					break;
				}
			} else {
				if (!(value instanceof propertyInfo)) {
					if (typeof  value !== propertyInfo) {
						isValid = false;
						break;
					}
				}
			}

		}
		return isValid;
	}
	/**
	 *
	 * @param {string} eventName
	 * @param {function} handler
	 */
	on(eventName, handler) {
		var handlerWrapper = (data) => {
			let validationInfo = this.RESPONSE_VALIDATION[eventName];
			this.validateData(data, validationInfo);
			if (this.validateData(data, validationInfo)) {
				handler(data);
			} else {
				console.warn('wrong data from server', eventName, JSON.stringify(data, null, 2), 'expected', JSON.stringify(validationInfo, null, 2));
			}
		};
		this.protocol.on(eventName, handlerWrapper);
	}

	/**
	 *
	 * @param {string} eventName
	 * @param {object} [data]
	 */
	send(eventName, data) {
		if (this.validateData(data, this.REQUEST_VALIDATION[eventName])) {
			this.protocol.send(eventName, data);
		} else {
			console.warn('wrong request format', eventName, JSON.stringify(data, null, 2), 'expected', JSON.stringify(this.REQUEST_VALIDATION[eventName], null, 2));
		}
	}
};