export type EnvironmentName = 'local' | 'test' | 'production';

export function isEnvironmentName(value: string): value is EnvironmentName {
	return value === 'local' || value === 'test' || value === 'production';
}
