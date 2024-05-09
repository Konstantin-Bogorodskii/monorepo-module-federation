import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import { BUILD_MODE } from './constants/constants';
import ReactRefreshTypeScript from 'react-refresh-typescript';

const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === BUILD_MODE.DEVELOPMENT;

	const assetsLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource'
	};

	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [{ loader: '@svgr/webpack', options: { icon: true } }]
	};

	const cssLoader = {
		test: /\.css$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: isDev
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]'
					}
				}
			}
		]
	};

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					// Webpack plugin to enable "Fast Refresh" (also known as Hot Reloading) for React components.
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
					}),
					// speed up compilation significantly
					transpileOnly: isDev
				}
			}
		]
	};

	const babelLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					['@babel/preset-react', { runtime: 'automatic' }]
				]
			}
		}
	};

	return [
		cssLoader,
		tsLoader,
		//  babelLoader,
		assetsLoader,
		svgrLoader
	];
};
export default buildLoaders;
