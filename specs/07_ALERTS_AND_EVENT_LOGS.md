# 07 Alerts and Event Logs

## 1. Core Principle

The alert system should not send noisy single-condition notifications. It should prioritize event chains.

Bad alert:

```text
ARBUSDT volume is 5x.
```

Better alert:

```text
ARBUSDT has Volume Spike 5x + Downside Sweep + OI Reset + Compression. Hidden setup upgraded to Lv2.
```

## 2. Alert Levels

### Lv1 — Single Anomaly

Triggered by one abnormal condition.

Examples:

- VolumeSpikeRatio > 3
- OI 1H change > threshold
- FundingRate above threshold
- Large wick sweep

### Lv2 — Structure Forming

Triggered by combination of anomaly and structure.

Examples:

- Downside Sweep + no lower low after N candles
- Compression + OI build-up
- Volume spike + price displacement limited
- Relative BTC strength rising + volume anomaly

### Lv3 — Direction Trigger

Triggered by breakout or breakdown after structure.

Examples:

- Spring Watch + range breakout
- Upthrust Watch + range breakdown
- BTC Outperformer + volume confirmed breakout

### Lv4 — Risk Alert

Triggered by high-risk conditions.

Examples:

- Funding overheated + OI spike + price extension
- LongScore and ShortScore both high
- Fake breakout risk
- Low liquidity + extreme volatility

## 3. Event Log Model

Each event should be stored even if no alert is sent.

```ts
interface EventLog {
  id: string;
  symbol: string;
  timestamp: number;
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeframe: '1H' | '4H' | '1D' | '7D' | '30D' | '90D';
  title: string;
  description: string;
  payloadJson: Record<string, unknown>;
}
```

## 4. Alert Model

```ts
interface Alert {
  id: string;
  symbol: string;
  timestamp: number;
  alertLevel: 'LV1' | 'LV2' | 'LV3' | 'LV4';
  alertType: string;
  title: string;
  message: string;
  payloadJson: Record<string, unknown>;
  sentToDiscord: boolean;
}
```

## 5. Event Chain Examples

### 5.1 Hidden Bullish Setup

```text
Volume Spike 5x
+ Downside Sweep
+ OI Reset
+ Price returns to range
+ 4H Relative BTC Strength rising
= Lv2 Hidden Setup / Spring Watch
```

### 5.2 Breakout Trigger

```text
Spring Watch
+ Compression
+ Close above range high
+ Volume confirmation
= Lv3 Long Trigger Candidate
```

### 5.3 Fake Breakout Risk

```text
Volume Spike 5x
+ Upside Sweep
+ OI rising
+ Funding high
+ price fails to hold breakout
= Lv4 Fake Breakout Risk
```

## 6. Discord Message Template

```text
[{{level}} {{alertType}}] {{symbol}}

State:
- Bias: {{bias}}
- TrendRankScore: {{trendRankScore}}
- WatchlistScore: {{watchlistScore}}
- TrapScore: {{trapScore}}

Detected Events:
{{eventList}}

Interpretation:
{{interpretation}}

Watch Conditions:
- Upgrade: {{upgradeCondition}}
- Invalidation: {{invalidationCondition}}

Risk Notes:
{{riskNotes}}
```

## 7. Example Discord Alert

```text
[Lv2 Hidden Setup] ARBUSDT

State:
- Bias: Watchlist
- TrendRankScore: 58
- WatchlistScore: 76
- TrapScore: 34

Detected Events:
- 1H volume reached 5.6x rolling median.
- Lower wick ratio 64%, close returned inside range.
- OI dropped 3.8% after sweep.
- 4H relative BTC strength turned positive.

Interpretation:
Price has not broken out yet, but the symbol shows a liquidity sweep and recovery structure with abnormal volume and improving relative strength.

Watch Conditions:
- Upgrade: close above range high with volume confirmation.
- Invalidation: break below sweep low.

Risk Notes:
Funding is normal. Liquidity is acceptable. Avoid chasing before breakout confirmation.
```

## 8. Alert Cooldown

To avoid spam:

```text
Same symbol + same alert type = cooldown 2 to 4 hours
Lv3 can bypass cooldown if new breakout level is reached
Lv4 can bypass cooldown if risk becomes critical
```

## 9. Alert Deduplication

Deduplicate by:

```text
symbol
alertType
timeframe
triggerLevel
```

## 10. Future Enhancements

- Telegram Bot
- Watchlist subscription
- Alert severity customization
- User-defined thresholds
- Daily summary report
- Weekly factor performance review
