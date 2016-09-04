import React from 'react';
export default class GameBalance extends React.Component {
	constructor(props) {
		super();
		this.state = {
			balance: 0
		};
		props.serverConnection.on('balance', (balanceInfo) => {
			this.setState(balanceInfo)
		});
	}

	render() {
		return <div className="md-game-balance">
			<span>Game balance: </span><span>{this.state.balance}</span>
		</div>
	}
};