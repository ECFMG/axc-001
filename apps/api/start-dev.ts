import { NodeDevRunner } from '@cellix/local-dev';

new NodeDevRunner({
	entry: 'dist/start-http.js',
}).start();
