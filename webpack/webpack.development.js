const paths = require("./paths");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		host: '0.0.0.0',
		historyApiFallback: true,
		contentBase: paths.build,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
		transportMode: "ws",
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
