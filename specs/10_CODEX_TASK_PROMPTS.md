# 10 Codex Task Prompts

This file contains task prompts that can be pasted into Codex.

## Prompt 1 — Initialize Project

```text
You are working on Crypto RPG Factor Screener.

Before coding, read these spec files:
- /specs/00_README.md
- /specs/01_PRODUCT_SPEC.md
- /specs/02_ARCHITECTURE.md
- /specs/08_CODEX_WORKFLOW.md
- /specs/09_TASK_BACKLOG.md

Goal:
Initialize the project structure for a Next.js + TypeScript app.

Scope:
- Create or verify Next.js app structure.
- Add Tailwind CSS.
- Add basic app layout.
- Add /specs folder if missing.
- Create folder structure described in /specs/02_ARCHITECTURE.md.
- Do not implement real data fetching yet.

Out of scope:
- No Binance integration.
- No database connection.
- No alert sending.

Acceptance criteria:
- App runs locally.
- TypeScript compiles.
- Folder structure is ready.
- Update /specs/09_TASK_BACKLOG.md for completed Phase 0 items.

At the end, summarize changed files and commands run.
```

## Prompt 2 — Core Types and Mock Data

```text
Read:
- /specs/01_PRODUCT_SPEC.md
- /specs/03_FACTOR_ENGINE_SPEC.md
- /specs/05_DATA_API_SPEC.md
- /specs/09_TASK_BACKLOG.md

Goal:
Implement core TypeScript types and mock data for the first MVP.

Scope:
- Create lib/types.ts.
- Create lib/data/mockData.ts.
- Include at least 12 symbols.
- Mock scenarios must include:
  1. BTC outperformer
  2. Hidden setup with compression
  3. Downside sweep and recovery
  4. Upside sweep and fake breakout
  5. OI build-up with flat price
  6. Overheated funding risk
  7. Low liquidity warning
  8. Neutral coin

Out of scope:
- Do not build UI.
- Do not connect external APIs.

Acceptance criteria:
- Mock data imports successfully.
- Types are reusable by factor engine and UI.
- Add minimal tests or type checks if project has test runner.
- Update backlog status.
```

## Prompt 3 — Utility Functions

```text
Read:
- /specs/03_FACTOR_ENGINE_SPEC.md
- /specs/04_PATTERN_TAGGING_SPEC.md
- /specs/05_DATA_API_SPEC.md

Goal:
Implement utility functions for normalization, candles, and time handling.

Scope:
Create:
- lib/utils/math.ts
- lib/utils/normalization.ts
- lib/utils/candles.ts
- lib/utils/time.ts

Functions required:
- clamp
- percentChange
- rollingMedian
- percentileRank
- zScore
- madZScore
- safeDivide
- candle wick metrics
- getTaipeiSessionOpenTimestamp
- calculateSessionReturn

Acceptance criteria:
- All functions handle empty arrays and zero division safely.
- Candle metrics handle zero range candles.
- Unit tests cover normal and edge cases.
- Update backlog status.
```

## Prompt 4 — Factor Engine

```text
Read:
- /specs/03_FACTOR_ENGINE_SPEC.md
- /specs/05_DATA_API_SPEC.md

Goal:
Implement the MVP factor engine as pure TypeScript functions.

Scope:
Create factor modules:
- lib/factors/relativeStrength.ts
- lib/factors/momentum.ts
- lib/factors/volumeAnomaly.ts
- lib/factors/oi.ts
- lib/factors/volatility.ts
- lib/factors/absorption.ts
- lib/factors/funding.ts
- lib/factors/tradability.ts

Requirements:
- Every factor returns 0–100.
- Every function has typed input and output.
- Keep formulas explainable.
- Use mock data for tests.

Out of scope:
- No UI.
- No real API.
- No database.

Acceptance criteria:
- Mock scenarios produce plausible factor scores.
- Tests cover edge cases.
- Update backlog status.
```

## Prompt 5 — Pattern and Tag Engine

```text
Read:
- /specs/04_PATTERN_TAGGING_SPEC.md
- /specs/07_ALERTS_AND_EVENT_LOGS.md

Goal:
Implement pattern detection and tag generation.

Scope:
Create:
- lib/patterns/wickSweep.ts
- lib/patterns/compression.ts
- lib/patterns/trap.ts
- lib/tags/tagDefinitions.ts
- lib/tags/tagEngine.ts

Implement:
- Downside Sweep
- Upside Sweep
- Compression Setup
- OI Build-up during range
- Effort vs Result / Absorption
- Tag generation with severity and timeframe

Acceptance criteria:
- Mock downside sweep receives Downside Sweep or Spring Watch tag.
- Mock upside sweep receives Upside Sweep or Fake Breakout Risk tag.
- Compression scenario receives Compression and Pre-breakout Watch when conditions align.
- Update backlog status.
```

## Prompt 6 — Scoring Engine

```text
Read:
- /specs/03_FACTOR_ENGINE_SPEC.md
- /specs/04_PATTERN_TAGGING_SPEC.md

Goal:
Implement final scoring engine.

Scope:
Create:
- lib/scoring/trendRank.ts
- lib/scoring/watchlist.ts
- lib/scoring/longShort.ts
- lib/scoring/trap.ts
- lib/scoring/netBias.ts

Implement:
- TrendRankScore
- WatchlistScore
- LongScore
- ShortScore
- TrapScore
- NetBias classification
- RiskLevel classification

Acceptance criteria:
- Scores are always 0–100.
- Dashboard view model can sort symbols by score.
- Trap condition works when LongScore and ShortScore are both high.
- Update backlog status.
```

## Prompt 7 — Dashboard UI

```text
Read:
- /specs/01_PRODUCT_SPEC.md
- /specs/06_UI_SPEC.md

Goal:
Build the mock-data Dashboard UI.

Scope:
Create:
- app/dashboard/page.tsx
- components/dashboard/MarketBossPanel.tsx
- components/dashboard/OutperformerBoard.tsx
- components/dashboard/HiddenSetupBoard.tsx
- components/dashboard/AnomalyRadar.tsx
- components/dashboard/RiskTrapBoard.tsx
- components/shared/ScoreBadge.tsx
- components/shared/BiasBadge.tsx
- components/shared/TagBadge.tsx

Requirements:
- Use mock data and scoring engine.
- Tables must be sortable.
- Rows link to /symbol/[symbol].
- UI should be clean and readable.

Acceptance criteria:
- /dashboard renders.
- Top performers and hidden setups appear in correct boards.
- Update backlog status.
```

## Prompt 8 — Symbol Detail Page

```text
Read:
- /specs/01_PRODUCT_SPEC.md
- /specs/06_UI_SPEC.md
- /specs/07_ALERTS_AND_EVENT_LOGS.md

Goal:
Build the symbol detail page.

Scope:
Create:
- app/symbol/[symbol]/page.tsx
- components/symbol/SymbolRpgCard.tsx
- components/symbol/RadarAbilityChart.tsx
- components/symbol/FactorBreakdownTable.tsx
- components/symbol/EventTimeline.tsx
- components/symbol/EntryPlanCard.tsx
- components/symbol/RiskTagList.tsx

Requirements:
- Use Recharts for radar chart.
- Display active tags and event timeline.
- EntryPlanCard must frame levels as candidate levels, not financial advice.

Acceptance criteria:
- Symbol page renders for all mock symbols.
- Radar chart has five axes.
- Event timeline shows chain of events.
- Update backlog status.
```

## Prompt 9 — Prisma Schema

```text
Read:
- /specs/02_ARCHITECTURE.md
- /specs/05_DATA_API_SPEC.md
- /specs/07_ALERTS_AND_EVENT_LOGS.md

Goal:
Add Prisma schema for database persistence.

Scope:
Implement models:
- Asset
- MarketBar
- FuturesMetric
- SessionBaseline
- FactorValue
- ScoreSnapshot
- TagSnapshot
- EventLog
- Alert
- Watchlist

Requirements:
- Use appropriate indexes for symbol + timestamp.
- Preserve raw data and derived data separately.
- Do not remove mock data fallback.

Acceptance criteria:
- Prisma validates.
- Migration can be generated.
- Update backlog status.
```

## Prompt 10 — Binance Adapter

```text
Read:
- /specs/05_DATA_API_SPEC.md
- /specs/02_ARCHITECTURE.md

Goal:
Implement Binance data adapter with safe error handling.

Scope:
Create:
- lib/data/binance.ts
- app/api/ingest/binance/route.ts

Implement service functions:
- fetchKlines
- fetchOpenInterest
- fetchOpenInterestHistory
- fetchFundingRate
- fetchTakerBuySellVolume
- fetchLongShortRatio

Requirements:
- Add rate-limit safe error handling.
- Return typed normalized data.
- Missing optional data should not crash scoring.
- Keep mock fallback.

Out of scope:
- No trading or order execution.

Acceptance criteria:
- Can ingest BTCUSDT, ETHUSDT, SOLUSDT.
- API failure creates Data Quality Warning instead of crashing.
- Update backlog status.
```

## Prompt 11 — Alert Engine

```text
Read:
- /specs/07_ALERTS_AND_EVENT_LOGS.md
- /specs/04_PATTERN_TAGGING_SPEC.md

Goal:
Implement event logs and alert engine.

Scope:
Create:
- lib/alerts/alertEngine.ts
- lib/alerts/discord.ts
- app/api/alerts/discord/route.ts

Implement:
- Lv1/Lv2/Lv3/Lv4 alert generation
- Event chain detection
- Alert cooldown
- Discord message formatting

Acceptance criteria:
- Mock hidden setup creates Lv2 alert.
- Fake breakout risk creates Lv4 alert.
- Duplicate alerts are suppressed by cooldown.
- Discord payload is readable.
- Update backlog status.
```

## Prompt 12 — Review and Repair

```text
Read all files in /specs.

Goal:
Review the current implementation against the specification.

Do not modify files yet.

Return a report with:
1. Implemented correctly
2. Missing features
3. Spec mismatches
4. Risky hardcoded logic
5. Data quality risks
6. Recommended next 5 tasks

After the report, wait for my instruction before editing.
```
