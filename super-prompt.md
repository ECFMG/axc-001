Scaffold a new monorepo project. 

 

ProjectName: agentCourses 

ProjectCode: axc 

PackageManager: pnpm 

License: MIT 

 

Primary goal: 

Create a scaffold for a “dark software factory” where coding agents build functionality in isolated git worktrees; every output passes automated quality, architecture, security, and BDD gates.  

 

Purpose: 

agentCourses exists to quantify how harness engineering, agentic coding harnesses, and model selection affect software quality and delivery efficiency.  

 

The initial scaffold must establish the architecture, local developer workflow, agent workflow, quality gates, security gates, BDD validation, and a minimal healthcheck feature. Do not overbuild the full product domain yet; include clear extension points for future functionality. 

 

Reference/inspiration: 

Use the GitHub repository CellixJs/cellixjs as configuration and architecture inspiration. It may contain older libraries or approaches; modernize where appropriate. The local reference for this repository is /Volumes/files/src/cellixjs. You may refer to it there for the sake of speed. Packages under /packages/cellix may be copied to aid in functional buildout both initially and in future to satisfy new requirements. It exists to make this process easier 

 

Leverage these pre-installed tools: 

- pnpm >11 (no use of npm or yarn, do not allow scripts) 

- nvm with NodeJS 24 

- snyk CLI (global) 

- portless (trusted) 

- current JRE version 

 

Runtime/version constraints: 

- Add .nvmrc. 

- Use pnpm workspaces and Turborepo. 

 

Technical Details (specifc npm package guidance): 

* guardrails 

    * biome 

        - linting / formatting 

        - leverage defaults from cellixjs where makes sense 

    * typescript compilation rules 

        - leverage defaults from cellixjs 

    * knip 

        - website: https://knip.dev/ 

        - details: finds and removes unused code and dependencies 

        - installation: pnpm create @knip/config 

    * e18e 

    * husky + lint-staged 

    * archunit 

    * security 

        * snyk  

* local development  

    * portless 

    * mongodb-memory-server-core	 (avoids build scripts) 

* build 

    * rolldown 

* testing 

    * serenityjs + @serenity-js/cucumber + @serenity-js/serenity-bdd 

* deployed runtime 

    * mongodb 

* infrastructure 

    * turborepo 

    * node 24+ / hono 

        - azure function v4 compatibility 

        - pnpm add @marplex/hono-azurefunc-adapter hono 

    * typescript 6.x 

    * mongoose 

 

 

## Agentic Tooling: 

* MCPs 

    * @e18e/mcp 

* Skills 

    * turborepo 

        * pnpm dlx skills add vercel/turborepo 

    * portless 

        * pnpm dlx skills add https://github.com/vercel-labs/portless --skill portless 

    * serenityjs 

        * pnpm dlx skills add serenity-js/serenity-js    

 

## Implementation Specifics: 

 

* Parallel isolated Multi-agent development support 

    * Enable worktrees / turborepo / portless 

* Basic agentic configuration scaffolding  

* Using BDD/Gherkin/Serenity 

    * Prove healthcheck endpoint works and generate Serenity HTML report 

* Ensure Husky + lint-staged run local pre-commit checks for agent-authored changes. (knip,e18e,biome,typescript compilation,archunit,serenity,pnpm audit,snyk)  

* Create a top-level README.md and MIT standard license 

* Single top-level commands (all fully driven through turborepo) 

    * pnpm run dev 

      * Starts the API locally through portless and supports parallel git worktrees and hot reloading. 

    * pnpm run test 

      * Runs unit/integration tests and Serenity/Cucumber acceptance tests for the healthcheck 

    * pnpm run verify 

      * Runs the full lovsl gate: dependency script policy check, biome, TypeScript compilation, knip, @e18e/cli, architecture tests, tests, Serenity acceptance tests, pnpm audit, and Snyk (if available). 

    * pnpm run build 

      * Leverages rolldown for application logic and creates a zip file compatible with the Azure Functions run from package zip deployment. 

    * pnpm run start 

      * Starts the built API locally in an Azure Functions-compatible or documented local runtime mode. 

* Snyk must be attempted by pnpm run verify. If Snyk cannot run because credentials are unavailable in the scaffolding environment, the command may report Snyk as SKIPPED or NON-BLOCKING for the first scaffold only, but it must not fail silently. The README and verification output must clearly state the reason. 

* Husky + lint-staged should provide local pre-commit feedback, but pnpm run verify and CI are the enforcement boundary. Add a CI workflow that runs pnpm install --frozen-lockfile and pnpm run verify. 

 

 

Required Folder Structure:  

 

/ 

├── apps/                          

|   └── api/                               # composition root: injects dependencies into packages/axc/rest. 

|   └── docs/                              # Docusaurus: API docs MADR/SRTM repository 

├── packages 

    ├── cellix/*                           # CELLIX reusable workspace package (may pull in later) 

    ├── axc-verification/                   

    |   ├── acceptance-api/                # Serenity/Cucumber acceptance tests + report generation 

    |   └── archunit-tests/                # Archunit tests 

    └── axc/  

        ├── application-services/       	  # use cases & orchestration 

        ├── domain/                        # DDD domain logic (See CELLIX for reference details) 

        ├── rest/                          # Hono routing and logic (application-services injected from apps/api) 

        ├── persistence/                   # data related (See CELLIX for reference details) 

        ├── service-mongoose/              # MongodDB/Mongoose related 

        └── README.md                      # workspace related overview documentation 

 

Workspace package rule: 

- packages/cellix/*, packages/axc-verification/*, and packages/axc/* are workspace packages. 

- The axc layer packages live directly under packages/axc. 

- Each package owns: `package.json`, `tsconfig`, build script, typecheck script, explicit exports where appropriate. 

- Domain packages must not import REST, Hono, Azure Functions, Mongoose, persistence implementations, or composition code. 

- `apps/api` is the composition root; injects dependencies into `packages/axc/rest`. 

 

Functional Success Criteria:  

* Implment healthcheck endpoint 

 

GET /health 

 

Expected 200 response: 

 

{ 

  "status": "ok", 

  "service": "agentCourses-api", 

  "projectCode": "axc", 

  "environment": "<local|test|production>", 

  "timestamp": "<ISO-8601 string>" 

} 

Reuse this exact contract in: API impl, README, docs site, Serenity feature file, acceptance tests, future task-set validation. 

 

* Documentation website should showcase healthcheck API usage expected results 

* ArchUnit and Serentiy tests should prove functionality and structure are implemented properly. 