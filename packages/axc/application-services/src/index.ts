import { createDataSources } from '@axc/persistence';
import { Health, type HealthApplicationService } from './contexts/health/index.ts';
import type { HealthRuntime } from './runtime.ts';

export type { HealthApplicationService } from './contexts/health/index.ts';
export type { HealthRuntime } from './runtime.ts';

export interface ApplicationServices {
	Health: HealthApplicationService;
}

export type ApplicationServicesFactory = {
	forRequest: () => Promise<ApplicationServices>;
};

export const buildApplicationServicesFactory = (runtime: HealthRuntime): ApplicationServicesFactory => {
	const dataSources = createDataSources();
	return {
		forRequest: () =>
			Promise.resolve({
				Health: Health(dataSources, runtime),
			}),
	};
};
