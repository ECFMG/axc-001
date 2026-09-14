# agentCourses agent notes

- Package manager is pnpm. Never npm or yarn. Dependency lifecycle scripts are forbidden except native toolchain packages `rolldown` and `esbuild`.
- `apps/api` is the composition root. Domain must not import REST, Hono, Azure Functions, Mongoose, or composition code.
- Prove behavior with Serenity/Cucumber and ArchUnit. Keep the `GET /health` JSON contract unchanged.
- Run `pnpm run verify` before considering work done. Snyk may be SKIPPED (NON-BLOCKING) without credentials; that skip must be visible.
- Use git worktrees plus `pnpm run dev:worktree` and Portless for isolated parallel agents.
