import EventEmitter from 'es6-event-emitter';
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
let renderLoop = new class EventLoop extends EventEmitter {
	constructor() {
		super();
		this.loop();
	}

	loop() {
		this.trigger('update');
		this.trigger('render');
		requestAnimationFrame(this.loop.bind(this));
	}

};
export default renderLoop;