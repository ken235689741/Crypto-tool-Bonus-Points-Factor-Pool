# 06 UI Spec

## 1. Visual Direction

The UI should feel like a clean trading dashboard combined with RPG character stats.

Keywords:

- clean
- dark mode first
- high information density
- readable tables
- RPG ability card
- radar chart
- badges and status effects
- not too flashy

## 2. Dashboard Layout

```text
┌──────────────────────────────────────────┐
│ Market Boss Panel                        │
├──────────────────┬───────────────────────┤
│ BTC Outperformer │ Hidden Setup Board     │
├──────────────────┴───────────────────────┤
│ Anomaly Radar                             │
├──────────────────────────────────────────┤
│ Risk / Trap Board                         │
└──────────────────────────────────────────┘
```

## 3. Market Boss Panel

Cards:

- BTC state
- ETH state
- Market mode
- Total risk level
- Strongest sector placeholder
- Alert count

Example market modes:

```text
TREND
ROTATION
RANGE
DELEVERAGING
EVENT_RISK
```

## 4. Score Badges

Score display:

```text
0–39 weak
40–54 neutral
55–69 watch
70–84 strong
85–100 extreme
```

Badge logic:

- 70+ should stand out
- 85+ should show extreme warning
- TrapScore high should always be visually distinct

## 5. Radar Ability Chart

Five axes:

1. Relative Strength
2. Momentum
3. Volume Anomaly
4. OI Pressure
5. Compression / Setup Quality

Optional second radar for risk:

1. Funding Heat
2. OI Crowding
3. Wick Rejection
4. Low Liquidity
5. Two-sided Trap

## 6. Symbol RPG Card

Required fields:

```text
Symbol
Class
Bias
TrendRankScore
WatchlistScore
LongScore
ShortScore
TrapScore
RiskLevel
ActiveTags
Short Interpretation
```

Example class names:

```text
Momentum Raider
Hidden Accumulator
Volatility Rogue
Leverage Mage
Range Guardian
Trap Assassin
Neutral NPC
```

Class generation should be deterministic based on score profile.

## 7. Tables

Tables must be sortable by:

- TrendRankScore
- WatchlistScore
- TrapScore
- Relative BTC 4H
- VolumeSpikeRatio
- OIChange4H
- FundingRate

Each row should support click-through to symbol detail page.

## 8. Symbol Detail Page

Sections:

1. Header card
2. Radar ability chart
3. Kline chart
4. Factor breakdown table
5. Event timeline
6. Tag list
7. Entry / invalidation / target candidate plan
8. Risk interpretation

## 9. Event Timeline UI

Timeline item example:

```text
10:00  [Volume Spike 5x]  1H volume reached 5.6x rolling median.
10:00  [Downside Sweep]   Lower wick ratio 64%, close returned inside range.
11:00  [Leverage Reset]   OI dropped 3.8% after sweep.
13:00  [Compression]      ATR percentile fell below 30.
15:00  [RS Rising]        4H relative BTC strength turned positive.
```

## 10. Entry Plan Card

This should be explicitly framed as candidate levels, not financial advice.

Fields:

```text
Setup Type
Breakout Trigger
Pullback Zone
Invalidation Level
TP1 / TP2 / TP3
Confirmation Needed
Risk Notes
```

Example:

```text
Setup Type: Spring Watch → Long Trigger Candidate
Breakout Trigger: close above range high with volume confirmation
Invalidation: break below downside sweep low
Risk: funding slightly elevated; avoid aggressive leverage
```

## 11. Copywriting Rules

Avoid:

```text
莊家要拉了
一定會噴
可以買
準備翻倍
```

Use:

```text
出現趨勢延續條件
出現放量收回結構
相對 BTC 強度改善
進入橫盤壓縮觀察
若突破區間上緣，可能升級為多方觸發候選
```

## 12. Responsive Design

Desktop first.

Minimum responsive rules:

- Dashboard tables should scroll horizontally on small screens.
- Symbol cards stack vertically on mobile.
- Radar chart should remain readable at 320px width.
