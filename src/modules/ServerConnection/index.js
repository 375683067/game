let instance = null;
/**
 * @class ServerConnection - singleton that exist for handling communication with server
 * @type {Object|*}
 * 
 */
export default class ServerConnection {
	/**
	 * @constructor
	 * @param {object} options - configuration object
	 * @param {string} options.api_url - url of server with API
	 * @param {number} options.protocol_version - information about witch protocol is uses
	 * @return {*}
	 */
	constructor(options) {
		//singleton realization
		if (!instance) {
			instance = this;
		} else {
			return instance;
		}
		//end singleton realization
		let Protocol = require('./Protocols/v' + options.protocol_version +'.js').default;
		this.protocol = new Protocol(options);
		
	}

	/**
	 *
	 * @param {string} eventName
	 * @param {function} handler
	 */
	on(eventName, handler) {
		this.protocol.on(eventName, handler);
	}

	/**
	 *
	 * @param {string} eventName
	 * @param {object} [data]
	 */
	send(eventName, data) {
		this.protocol.send(eventName, data);
	}
};