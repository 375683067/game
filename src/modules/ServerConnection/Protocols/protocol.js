import EventEmitter from 'es6-event-emitter';
export default class Protocol extends EventEmitter {
	
	constructor(options) {
		super();
		this.api_url = options.api_url;
	}

	send() {};
};