# 02 Architecture

## 1. High-level Architecture

```text
Data Sources
  ↓
Data Fetching Layer
  ↓
Raw Data Storage
  ↓
Baseline Engine
  ↓
Factor Engine
  ↓
Pattern Engine
  ↓
Score Engine
  ↓
Tag Engine
  ↓
Event Log Engine
  ↓
UI + Alert Engine
```

## 2. Recommended Stack

```text
Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Lightweight Charts

Backend:
- Next.js API Routes for MVP
- Optional future migration to FastAPI

Database:
- PostgreSQL
- Prisma ORM

Scheduler:
- Vercel Cron
- GitHub Actions
- Cloud Run Jobs

Notification:
- Discord Webhook
- Telegram Bot in later version
```

## 3. Folder Structure

```text
crypto-rpg-factor-screener/
  app/
    dashboard/
      page.tsx
    symbol/
      [symbol]/
        page.tsx
    api/
      ingest/
        route.ts
      scores/
        route.ts
      alerts/
        discord/
          route.ts
  components/
    dashboard/
      MarketBossPanel.tsx
      OutperformerBoard.tsx
      HiddenSetupBoard.tsx
      RiskTrapBoard.tsx
      AnomalyRadar.tsx
    symbol/
      SymbolRpgCard.tsx
      RadarAbilityChart.tsx
      FactorBreakdownTable.tsx
      EventTimeline.tsx
      EntryPlanCard.tsx
      RiskTagList.tsx
    shared/
      ScoreBadge.tsx
      BiasBadge.tsx
      TagBadge.tsx
      DataTable.tsx
  lib/
    data/
      binance.ts
      mockData.ts
      adapters.ts
    factors/
      relativeStrength.ts
      momentum.ts
      volumeAnomaly.ts
      oi.ts
      volatility.ts
      absorption.ts
    patterns/
      wickSweep.ts
      compression.ts
      breakout.ts
      trap.ts
    scoring/
      trendRank.ts
      watchlist.ts
      longShort.ts
      trap.ts
      tradability.ts
    tags/
      tagEngine.ts
      tagDefinitions.ts
    alerts/
      alertEngine.ts
      discord.ts
    utils/
      math.ts
      time.ts
      normalization.ts
      candles.ts
  prisma/
    schema.prisma
  specs/
    *.md
```

## 4. Data Flow

### 4.1 Ingestion

1. Fetch exchange info.
2. Select universe: USDT spot and/or USDT perpetual pairs.
3. Fetch klines by timeframe.
4. Fetch futures metrics: OI, funding, taker buy/sell.
5. Store raw snapshots.
6. Generate rolling baselines.

### 4.2 Calculation

1. Compute returns.
2. Compute relative returns vs BTC.
3. Compute rolling median, percentile, z-score, MAD robust z-score.
4. Compute factor scores.
5. Detect patterns.
6. Generate tags.
7. Generate event logs.
8. Compute final scores and ranking boards.

### 4.3 UI Rendering

1. Dashboard calls `/api/scores?view=dashboard`.
2. Symbol page calls `/api/scores?symbol=SOLUSDT`.
3. Event timeline calls `/api/events?symbol=SOLUSDT`.
4. Alert panel calls `/api/alerts/recent`.

## 5. Database Schema Draft

### Asset

```text
id
symbol
baseAsset
quoteAsset
marketType
category
capTier
isActive
createdAt
updatedAt
```

### MarketBar

```text
id
symbol
timeframe
openTime
open
high
low
close
volume
quoteVolume
tradeCount
createdAt
```

### FuturesMetric

```text
id
symbol
timestamp
openInterest
openInterestValue
fundingRate
takerBuyVolume
takerSellVolume
longShortRatio
topTraderLongShortRatio
createdAt
```

### SessionBaseline

```text
id
symbol
date
timezone
sessionOpenTime
sessionOpenPrice
createdAt
```

### FactorValue

```text
id
symbol
timestamp
timeframe
relativeStrengthScore
momentumScore
volumeAnomalyScore
oiBuildupScore
volatilityCompressionScore
wickSweepScore
absorptionScore
fundingHeatScore
tradabilityScore
createdAt
```

### ScoreSnapshot

```text
id
symbol
timestamp
trendRankScore
watchlistScore
longScore
shortScore
trapScore
netBias
confidence
riskLevel
createdAt
```

### TagSnapshot

```text
id
symbol
timestamp
tag
severity
status
expiresAt
payloadJson
createdAt
```

### EventLog

```text
id
symbol
timestamp
eventType
severity
timeframe
title
description
payloadJson
createdAt
```

### Alert

```text
id
symbol
timestamp
alertLevel
alertType
title
message
payloadJson
sentToDiscord
createdAt
```

### Watchlist

```text
id
symbol
reason
status
createdAt
updatedAt
```

## 6. Design Principles

1. Raw data and derived data must be separated.
2. Factor logic must be pure functions where possible.
3. UI should consume normalized view models, not raw API responses.
4. Every score should be explainable through factor breakdown.
5. Every alert should be traceable to one or more event logs.
6. Pattern labels should have invalidation rules.
7. All thresholds must be configurable.
