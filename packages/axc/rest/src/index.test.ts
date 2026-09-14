import { buildApplicationServicesFactory } from '@axc/application-services';
import { describe, expect, it } from 'vitest';
import { createRestApp } from './index.ts';

describe('GET /health', () => {
	it('returns the published healthcheck contract', async () => {
		const app = createRestApp(
			buildApplicationServicesFactory({
				environment: 'test',
				now: () => new Date('2026-09-14T13:28:00.000Z'),
			}),
		);
		const response = await app.request('/health');
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toStrictEqual({
			status: 'ok',
			service: 'agentCourses-api',
			projectCode: 'axc',
			environment: 'test',
			timestamp: '2026-09-14T13:28:00.000Z',
		});
	});
});
