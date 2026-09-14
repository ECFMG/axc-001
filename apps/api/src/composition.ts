import { buildApplicationServicesFactory } from '@axc/application-services';
import { type EnvironmentName, isEnvironmentName } from '@axc/domain';
import { createRestApp } from '@axc/rest';
import type { Hono } from 'hono';

export function resolveEnvironment(env: NodeJS.ProcessEnv = process.env): EnvironmentName {
	const explicit = env['AXC_ENVIRONMENT'];
	if (explicit && isEnvironmentName(explicit)) {
		return explicit;
	}
	if (env['NODE_ENV'] === 'production') {
		return 'production';
	}
	if (env['NODE_ENV'] === 'test') {
		return 'test';
	}
	return 'local';
}

export function createApiApp(env: NodeJS.ProcessEnv = process.env): Hono {
	const applicationServicesFactory = buildApplicationServicesFactory({
		environment: resolveEnvironment(env),
		now: () => new Date(),
	});
	return createRestApp(applicationServicesFactory);
}
