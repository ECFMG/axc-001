import { describe, expect, it } from 'vitest';
import { createDataSources } from './index.ts';

describe('createDataSources', () => {
	it('returns a ready extension-point container', () => {
		expect(createDataSources()).toStrictEqual({ ready: true });
	});
});
