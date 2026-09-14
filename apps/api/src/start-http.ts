import { serve } from '@hono/node-server';
import { createApiApp } from './composition.ts';

const port = Number(process.env['PORT'] ?? '7071');
const honoApp = createApiApp();

serve({ fetch: honoApp.fetch, port }, (info) => {
	console.log(`agentCourses API listening on http://127.0.0.1:${info.port}`);
});
