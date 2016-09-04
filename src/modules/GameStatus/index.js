import React from 'react';
export default class GameStatus extends React.Component {
	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super();
		this.state = {
			roundId: 0,
			totalBet: 0,
			totalWin: 0
		};
		props.serverConnection.on('gameStatus', (gameStatus) => {
			this.setState(gameStatus);
		});
	}
	/**
	 *
	 */
	render() {
		return <div className="md-game-status">
			<div className="md-game-status__round-id">
				<span>RoundId:</span><span>{this.state.roundId}</span>
			</div>
			<div className="md-game-status__total-bet">
				<span>Total bet:</span><span>{this.state.totalBet}</span>
			</div>
			<div className="md-game-status__total-win">
				<span>Total win:</span><span>{this.state.totalWin}</span>
			</div>
		</div>
	}
}