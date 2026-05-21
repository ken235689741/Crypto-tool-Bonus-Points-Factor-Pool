# 03 Factor Engine Spec

## 1. Core Philosophy

The factor engine should not simply rank coins by percentage gain. It should identify abnormal changes relative to:

1. BTC performance
2. The coin's own historical baseline
3. The current market universe
4. Volatility-adjusted expectations

## 2. Timeframes

Supported timeframes:

- 1H
- 4H
- 1D
- 7D
- 30D
- 90D

MVP can calculate 1H, 4H, 1D first. 7D, 30D, 90D can be added after data storage is stable.

## 3. Normalization Methods

Do not rely only on averages. Use robust baselines:

### 3.1 Median Ratio

```text
ratio = currentValue / rollingMedian(value, window)
```

### 3.2 Percentile Rank

```text
percentile = rank(currentValue in rollingWindow)
```

### 3.3 Z-score

```text
z = (currentValue - mean) / std
```

### 3.4 MAD Robust Z-score

```text
madZ = 0.6745 * (currentValue - median) / MAD
```

### 3.5 Score Mapping

All factors should be converted to 0–100.

Example mapping:

```text
score = clamp(50 + z * 15, 0, 100)
```

## 4. Relative Strength vs BTC

### 4.1 Relative Return

```text
coinReturn = (coinCloseNow - coinClosePast) / coinClosePast
btcReturn = (btcCloseNow - btcClosePast) / btcClosePast
relativeReturn = coinReturn - btcReturn
```

### 4.2 Volatility-adjusted Relative Return

```text
relativeMomentumZ =
  (currentRelativeReturn - rollingMean(relativeReturn))
  / rollingStd(relativeReturn)
```

### 4.3 RelativeStrengthScore

Suggested formula:

```text
RelativeStrengthScore =
  score(RelBTC_1H_Z) * 0.20 +
  score(RelBTC_4H_Z) * 0.35 +
  score(RelBTC_1D_Z) * 0.30 +
  score(RelBTC_7D_Z) * 0.15
```

If 7D is not available in MVP, redistribute weight:

```text
RelativeStrengthScore =
  score(RelBTC_1H_Z) * 0.25 +
  score(RelBTC_4H_Z) * 0.40 +
  score(RelBTC_1D_Z) * 0.35
```

## 5. MomentumScore

MomentumScore measures whether price is actively trending.

Inputs:

- return 1H / 4H / 1D
- EMA slope
- price position within recent range
- breakout status
- volatility-adjusted return

Suggested formula:

```text
MomentumScore =
  returnScore * 0.35 +
  emaSlopeScore * 0.25 +
  breakoutScore * 0.25 +
  rangePositionScore * 0.15
```

## 6. VolumeAnomalyScore

Use volume relative to rolling median and percentile.

```text
VolumeSpikeRatio = currentVolume / rollingMedian(volume, window)
```

Labels:

```text
> 2x = Volume Spike 2x
> 3x = Volume Spike 3x
> 5x = Volume Spike 5x
> 8x = Extreme Volume Spike
> 95th percentile = Historical High Volume
> 99th percentile = Rare High Volume
```

Suggested score:

```text
VolumeAnomalyScore =
  score(log(VolumeSpikeRatio)) * 0.50 +
  percentileScore(volume) * 0.30 +
  sameTimeOfDayScore * 0.20
```

MVP can omit same-time-of-day score.

## 7. OIBuildupScore

OI is used to detect leverage build-up and directional confirmation.

Inputs:

- OI change 1H
- OI change 4H
- OI change 1D
- price change during same period
- OI percentile

Key logic:

```text
price up + OI up = trend confirmation
price up + OI down = short covering / squeeze
price down + OI up = new shorts / bearish pressure
price down + OI down = long unwind / deleveraging
price flat + OI up = compression / possible expansion
price flat + OI down = interest fading
```

Suggested score:

```text
OIBuildupScore =
  oiChangeScore * 0.40 +
  oiPercentileScore * 0.25 +
  priceOiDivergenceScore * 0.25 +
  fundingAdjustedScore * 0.10
```

## 8. VolatilityCompressionScore

Detects range compression before expansion.

Inputs:

- ATR percentile
- Bollinger Band Width percentile
- realized volatility percentile
- range duration

Suggested formula:

```text
VolatilityCompressionScore =
  inversePercentile(ATR) * 0.35 +
  inversePercentile(BollingerBandWidth) * 0.35 +
  rangeDurationScore * 0.20 +
  lowRealizedVolScore * 0.10
```

High score means volatility is compressed.

## 9. WickSweepScore

Detects upper/lower wick liquidity sweeps.

See `04_PATTERN_TAGGING_SPEC.md` for full logic.

## 10. AbsorptionScore

Detects effort vs result divergence.

```text
Effort = VolumeSpikeRatio + OISpikeRatio + TakerVolumeSpike
Result = abs(priceChangePct)
EffortResultRatio = Effort / max(Result, smallNumber)
```

Interpretation:

```text
High volume + small price movement = possible absorption
High volume + lower wick recovery = possible support absorption
High volume + upper wick rejection = possible supply absorption
```

Suggested formula:

```text
AbsorptionScore =
  effortScore * 0.45 +
  inversePriceDisplacementScore * 0.35 +
  wickContextScore * 0.20
```

## 11. TrendRankScore

Used for BTC Outperformer Board.

```text
TrendRankScore =
  RelativeStrengthScore * 0.35 +
  MomentumScore * 0.30 +
  VolumeConfirmationScore * 0.15 +
  OIConfirmationScore * 0.15 +
  TradabilityScore * 0.05
```

## 12. WatchlistScore

Used for Hidden Setup Board.

```text
WatchlistScore =
  VolatilityCompressionScore * 0.25 +
  VolumeAnomalyScore * 0.25 +
  OIBuildupScore * 0.20 +
  RelativeStrengthScore * 0.20 +
  WickSweepScore * 0.10
```

## 13. LongScore

```text
LongScore =
  RelativeStrengthScore * 0.30 +
  MomentumScore * 0.25 +
  bullishVolumeScore * 0.15 +
  bullishOIScore * 0.15 +
  bullishPatternScore * 0.10 +
  TradabilityScore * 0.05 -
  longRiskPenalty
```

## 14. ShortScore

```text
ShortScore =
  RelativeWeaknessScore * 0.30 +
  DownsideMomentumScore * 0.25 +
  bearishVolumeScore * 0.15 +
  bearishOIScore * 0.15 +
  bearishPatternScore * 0.10 +
  TradabilityScore * 0.05 -
  shortRiskPenalty
```

## 15. TrapScore

Detects risk of false breakout, overcrowded leverage, or two-sided volatility.

```text
TrapScore =
  FundingHeatScore * 0.25 +
  OISpikeWithoutPriceConfirmationScore * 0.25 +
  WickRejectionScore * 0.20 +
  LongShortBothHighScore * 0.15 +
  LowLiquidityRiskScore * 0.15
```

## 16. TradabilityScore

Measures whether the coin is worth tracking/trading.

Inputs:

- 24H quote volume
- spread placeholder
- Kline continuity
- average volume
- market cap tier if available
- excessive wick frequency

```text
TradabilityScore =
  liquidityScore * 0.40 +
  volumeStabilityScore * 0.25 +
  klineContinuityScore * 0.20 +
  inverseExtremeWickFrequencyScore * 0.15
```
