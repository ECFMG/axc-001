export default {
	paths: ['features/**/*.feature'],
	import: ['src/serenity.config.ts', 'src/world.ts', 'src/step-definitions/health.steps.ts'],
	format: ['@serenity-js/cucumber', 'summary', 'json:./reports/cucumber-report-api.json'],
	formatOptions: {
		specDirectory: './features',
	},
};
