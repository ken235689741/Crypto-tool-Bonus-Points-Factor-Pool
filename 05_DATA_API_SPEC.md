# 05 Data and API Spec

## 1. Data Sources for MVP

MVP should use mock data first. Then implement adapters for Binance.

### Required Data

- Spot or futures klines
- Current price
- 1H / 4H / 1D / 7D / 30D / 90D returns
- 08:00 Asia/Taipei session open price
- Volume
- Quote volume
- Open interest
- Funding rate
- Taker buy/sell volume
- Long/short ratio if available

## 2. API Abstraction

Do not let UI call Binance directly. Create service functions:

```ts
fetchKlines(symbol: string, interval: string, limit: number): Promise<Kline[]>
fetchOpenInterest(symbol: string): Promise<OpenInterestSnapshot>
fetchOpenInterestHistory(symbol: string, period: string, limit: number): Promise<OpenInterestHistory[]>
fetchFundingRate(symbol: string, limit: number): Promise<FundingRate[]>
fetchTakerBuySellVolume(symbol: string, period: string, limit: number): Promise<TakerBuySellVolume[]>
fetchLongShortRatio(symbol: string, period: string, limit: number): Promise<LongShortRatio[]>
```

## 3. Core Types

```ts
export type Timeframe = '1H' | '4H' | '1D' | '7D' | '30D' | '90D';

export interface Kline {
  symbol: string;
  openTime: number;
  closeTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume?: number;
  tradeCount?: number;
}

export interface OpenInterestSnapshot {
  symbol: string;
  timestamp: number;
  openInterest: number;
  openInterestValue?: number;
}

export interface FundingRate {
  symbol: string;
  timestamp: number;
  fundingRate: number;
}

export interface TakerBuySellVolume {
  symbol: string;
  timestamp: number;
  buyVolume: number;
  sellVolume: number;
  buySellRatio: number;
}

export interface FactorScores {
  relativeStrengthScore: number;
  momentumScore: number;
  volumeAnomalyScore: number;
  oiBuildupScore: number;
  volatilityCompressionScore: number;
  wickSweepScore: number;
  absorptionScore: number;
  fundingHeatScore: number;
  tradabilityScore: number;
}

export interface ScoreSnapshotView {
  symbol: string;
  timestamp: number;
  trendRankScore: number;
  watchlistScore: number;
  longScore: number;
  shortScore: number;
  trapScore: number;
  netBias: 'LONG' | 'SHORT' | 'NEUTRAL' | 'TRAP';
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags: TagView[];
  factors: FactorScores;
}

export interface TagView {
  tag: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'expired' | 'invalidated';
  timeframe?: Timeframe;
  createdAt: number;
  expiresAt?: number;
}
```

## 4. Session Open Logic

Crypto trades 24/7, so define a custom session open.

```text
Asia/Taipei daily session open = 08:00
```

Formula:

```text
sessionReturnPct = (currentPrice - sessionOpenPrice) / sessionOpenPrice * 100
```

Create function:

```ts
getTaipeiSessionOpenTimestamp(now: Date): number
calculateSessionReturn(currentPrice: number, sessionOpenPrice: number): number
```

## 5. Baseline Windows

Suggested default windows:

```text
1H volume baseline: 30 days of 1H candles
4H baseline: 60 days of 4H candles
1D baseline: 180 days of daily candles
OI baseline: 30 days where available, otherwise self-stored data
Funding baseline: 30 days
```

## 6. Data Quality Rules

Each symbol should receive data quality flags:

```text
missingKlines
insufficientHistory
zeroVolumeCandles
abnormalGaps
lowLiquidity
unstableNewListing
```

If data quality is poor, reduce TradabilityScore and add `Data Quality Warning` tag.

## 7. MVP Mock Data Requirements

Create mock data for at least:

- BTCUSDT
- ETHUSDT
- SOLUSDT
- BNBUSDT
- XRPUSDT
- DOGEUSDT
- ARBUSDT
- OPUSDT
- ENAUSDT
- WIFUSDT
- PEPEUSDT
- SUIUSDT

Mock data should include different scenarios:

1. Strong BTC outperformer
2. Hidden setup with compression
3. Downside sweep and recovery
4. Upside sweep and fake breakout
5. OI build-up with flat price
6. Overheated funding risk
7. Low liquidity warning
8. Neutral coin

## 8. API Routes

### GET /api/dashboard

Returns dashboard view model.

### GET /api/symbol/[symbol]

Returns full symbol detail view model.

### POST /api/ingest/mock

Loads mock data.

### POST /api/ingest/binance

Future route for real data ingestion.

### GET /api/events

Query params:

```text
symbol optional
timeframe optional
limit optional
```

### POST /api/alerts/discord

Sends Discord alert payload.
