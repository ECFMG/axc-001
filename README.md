# agentCourses

agentCourses (`axc`) exists to quantify how harness engineering, agentic coding harnesses, and model selection affect software quality and delivery efficiency.

This repository is a dark software factory scaffold: coding agents build in isolated git worktrees, and every output must pass automated quality, architecture, security, and BDD gates.

## Healthcheck contract

`GET /health` returns HTTP 200:

```json
{
  "status": "ok",
  "service": "agentCourses-api",
  "projectCode": "axc",
  "environment": "<local|test|production>",
  "timestamp": "<ISO-8601 string>"
}
```

This exact contract is used by the API, this README, the docs site, the Serenity feature file, and acceptance tests.

## Commands

All top-level workflows go through Turborepo:

| Command | Purpose |
| --- | --- |
| `pnpm run dev` | Starts the API (and docs) locally through Portless. Supports parallel git worktrees and hot reloading via `turbo watch`. |
| `pnpm run test` | Unit/integration tests plus Serenity/Cucumber acceptance tests for healthcheck. |
| `pnpm run verify` | Full local gate: dependency script policy, Biome, TypeScript, knip, `@e18e/cli`, ArchUnit, tests, Serenity, `pnpm audit`, and Snyk. |
| `pnpm run build` | Rolldown-bundles application logic and writes `apps/api/deploy/agentCourses-api.zip` for Azure Functions run-from-package. |
| `pnpm run start` | Starts the built API. Uses Azure Functions Core Tools when `func` is on PATH; otherwise serves the compiled Hono app with Node. |

Worktree-local hostnames:

```sh
pnpm run dev:worktree
```

This binds `api.agentcourses.<worktree>.localhost` and `docs.agentcourses.<worktree>.localhost` through Portless.

## Install

Use **pnpm** (never npm or yarn). Node 24+ (see `.nvmrc`). Dependency lifecycle scripts are denied except native toolchain packages `rolldown` and `esbuild` (see `allowBuilds` in `pnpm-workspace.yaml`).

```sh
nvm use
pnpm install --frozen-lockfile
pnpm run prepare
```

`pnpm run prepare` installs Husky hooks. Install itself does not run dependency `postinstall` scripts.

## Quality gates

`pnpm run verify` runs, in order:

1. Dependency script policy check
2. Biome
3. TypeScript compilation
4. knip
5. `@e18e/cli`
6. Architecture tests
7. Unit/integration tests
8. Serenity acceptance tests (HTML report under `packages/axc-verification/acceptance-api/target/site/serenity`)
9. `pnpm audit`
10. Snyk

**Snyk (first scaffold):** if the Snyk CLI is missing or credentials are unavailable (`SNYK_TOKEN` unset and `snyk auth` not configured), the Snyk gate reports `SKIPPED (NON-BLOCKING)` with the reason. It does not fail silently. Authenticate Snyk to make the gate blocking.

**pnpm audit:** production highs and development criticals fail the gate. Transitive `axios` and `serialize-javascript` are pinned via workspace overrides. `image-size` DoS advisories `GHSA-w3rx-r6r6-pgpr` and `GHSA-5p2g-fcmc-qvqq` are ignored in `auditConfig` because the advertised `2.0.3` patch is not on npm (Docusaurus `mdx-loader` still depends on `<=2.0.2`).

Husky + lint-staged run Biome on staged files at pre-commit. `pnpm run verify` and CI are the enforcement boundary.

CI: `.github/workflows/ci.yml` runs `pnpm install --frozen-lockfile` and `pnpm run verify`.

## Layout

- `apps/api` — composition root; injects dependencies into `@axc/rest`
- `apps/docs` — Docusaurus (API docs, MADR, SRTM)
- `packages/axc/*` — domain, application-services, rest, persistence, service-mongoose
- `packages/axc-verification/*` — ArchUnit and Serenity/Cucumber
- `packages/cellix/*` — reusable Cellix config and fitness functions

Domain packages must not import REST, Hono, Azure Functions, Mongoose, persistence implementations, or composition code.

## Local MongoDB

Production runtime uses MongoDB. Local and tests can use `mongodb-memory-server-core` via `@axc/service-mongoose` (no install-time build scripts). Healthcheck does not require MongoDB; the service is an extension point.

## License

MIT
