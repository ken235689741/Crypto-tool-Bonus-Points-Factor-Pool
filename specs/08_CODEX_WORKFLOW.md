# 08 Codex Workflow

## 1. Why Use Spec Files Instead of One Big Prompt

A prompt is temporary. A spec is reusable.

For this project, avoid asking Codex to build the full tool from one huge prompt. Instead, maintain stable Markdown files inside the repository.

Suggested repo structure:

```text
/specs
  00_README.md
  01_PRODUCT_SPEC.md
  02_ARCHITECTURE.md
  03_FACTOR_ENGINE_SPEC.md
  04_PATTERN_TAGGING_SPEC.md
  05_DATA_API_SPEC.md
  06_UI_SPEC.md
  07_ALERTS_AND_EVENT_LOGS.md
  08_CODEX_WORKFLOW.md
  09_TASK_BACKLOG.md
  10_CODEX_TASK_PROMPTS.md
```

Codex should read these files before implementing any task.

## 2. Work Method

Use this cycle:

```text
Spec → Task → Implementation → Test → Review → Update Spec → Next Task
```

Do not skip spec updates. If implementation changes the design, update the relevant `.md` file.

## 3. Codex Task Format

Every Codex task should include:

```text
Context:
Files to read:
Goal:
Scope:
Out of scope:
Implementation requirements:
Acceptance criteria:
Run commands:
Expected output:
```

## 4. Good Task Example

```text
Context:
This project is Crypto RPG Factor Screener. Please read /specs/01_PRODUCT_SPEC.md, /specs/02_ARCHITECTURE.md, and /specs/03_FACTOR_ENGINE_SPEC.md first.

Goal:
Implement the initial factor engine with pure TypeScript functions.

Scope:
- Create lib/utils/normalization.ts
- Create lib/factors/relativeStrength.ts
- Create lib/factors/volumeAnomaly.ts
- Create lib/factors/oi.ts
- Create lib/scoring/trendRank.ts

Out of scope:
- Do not build UI yet.
- Do not connect real Binance API yet.
- Do not implement database writes yet.

Implementation requirements:
- All scores must be 0–100.
- Functions must be pure and unit-testable.
- Use mock data only.

Acceptance criteria:
- npm test passes.
- Mock symbols return RelativeStrengthScore, VolumeAnomalyScore, OIBuildupScore, and TrendRankScore.
- Add comments explaining each formula.
```

## 5. Bad Task Example

```text
Build my whole crypto tool with Binance and a cool UI.
```

This is bad because it has no scope, no acceptance criteria, and no test target.

## 6. Development Phases

### Phase 0 — Repo Setup

- Next.js app
- TypeScript
- Tailwind
- shadcn/ui
- Prisma
- test runner
- specs folder

### Phase 1 — Mock Data + Types

- Core types
- Mock symbols
- Mock market scenarios
- Utility functions

### Phase 2 — Factor Engine

- Relative strength
- Momentum
- Volume anomaly
- OI build-up
- Volatility compression
- Wick sweep
- Absorption

### Phase 3 — Scoring and Tagging

- TrendRankScore
- WatchlistScore
- LongScore
- ShortScore
- TrapScore
- Tag engine

### Phase 4 — Dashboard UI

- Market boss panel
- Outperformer board
- Hidden setup board
- Risk/trap board
- Anomaly radar

### Phase 5 — Symbol Page

- RPG card
- Radar chart
- Factor breakdown
- Event timeline
- Entry plan card

### Phase 6 — Data Integration

- Binance adapter
- Ingestion API
- Database persistence
- Session baseline

### Phase 7 — Alerts

- Event logs
- Alert engine
- Discord webhook
- Alert cooldown

### Phase 8 — Optimization

- Threshold tuning
- Additional APIs
- Backtest research
- User-configurable weights

## 7. How to Ask Codex to Continue

Use continuation prompts like:

```text
Read the current repo and specs. Identify what is already implemented versus the backlog in /specs/09_TASK_BACKLOG.md. Then implement the next incomplete task with the smallest safe scope. Do not rewrite working code unless necessary. Update the backlog status after completion.
```

## 8. How to Ask Codex to Review

```text
Review the current implementation against /specs/03_FACTOR_ENGINE_SPEC.md and /specs/04_PATTERN_TAGGING_SPEC.md. Find mismatches, missing edge cases, overly hardcoded logic, and places where formula behavior is not explainable. Do not modify files yet. Return a review report with prioritized fixes.
```

## 9. How to Ask Codex to Refactor

```text
Refactor the factor engine so that every score calculation is a pure function with typed inputs and outputs. Do not change the UI behavior. Add unit tests for edge cases including zero volume, missing OI, zero candle range, and insufficient history.
```

## 10. Rules for Codex

Codex should follow these rules:

1. Read relevant specs before editing.
2. Keep changes scoped.
3. Prefer small PR-like tasks.
4. Do not connect real trading or order execution.
5. Do not hardcode thresholds inside components.
6. Add tests for core calculations.
7. Update docs when logic changes.
8. Leave TODO comments only when necessary and include reason.
9. Never remove existing working functionality without explaining why.
10. At the end of every task, summarize changed files and test results.
