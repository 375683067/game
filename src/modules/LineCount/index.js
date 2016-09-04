import React from 'react';
import Selector from 'modules/Selector/index.js';
export default class LineCount extends React.Component {
	/**
	 *
	 * @param {object} props
	 * @param {object} props.betManager
	 * @param {object} props.serverConnection
	 */
	constructor(props) {
		super();
		this.state = {
			lineCount: 1,
			min: 1,
			max: 1
		};
		props.betManager.setLineCount(1);
		props.serverConnection.on('slotConfiguration', (slotConfiguration) => {
			this.setState({
				max: slotConfiguration.lines.length
			});
		});
	}
	/**
	 *
	 * @param {number} newVal
	 */
	onChange(newVal) {
		this.props.betManager.setLineCount(newVal);
	}
	/**
	 *
	 */
	render() {
		return <div className="md-line-count">
			<div className="md-line-header">
				Line count:
			</div>
			<Selector
				min={this.state.min}
				max={this.state.max}
				currentValue={this.state.lineCount}
				step={1}
				onChange={this.onChange.bind(this)}></Selector>
		</div>
	}
}