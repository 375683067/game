var path = require('path');
module.exports = {
	entry: "./src/Game.js",
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
			},
			{
				test: /\.less$/,
				loader: "style!css!autoprefixer!less",
				exclude: /(node_modules|dist)/,
			}
		]
	},
	watch: true,
	devtool: 'sourcemap'
};
