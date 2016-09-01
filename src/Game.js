import ServerConnection from './modules/ServerConnection/index.js';
// import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './AppLayout.js';
/**
 * @class - main of game
 */
module.exports = class Game {
	/**
	 * @constructor
	 * @param {object} options
	 * @param {object} options.connection
	 * @param {string} options.renderTo - query to element on with should be rendered our component
	 */
	constructor(options) {
		let serverConnection = new ServerConnection(options.connection);
		serverConnection.send('getConfiguration');
		serverConnection.send('getCurrentState');
		serverConnection.send('makeBet');
		console.info(options);
		ReactDOM.render(<App></App>, document.querySelectorAll(options.renderTo)[0]);
	}
};