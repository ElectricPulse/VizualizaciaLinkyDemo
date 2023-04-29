const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

//Need this so that images can be fetched (not imported -> turns the images to specific ids that are hosted on the server) -- FOR DEVSERVER
const assetsPlugin = new CopyWebpackPlugin({
	patterns: [
		{ from: 'src', to: 'assets' }
	]
});

const path = require('path')

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: './src/index.js',
	devServer: {
		port: 8080,
		proxy: {
			'/api': 'http://localhost:8081',
		}
	},
	resolve: {
		roots: [path.resolve('./src')],
		alias: {
			'@shared': path.resolve(__dirname, 'lib')
		}
	},
 	module: {
		rules: [
		{
			test: /\.js$/,
	   		exclude: /node_modules/,
   			use: {
     				loader: "babel-loader"
   			}
		},
 		{
  			test: /\.css$/,
   			use: ["style-loader", "css-loader"]
		},
		{
			test: /\.(png|jpg|svg)$/,
			use: {
				loader: "file-loader",
			}
		}
	]},
	plugins: [htmlPlugin, assetsPlugin]
};
