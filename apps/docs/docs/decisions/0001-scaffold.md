---
status: accepted
date: 2026-09-14
deciders: agentCourses scaffold
---

# ADR 0001: Monorepo scaffold for a dark software factory

## Context

agentCourses needs isolated multi-agent development, automated quality gates, and a minimal healthcheck feature before the product domain is built.

## Decision

Use a pnpm + Turborepo monorepo with Cellix-inspired layered packages, Portless worktree isolation, Hono on Azure Functions v4, Serenity/Cucumber BDD, ArchUnit, Biome, knip, e18e, pnpm audit, and Snyk.

## Consequences

New features extend `@axc/domain`, `@axc/application-services`, `@axc/rest`, and persistence/mongoose packages without changing the composition-root rule: `apps/api` injects dependencies.
