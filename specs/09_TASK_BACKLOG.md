# 09 Task Backlog

Status legend:

```text
[ ] Not started
[/] In progress
[x] Done
[!] Blocked
```

## Phase 0 — Repo Setup

- [ ] Create Next.js + TypeScript project
- [ ] Install Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Install Recharts
- [ ] Install Lightweight Charts
- [ ] Install Prisma
- [ ] Configure PostgreSQL environment variables
- [ ] Add test runner
- [ ] Add `/specs` folder and copy Markdown specs

Acceptance criteria:

- App starts locally
- TypeScript compiles
- Test command runs
- Specs are included in repo

## Phase 1 — Core Types and Mock Data

- [ ] Create `lib/types.ts`
- [ ] Define Kline, FuturesMetric, FactorScores, ScoreSnapshotView, TagView, EventLog types
- [ ] Create `lib/data/mockData.ts`
- [ ] Add at least 12 symbols
- [ ] Include scenarios: outperformer, hidden setup, downside sweep, upside sweep, OI build-up, overheated funding, low liquidity, neutral

Acceptance criteria:

- Mock data can be imported without runtime error
- Each scenario has enough data to test factor logic

## Phase 2 — Utility Functions

- [ ] Create `lib/utils/math.ts`
- [ ] Create `lib/utils/normalization.ts`
- [ ] Create `lib/utils/candles.ts`
- [ ] Create `lib/utils/time.ts`
- [ ] Implement clamp, percent change, rolling median, percentile rank, z-score, MAD z-score
- [ ] Implement candle wick metrics
- [ ] Implement Asia/Taipei 08:00 session open helper

Acceptance criteria:

- Unit tests cover edge cases
- Zero range candles do not crash
- Empty arrays return safe values

## Phase 3 — Factor Engine

- [ ] Implement RelativeStrengthScore
- [ ] Implement MomentumScore
- [ ] Implement VolumeAnomalyScore
- [ ] Implement OIBuildupScore
- [ ] Implement VolatilityCompressionScore
- [ ] Implement WickSweepScore
- [ ] Implement AbsorptionScore
- [ ] Implement FundingHeatScore
- [ ] Implement TradabilityScore

Acceptance criteria:

- Each factor returns 0–100
- Each factor has typed input and output
- Mock scenarios produce expected approximate scores

## Phase 4 — Pattern and Tag Engine

- [ ] Implement Downside Sweep detection
- [ ] Implement Upside Sweep detection
- [ ] Implement Compression Setup detection
- [ ] Implement OI Build-up during range detection
- [ ] Implement Effort vs Result detection
- [ ] Implement tag generation
- [ ] Implement tag expiration and invalidation placeholders

Acceptance criteria:

- Each mock scenario receives expected tags
- Tags include severity and timeframe

## Phase 5 — Scoring Engine

- [ ] Implement TrendRankScore
- [ ] Implement WatchlistScore
- [ ] Implement LongScore
- [ ] Implement ShortScore
- [ ] Implement TrapScore
- [ ] Implement net bias classification
- [ ] Implement risk level classification

Acceptance criteria:

- Dashboard view model can sort by each score
- Long/Short/Neutral/Trap labels work

## Phase 6 — Dashboard UI

- [ ] Build MarketBossPanel
- [ ] Build BTC Outperformer Board
- [ ] Build Hidden Setup Board
- [ ] Build Anomaly Radar
- [ ] Build Risk / Trap Board
- [ ] Add sorting and row click navigation

Acceptance criteria:

- `/dashboard` renders from mock data
- Tables are readable and sortable
- Each row links to symbol page

## Phase 7 — Symbol Detail UI

- [ ] Build SymbolRpgCard
- [ ] Build RadarAbilityChart
- [ ] Build FactorBreakdownTable
- [ ] Build EventTimeline
- [ ] Build EntryPlanCard
- [ ] Build RiskTagList

Acceptance criteria:

- `/symbol/[symbol]` renders complete symbol profile
- Radar chart uses five ability axes
- Event timeline shows event chain

## Phase 8 — Database

- [ ] Add Prisma schema
- [ ] Create Asset table
- [ ] Create MarketBar table
- [ ] Create FuturesMetric table
- [ ] Create SessionBaseline table
- [ ] Create FactorValue table
- [ ] Create ScoreSnapshot table
- [ ] Create TagSnapshot table
- [ ] Create EventLog table
- [ ] Create Alert table
- [ ] Create Watchlist table

Acceptance criteria:

- Prisma migration works
- Mock data can be inserted
- Dashboard can read from DB or mock fallback

## Phase 9 — Binance Integration

- [ ] Implement `services/binance.ts`
- [ ] Implement klines adapter
- [ ] Implement open interest adapter
- [ ] Implement funding adapter
- [ ] Implement taker buy/sell adapter
- [ ] Implement ingestion route
- [ ] Add rate-limit and error handling

Acceptance criteria:

- Can ingest at least BTCUSDT, ETHUSDT, SOLUSDT
- API failure does not crash dashboard
- Missing data creates warning tag

## Phase 10 — Alerts

- [ ] Implement event logs
- [ ] Implement alert rules
- [ ] Implement alert cooldown
- [ ] Implement Discord webhook payload
- [ ] Add `/api/alerts/discord`

Acceptance criteria:

- Mock event chain can create Lv2 alert
- Duplicate alerts are suppressed
- Discord payload is human-readable

## Phase 11 — Optimization and Research

- [ ] Add configurable thresholds
- [ ] Add factor weight profiles
- [ ] Add cap-tier specific thresholds
- [ ] Add sector/category ranking
- [ ] Add daily summary report
- [ ] Add weekly factor performance review
