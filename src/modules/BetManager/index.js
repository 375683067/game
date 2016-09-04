export default class BetManager  {
	/**
	 *
	 * @param {object} props
	 * @param {object} props.serverConnection
	 */
	constructor(props) {
		this.lineBet = 0;
		this.lineCount = 0;
	}
	/**
	 *
	 * @param {number} amount
	 */
	setLineBet(amount) {
		this.lineBet = amount

	}
	/**
	 *
	 * @param {number} amount
	 */
	setLineCount(amount) {
		this.lineCount = amount;
	}

	/**
	 *
	 * @return {{linesCount: (number|*), lineBet: (number|*)}}
	 */
	getBetInfo() {
		return {
			linesCount: this.lineCount,
			lineBet: this.lineBet
		}
	}
}