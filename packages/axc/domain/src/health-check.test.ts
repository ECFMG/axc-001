import { describe, expect, it } from 'vitest';
import { createHealthCheckResult } from './health-check.ts';

describe('createHealthCheckResult', () => {
	it('returns the published healthcheck contract', () => {
		const timestamp = new Date('2026-09-14T13:28:00.000Z');
		expect(createHealthCheckResult('local', timestamp)).toStrictEqual({
			status: 'ok',
			service: 'agentCourses-api',
			projectCode: 'axc',
			environment: 'local',
			timestamp: '2026-09-14T13:28:00.000Z',
		});
	});
});
