var path = require('path');
module.exports = {
	context: __dirname + '/src',
	entry: "./Game.js",
	output: {
		path: __dirname + '/dist',
		filename: "build.js",
		library: "Game"
	},
	resolve: {
		root: [
			path.resolve('./src'),
			path.resolve('./src/modules')
		]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=react,presets[]=es2015',
				exclude: /(node_modules|dist)/,
			}
		]
	},
	watch: true,
	devtool: 'sourcemap',
	// devServer: {
	// 	host: 'http://127.0.0.0',
	// 	port: '9000'
	// }
};
