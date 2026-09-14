/**
 * Extension point for composed domain data sources.
 * Future bounded contexts register repositories here; healthcheck does not persist state.
 */
export type DataSources = {
	readonly ready: true;
};

export function createDataSources(): DataSources {
	return { ready: true };
}
