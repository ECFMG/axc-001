import type { EnvironmentName } from './environment.ts';
import { API_SERVICE_NAME, PROJECT_CODE } from './identity.ts';

export type HealthCheckResult = {
	status: 'ok';
	service: typeof API_SERVICE_NAME;
	projectCode: typeof PROJECT_CODE;
	environment: EnvironmentName;
	timestamp: string;
};

export function createHealthCheckResult(environment: EnvironmentName, timestamp: Date): HealthCheckResult {
	return {
		status: 'ok',
		service: API_SERVICE_NAME,
		projectCode: PROJECT_CODE,
		environment,
		timestamp: timestamp.toISOString(),
	};
}
