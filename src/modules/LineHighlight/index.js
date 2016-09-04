import React from 'react';
import Style from './lineHighlight.less';
import _ from 'underscore';
export default class LineHighlight extends React.Component {
	/**
	 *
	 * @param props
	 * @param {number} props.reels - means count
	 * @param {number} props.rows - means count
	 * @param {array} props.highlightLines
	 */
	constructor(props) {
		super();
	}
	/**
	 *
	 */
	componentWillReceiveProps(props) {
		if (_.isEmpty(props.highlightLines)) {
			this.ctx.clearRect(0, 0, this.size.width, this.size.height);
		} else {
			this.drawLines();
		}
	}
	/**
	 *
	 */
	componentDidMount() {
		this.size = this.refs.canvas.getBoundingClientRect();
		this.ctx = this.refs.canvas.getContext('2d');
		this.refs.canvas.width = this.size.width;
		this.refs.canvas.height = this.size.height;
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = 'orange';
	}
	/**
	 *
	 */
	drawLines() {
		if (this.ctx) {
			this.ctx.clearRect(0,0, this.size.width, this.size.height);
			if (!_.isEmpty(this.props.highlightLines) && _.isNumber(this.props.reels) && _.isNumber(this.props.rows)) {
				_.each(this.props.highlightLines, (info) => {
					let chunkWidth = this.size.width / this.props.reels;
					let chunkHeight = this.size.height / this.props.rows;
					let i, len;
					let getX = (tmpCell) => {
						return chunkWidth * tmpCell.reel + 0.5 * chunkWidth;
					};
					let getY = (tmpCell) => {
						return chunkHeight * tmpCell.row + 0.5 * chunkHeight;
					};
					this.ctx.beginPath();
					this.ctx.moveTo(getX(info.cells[0]), getY(info.cells[0]));
					for (i = 1, len = info.cells.length; i < len; i++) {
						this.ctx.lineTo(getX(info.cells[i]), getY(info.cells[i]));
					}
					this.ctx.stroke();
				})
			}
		}
	}
	/**
	 *
	 */
	render() {
		return <div className="md-line-highlight">
			<canvas className="md-line-highlight__canvas" rel="canvas" ref="canvas"></canvas>
		</div>
	}

}