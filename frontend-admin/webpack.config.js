const html = new (require("html-webpack-plugin"))({
	template: "./src/index.html",
	filename: "./index.html"
})

const path = require('path')

module.exports = {
	mode: 'development',
	devServer: {
		port: 8081,
		proxy: {
			'/api': 'http://localhost:8082'
		}
	},
	resolve: {
		roots: [path.resolve('./src')],
		alias: {
			'@lib': path.resolve('../lib/src')
		},
		modules: [path.resolve(__dirname, 'node_modules')]
	},	
	module: {
		rules: [
		{
			test: /\.js$/,
	   		exclude: /node_modules/,
   			use: {
     				loader: "babel-loader",
				options: {
					presets: [
						[{presets: ['@babel/preset-react']}]
					],
				}
   			}
		},
 		{
  			test: /\.css$/,
   			use: ["style-loader", "css-loader"]
		},
	]},
	plugins: [html]
}
