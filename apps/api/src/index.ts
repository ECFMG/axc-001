import { app } from '@azure/functions';
import { azureHonoHandler } from '@marplex/hono-azurefunc-adapter';
import { createApiApp } from './composition.ts';

export { createMemoryMongoUri, ServiceMongoose } from './infrastructure.ts';

const honoApp = createApiApp();

app.http('httpTrigger', {
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
	authLevel: 'anonymous',
	route: '{*proxy}',
	handler: azureHonoHandler(honoApp.fetch),
});
