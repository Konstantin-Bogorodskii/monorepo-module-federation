import { Configuration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

const buildDevServer = (options: BuildOptions): Configuration => {
	return {
		port: options.port ?? 3000,
		// открывает приложение в новой вкладке в браузере
		open: true,
		static: './build',
		// Указывает, что будет использоваться HTML5 History API. Нужен для коректной работы react-router-browser
		historyApiFallback: true,
		// Hot Module Replacement (HMR) - при изменении кода в файле на стадии разработки данные обновляются без перезагрузки страницы. Под копотом использует Web Socket.
		hot: true,
		// Убирает лишние логи в консоли от Hot Module Replacement
		client: {
			overlay: false,
			logging: 'error'
		}
	};
};

export default buildDevServer;
