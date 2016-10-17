import ServerConnection from './modules/ServerConnection/index.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppLayout.js';
import BetManager from 'BetManager/index.js';
/**
 * @class - main of game
 */
class Game {
	/**
	 * @constructor
	 * @param {object} options
	 * @param {object} options.connection
	 * @param {object} options.extendConfiguration - configuration of symbols
	 */
	constructor(options) {
		let serverConnection = new ServerConnection(options.connection);
		let betManager = new BetManager(serverConnection);
		serverConnection.send('getConfiguration');
		serverConnection.send('getCurrentState');
		ReactDOM.render(<App configuration={options.extendConfiguration} serverConnection={serverConnection} betManager={betManager}></App>, document.querySelectorAll(options.renderTo)[0]);
	}
}

module.exports = Game;