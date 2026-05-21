# 04 Pattern and Tagging Spec

## 1. Goal

The pattern engine detects market behavior that is invisible in simple gainers/losers rankings:

- Volume spike without price displacement
- Upper or lower wick sweep
- Liquidity grab and recovery
- Compression after sweep
- OI build-up during range
- Fake breakout risk
- Leverage reset

## 2. Candle Metrics

For each candle:

```text
CandleRange = High - Low
UpperWick = High - max(Open, Close)
LowerWick = min(Open, Close) - Low
Body = abs(Close - Open)
UpperWickRatio = UpperWick / CandleRange
LowerWickRatio = LowerWick / CandleRange
BodyRatio = Body / CandleRange
ClosePosition = (Close - Low) / CandleRange
```

Handle zero range safely:

```text
if CandleRange <= 0 then return neutral metrics
```

## 3. Downside Sweep

Downside Sweep means price swept below the recent low, printed a large lower wick, and closed back into the range.

### MVP Conditions

```text
LowerWickRatio > 0.50
VolumeSpikeRatio > 3
ClosePosition > 0.50
```

### Strong Conditions

```text
LowerWickRatio > 0.60
VolumeSpikeRatio > 5
ClosePosition > 0.65
Next N candles do not break sweep low
```

### Tags

- Downside Sweep
- Strong Downside Sweep
- Spring Watch
- Support Absorption

### Interpretation

Do not say: market maker is accumulating.

Say:

```text
Large downside wick with abnormal volume and close back inside range. This suggests a liquidity sweep and recovery structure. Follow-up confirmation is needed.
```

## 4. Upside Sweep

Upside Sweep means price swept above the recent high, printed a large upper wick, and closed back into the range.

### MVP Conditions

```text
UpperWickRatio > 0.50
VolumeSpikeRatio > 3
ClosePosition < 0.50
```

### Strong Conditions

```text
UpperWickRatio > 0.60
VolumeSpikeRatio > 5
ClosePosition < 0.35
Next N candles do not break sweep high
```

### Tags

- Upside Sweep
- Strong Upside Sweep
- Upthrust Watch
- Supply Absorption
- Fake Breakout Risk

## 5. Compression Setup

Compression means volatility is low relative to the coin's own history.

### Conditions

```text
ATR percentile < 30
Bollinger Band Width percentile < 25
Range duration >= minimumRangeBars
Price displacement during range is limited
```

### Tags

- Compression
- Volatility Squeeze
- Range Build-up
- Direction Pending

## 6. Pre-breakout Watch

Pre-breakout Watch combines compression and abnormal internal activity.

### Conditions

```text
CompressionScore > 65
OIBuildupScore > 60
RelativeStrengthScore > 55
VolumeAnomalyScore > 55
```

### Tags

- Pre-breakout Watch
- Hidden Setup

## 7. OI Build-up During Range

### Conditions

```text
abs(priceChangePct) < priceFlatThreshold
OIChangePct > oiBuildThreshold
```

Default thresholds:

```text
priceFlatThreshold = 2% for small/mid caps, 1% for large caps
oiBuildThreshold = 5% over 4H
```

### Tags

- OI Build-up
- Leverage Compression
- Direction Pending

## 8. Leverage Reset

### Conditions

```text
WickSweep detected
OI drops significantly after sweep
Price returns to range
```

Example:

```text
OIChangePct < -3% within 1H to 4H after sweep
```

### Tags

- Leverage Reset
- Post-sweep Reset

## 9. Effort vs Result / Absorption

### Conditions

```text
VolumeSpikeRatio > 3
abs(priceChangePct) < medianAbsPriceChange * 0.75
```

Bullish context:

```text
LowerWickRatio high OR price holds range low
```

Bearish context:

```text
UpperWickRatio high OR price rejects range high
```

### Tags

- Absorption
- Support Absorption
- Supply Absorption
- Silent Accumulation Candidate
- Distribution Risk

Use careful language. Do not claim certainty.

## 10. Tag System

A symbol can have multiple active tags.

Each tag should include:

```text
tag
severity: low / medium / high / critical
status: active / expired / invalidated
sourceTimeframe
createdAt
expiresAt
invalidationRule
payloadJson
```

## 11. Suggested Tags

### Relative Strength Tags

- BTC Outperformer
- Relative Strength Rising
- Early Rotation
- Momentum Breakout
- Trend Continuation

### Volume Tags

- Volume Spike 2x
- Volume Spike 3x
- Volume Spike 5x
- Extreme Volume Spike
- Spot Demand Spike
- Futures Heat Spike
- Historical High Volume

### OI Tags

- OI Build-up
- OI Expansion Confirmed
- Long Unwind
- Short Build-up
- Squeeze Risk
- Leverage Reset

### Wick / Sweep Tags

- Downside Sweep
- Upside Sweep
- Spring Watch
- Upthrust Watch
- Fake Breakout Risk
- Liquidity Grab

### Compression Tags

- Compression
- Range Build-up
- Volatility Squeeze
- Pre-breakout Watch
- Direction Pending

### Risk Tags

- Funding Overheated
- Low Liquidity Risk
- Long Crowded
- Short Crowded
- Two-sided Trap
- Data Quality Warning

## 12. Tag Expiration

Example expiration rules:

```text
Volume Spike tags expire after 12 to 24 hours.
Sweep tags expire after price invalidates sweep high/low or after 48 hours.
Compression tags expire after breakout/breakdown.
Funding Heat tags expire when funding returns below threshold.
```

## 13. Tag Upgrade Logic

Example:

```text
Downside Sweep
  + no lower low after 6 candles
  + compression
  + relative BTC strength rising
= Spring Watch

Spring Watch
  + breakout above range high
  + volume confirmation
= Long Trigger Candidate
```

## 14. Tag Invalidation Logic

Example:

```text
Spring Watch invalidated if price breaks below sweep low.
Upthrust Watch invalidated if price breaks above sweep high.
Compression invalidated if range expansion exceeds threshold.
Pre-breakout Watch invalidated if relative strength collapses or OI unwinds.
```
