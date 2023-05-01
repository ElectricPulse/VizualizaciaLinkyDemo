//Makes sure that node_modules dont get bundled
//const ext = require('webpack-node-externals')
const path = require('path')

module.exports = {
	mode: 'development',
	context: path.resolve(__dirname),
	entry: './src/index.js',
	output: {
		library: {
			name: 'myui',
			type: 'umd'
		},
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'out')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	externals: {
		React: 'react'
	}
}
