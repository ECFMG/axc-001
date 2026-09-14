import { createHealthCheckResult, type HealthCheckResult } from '@axc/domain';
import type { DataSources } from '@axc/persistence';
import type { HealthRuntime } from '../../runtime.ts';

export const GetHealthStatus = (dataSources: DataSources, runtime: HealthRuntime) => async (): Promise<HealthCheckResult> => {
	void dataSources;
	return await Promise.resolve(createHealthCheckResult(runtime.environment, runtime.now()));
};
