import { projectFiles } from 'archunit';
import { describe, expect, it } from 'vitest';

describe('api composition root', () => {
	it('does not let domain import the composition root', async () => {
		const violations: string[] = [];
		try {
			const rule = projectFiles().inFolder('../../packages/axc/domain').shouldNot().dependOnFiles().inFolder('.');
			await rule.check();
		} catch (error) {
			violations.push(String(error));
		}
		expect(violations).toStrictEqual([]);
	}, 30000);
});
