import { describe, expect, it } from 'vitest';
import { createApiApp, resolveEnvironment } from './composition.ts';

describe('composition', () => {
	it('maps NODE_ENV=production to production', () => {
		expect(resolveEnvironment({ NODE_ENV: 'production' })).toBe('production');
	});

	it('serves GET /health', async () => {
		const app = createApiApp({ AXC_ENVIRONMENT: 'local' });
		const response = await app.request('/health');
		expect(response.status).toBe(200);
		const body = (await response.json()) as { status: string; service: string; projectCode: string; environment: string; timestamp: string };
		expect(body).toMatchObject({
			status: 'ok',
			service: 'agentCourses-api',
			projectCode: 'axc',
			environment: 'local',
		});
		expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
	});
});
