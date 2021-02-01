const webpack = require("webpack");
const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [paths.src + "/index.js"],
	output: {
		path: paths.build,
		filename: "[name].bundle.js",
		publicPath: "/",
	},
	target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
	plugins: [
		new webpack.ProgressPlugin({
			activeModules: true,
			percentBy: "entries",
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.public,
					to: "assets",
					globOptions: {
						ignore: ["**/index.html"],
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: paths.public + "/index.html",
		}),
	],
	resolve: {
		modules: ["node_modules", paths.src],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "thread-loader",
						options: {
							workerParallelJobs: 50,
						},
					},
					{
						loader: "babel-loader",
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { sourceMap: true },
					},
					{ loader: "postcss-loader", options: { sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } },
				],
			},
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
		],
	},
};
