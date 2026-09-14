import type { ApplicationServicesFactory } from '@axc/application-services';
import { Hono } from 'hono';

export function createRestApp(applicationServicesFactory: ApplicationServicesFactory): Hono {
	const app = new Hono();

	app.get('/health', async (c) => {
		const applicationServices = await applicationServicesFactory.forRequest();
		const body = await applicationServices.Health.getStatus();
		return c.json(body, 200);
	});

	return app;
}
