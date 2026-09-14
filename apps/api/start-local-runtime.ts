import { spawnSync } from 'node:child_process';
import { AzureFunctionsDevRunner, NodeDevRunner } from '@cellix/local-dev';

const func = spawnSync('func', ['--version'], { encoding: 'utf8' });

if (func.status === 0) {
	console.log('Starting Azure Functions host from deploy/ (func CLI detected).');
	new AzureFunctionsDevRunner({
		scriptRoot: 'deploy/',
		typescript: false,
		port: process.env.PORT ?? '7071',
	}).start();
} else {
	console.log('Azure Functions Core Tools not found. Starting documented local runtime: Node serving the built Hono app from dist/start-http.js.');
	new NodeDevRunner({
		entry: 'dist/start-http.js',
	}).start();
}
