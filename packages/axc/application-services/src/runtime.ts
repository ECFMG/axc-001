import type { EnvironmentName } from '@axc/domain';

export type HealthRuntime = {
	environment: EnvironmentName;
	now: () => Date;
};
