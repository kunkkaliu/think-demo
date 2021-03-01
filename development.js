// require('babel-polyfill');
// require('babel-register')({
// ignore: /\/(node_modules)\//,
// presets: ['env', 'react', 'stage-0'],
// plugins: [],
// });

const path = require('path');
const Koa = require('koa');
const cluster = require('cluster');
const Application = require('thinkjs');
const watcher = require('think-watcher');
const babel = require('think-babel');
const notifier = require('node-notifier');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const config = require('./webpack/webpack.dev.config');

(async function () {
	if (cluster.isMaster) {
		const app = new Koa();
		const compiler = webpack(config);
		const koaWebpackMiddleware = await koaWebpack({
			compiler,
			devMiddleware: {
				publicPath: config.output.publicPath,
				stats: {
					colors: true,
					modules: false,
					children: false,
					chunks: false,
					chunkModules: false,
				},
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			},
		});

		app.use(koaWebpackMiddleware);
		const { devMiddleware } = koaWebpackMiddleware;

		cluster.on('message', (_worker, data) => {
			if (data.action === 'event_file_read') {
				const mfs = devMiddleware.fileSystem;
				devMiddleware.waitUntilValid(() => {
					const htmlStream = mfs.readFileSync(data.filename);
					_worker.send({
						action: 'event_file_read_done',
						content: htmlStream.toString(),
					});
				});
			}
		});

		app.listen(9999, '127.0.0.1', () => {
			think.logger.info('Webpack server is going to be running on port 9999.');
		});
	}

	const instance = new Application({
		ROOT_PATH: __dirname,
		APP_PATH: path.join(__dirname, 'app'),
		watcher,
		transpiler: [babel, {
			babelrc: true,
		}],
		notifier: notifier.notify.bind(notifier),
		env: 'development',
	});

	instance.run();
}());
