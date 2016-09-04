import React from 'react';
import _ from 'underscore';
import Style from './selector.less';
export default class LineBet extends React.Component {
	/**
	 *
	 * @param {object} props
	 * @param {number} props.min
	 * @param {number} props.max
	 * @param {number} props.step
	 * @param {number} props.currentValue
	 * @param {number} props.onChange
	 * @param {number} [props.coefficient]
	 */
	constructor (props) {
		super();
		this.state = {
			value: props.currentValue,
			coefficient: _.isNumber(props.coefficient) ? props.coefficient  : 1
		};
	}
	/**
	 *
	 */
	componentWillReceiveProps(props) {
		this.setState({
			value: props.currentValue
		})
	}
	/**
	 *
	 */
	prevVal() {
		let value = this.state.value - this.props.step;
		this.setState({
			value
		});
		this.props.onChange(value);
	}
	/**
	 *
	 */
	nextVal() {
		let value = this.state.value + this.props.step;
		this.setState({
			value
		});
		this.props.onChange(value);
	}
	/**
	 *
	 */
	isPrevDisabled() {
		if (this.state.value === this.props.min) {
			return 'md-selector__editor-element_disabled'
		}
	}
	/**
	 *
	 */
	isNexDisabled() {
		if (this.state.value === this.props.max) {
			return 'md-selector__editor-element_disabled'
		}
	}
	/**
	 *
	 */
	render () {
		return <div className="md-selector">
			<button onClick={this.prevVal.bind(this)} className={'md-selector__editor-element ' + this.isPrevDisabled()}><span>-</span></button>
			<div className="md-selector__editor-element md-selector__editor-element_value"> {this.state.value / this.state.coefficient} </div>
			<button onClick={this.nextVal.bind(this)} className={'md-selector__editor-element ' + this.isNexDisabled()}><span>+</span></button>
		</div>
	}
}