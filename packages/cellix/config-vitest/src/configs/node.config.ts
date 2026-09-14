import { defineConfig, mergeConfig } from 'vitest/config';
import { baseConfig, defaultTestIncludePatterns } from './base.config.ts';

export const nodeConfig = mergeConfig(
	baseConfig,
	defineConfig({
		test: {
			include: [...defaultTestIncludePatterns],
			exclude: ['**/node_modules/**', 'src/archunit-tests/**'],
			environment: 'node',
			testTimeout: 5000,
			coverage: {
				excludeAfterRemap: true,
				exclude: [
					'**/*.test.*',
					'**/*.spec.*',
					'**/*.stories.*',
					'**/*.generated.ts',
					'**/*.generated.tsx',
					'**/*.d.ts',
					'**/*.config.*',
					'**/vitest.config.*',
					'**/vite.config.*',
					'**/coverage/**',
					'**/tsconfig*.json',
					'**/dist/**',
					'**/deploy/**',
					'node_modules/**',
					'src/archunit-tests/**',
				],
			},
		},
	}),
);
