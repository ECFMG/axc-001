import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';

configure({
	crew: [
		ConsoleReporter.withDefaultColourSupport(),
		ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
		SerenityBDDReporter.fromJSON({
			specDirectory: './features',
		}),
	],
});
