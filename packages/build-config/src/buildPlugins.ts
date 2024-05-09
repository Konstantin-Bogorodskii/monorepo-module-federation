import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import { BuildOptions } from './types/types';
import { BUILD_MODE } from './constants/constants';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
	const { mode, paths, analyzer } = options;
	const isDev = mode === BUILD_MODE.DEVELOPMENT;
	const isProd = mode === BUILD_MODE.PRODUCTION;

	const plugins: Configuration['plugins'] = [
		// create new index.html file with connected styles and js files(with hashed files name). template is using for saving not default markup (like div#root and etc.)
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'favicon.ico')
		})
	];

	if (isDev) {
		// build progress bar in console
		plugins.push(new webpack.ProgressPlugin());
		// Speeds up TypeScript type checking (by moving it to a separate process)
		// plugins.push(new ForkTsCheckerWebpackPlugin());
		// Webpack plugin to enable "Fast Refresh" (also known as Hot Reloading) for React components.
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		);
		// Copies individual files or entire directories, which already exist, to the build directory.
		// plugins.push(
		// 	new CopyPlugin({
		// 		patterns: [
		// 			{
		// 				from: path.resolve(paths.public, 'locales'),
		// 				to: path.resolve(paths.output, 'locales')
		// 			}
		// 		]
		// 	})
		// );
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
};

export default buildPlugins;
