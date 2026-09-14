import type { HealthCheckResult } from '@axc/domain';
import type { DataSources } from '@axc/persistence';
import type { HealthRuntime } from '../../runtime.ts';
import { GetHealthStatus } from './get-status.ts';

export interface HealthApplicationService {
	getStatus: () => Promise<HealthCheckResult>;
}

export const Health = (dataSources: DataSources, runtime: HealthRuntime): HealthApplicationService => ({
	getStatus: GetHealthStatus(dataSources, runtime),
});
