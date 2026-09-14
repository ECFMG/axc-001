import { type DependencyRulesTestsConfig, describeDependencyRulesTests } from '@cellix/archunit-tests/general';

const config: DependencyRulesTestsConfig = {
	appsGlob: '../../../apps/**',
	packagesGlob: '../../**',
	domainFolder: '../../axc/domain',
	persistenceFolder: '../../axc/persistence',
	applicationServicesFolder: '../../axc/application-services',
	restFolder: '../../axc/rest',
	infrastructurePattern: '../../axc/service-*/**',
	restInfrastructurePattern: '../../axc/service-*/**',
};

describeDependencyRulesTests(config);
