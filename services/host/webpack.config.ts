import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import { buildWebpack, BuildMode, BuildPaths, BUILD_MODE } from '@packages/build-config';

interface IEnvVariables {
	mode: BuildMode;
	port: number;
	analyzer: boolean;
}

export default (env: IEnvVariables) => {
	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public')
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? BUILD_MODE.DEVELOPMENT,
		paths,
		analyzer: env.analyzer
	});

	return config;
};
