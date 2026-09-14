import { describe, expect, it } from 'vitest';
import { buildApplicationServicesFactory } from './index.ts';

describe('health application service', () => {
	it('returns the published healthcheck contract', async () => {
		const factory = buildApplicationServicesFactory({
			environment: 'test',
			now: () => new Date('2026-09-14T13:28:00.000Z'),
		});
		const services = await factory.forRequest();
		await expect(services.Health.getStatus()).resolves.toStrictEqual({
			status: 'ok',
			service: 'agentCourses-api',
			projectCode: 'axc',
			environment: 'test',
			timestamp: '2026-09-14T13:28:00.000Z',
		});
	});
});
