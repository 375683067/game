import React from 'react';
import img from './jeu-zero-wheel.png';
import './wheel.less';
import renderLoop from '../renderLoop.js';
window.wheelSpeed = 1;
window.ballSpeed = 4;
export default class Wheel extends React.Component {
	constructor() {
		super();
	}

	wheelCreated(wheel) {
		let degree = 0;
		renderLoop.on('update', () => {
			degree += window.wheelSpeed;
		});
		renderLoop.on('render', () => {
			wheel.style.transform = 'rotateZ(' + degree + 'deg) translateZ(0)';
		});
	}

	ballCreated(ball) {
		let degree = 0;
		renderLoop.on('update', () => {
			degree -= window.ballSpeed;
		});
		renderLoop.on('render', () => {
			ball.style.transform = 'rotateZ(' + degree + 'deg) translateZ(0)';
		});
	}

	render() {
		return <div className="md-roulette-wheel">
			<div className="md-roulette-wheel__rotated_element">
				<div ref={this.wheelCreated.bind(this)} className="md-roulette-wheel__element">
					<div ref={this.ballCreated.bind(this)} className="md-roulette-wheel__ball"></div>
				</div>
			</div>
		</div>
	}
}