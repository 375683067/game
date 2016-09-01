import Protocol from './protocol';
import fetch from 'isomorphic-fetch';
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
				handleResponse: (data, request) => {
				}
			},
			'getCurrentState': {
				id: '/slot/state',
				handleResponse: (data, request) => {

				}
			},
			'makeBet': {
				requestDataHandler: (data, request) => {
					return {
						fetchUrl: this.api_url + '/slot/spin?lineBet=100&linesCount=3'
					}
				},
				handleResponse: (data, request) => {
				}
			}
		}

	}

	send(eventName, data) {
		let request = this.SERVER_REQUEST[eventName];
		if (request) {
			if (request.id) {
				request.fetchUrl = this.api_url + request.id;
			}
			if (request.requestDataHandler) {
				Object.assign(request, request.requestDataHandler(data, request));
			}
			fetch(request.fetchUrl).then(function (response) {
				return response.json();
			}).then(function (data) {

				if (data.errorCode) {
					this.trigger('error', {
						eventName: eventName,
						request: request,
						errorCode: data.errorCode
					});
				}

				if (request.handleResponse) {
					request.handleResponse(data, request);
				}
				console.info(data);
			});
		} else {
			console.warn('request', eventName, 'doesn\'t supported in protocol v' + this.protocol_version);
		}

	}
};