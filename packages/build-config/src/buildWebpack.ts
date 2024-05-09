import webpack from 'webpack';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import { BUILD_MODE } from './constants/constants';
import { BuildOptions } from './types/types';
import buildDevServer from './buildDevServer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const buildWebpack = (options: BuildOptions): webpack.Configuration => {
	const { mode, paths } = options;
	const isDev = mode === BUILD_MODE.DEVELOPMENT;

	const config: webpack.Configuration = {
		mode: mode ?? BUILD_MODE.DEVELOPMENT,
		entry: paths.entry,
		output: {
			filename: '[name].[contenthash].js',
			path: paths.output,
			// clean up output folder from previous versions of bundle files
			clean: true
		},
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		plugins: buildPlugins(options),
		optimization: {
			minimizer: [new CssMinimizerPlugin()],
			minimize: true
		}
	};

	return (() => {
		if (isDev) {
			return {
				...config,
				devServer: buildDevServer(options),
				// console log error from target file not bundle
				devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map'
			};
		}

		return config;
	})();
};

export default buildWebpack;
