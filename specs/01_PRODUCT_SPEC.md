# 01 Product Spec — Crypto RPG Factor Screener

## 1. Product Vision

Crypto RPG Factor Screener 是一個「相對 BTC 強弱 + 動量異常 + 橫盤蓄勢 + 事件標籤」的加密貨幣市場雷達。

它不是一般漲幅榜，也不是單純技術指標工具，而是用量化方式尋找：

- 正在優於 BTC 的項目
- 尚未大漲但底層數據已經異常的項目
- 小市值項目的插針、放量、橫盤壓縮與 OI 堆積型態
- 可能即將出方向的趨勢候選與風險候選

## 2. Primary User

使用者是具備加密貨幣交易經驗、熟悉 BTC、山寨幣、OI、Funding、成交量與短線趨勢的人。使用者希望比一般排行榜更早發現異常。

## 3. Core Questions

工具每次刷新都要回答：

1. 哪些幣正在跑贏 BTC？
2. 哪些幣還沒明顯上漲，但成交量、OI 或波動率已經異常？
3. 哪些幣出現插針收回、假突破、流動性掃描或槓桿重置？
4. 哪些幣正在橫盤壓縮，可能準備出方向？
5. 哪些幣看似強勢，但其實有過熱、假突破或雙殺風險？
6. 哪些訊號只是雜訊，因為流動性不足或交易品質太差？

## 4. Main Pages

### 4.1 Dashboard

Dashboard 應包含：

1. Market Boss Panel
   - BTC 狀態
   - ETH 狀態
   - BTC.D placeholder
   - Total / Others placeholder
   - 市場模式：Trend / Rotation / Range / Deleveraging / Event Risk

2. BTC Outperformer Board
   - 尋找相對 BTC 強勢的幣

3. Hidden Setup Board
   - 尋找橫盤但底層數據異常的幣

4. Anomaly Radar
   - 成交量、OI、Funding、插針、Taker 方向異常

5. Risk / Trap Board
   - 過熱、假突破、雙向高分、流動性不足

### 4.2 Symbol Detail Page

每個幣種頁面應包含：

- RPG character card
- Long Score / Short Score
- TrendRankScore / WatchlistScore / TrapScore
- Five-axis radar chart
- Kline chart
- Factor breakdown
- Recent event timeline
- Current tags
- Entry / invalidation / TP candidate zones
- Risk interpretation

## 5. Main Ranking Boards

### 5.1 BTC Outperformer Board

目標：找已經相對 BTC 轉強的幣。

Required columns:

- Symbol
- TrendRankScore
- Relative BTC 1H
- Relative BTC 4H
- Relative BTC 1D
- MomentumScore
- VolumeSpikeRatio
- OI 4H Change
- FundingRate
- Tags

### 5.2 Hidden Setup Board

目標：找價格尚未啟動，但底層數據正在異常的幣。

Required columns:

- Symbol
- WatchlistScore
- CompressionScore
- VolumeAnomalyScore
- OIBuildupScore
- WickSweepScore
- RangeDuration
- Relative BTC 4H
- Tags

### 5.3 Risk / Trap Board

目標：避免追高殺低，找出高風險結構。

Required columns:

- Symbol
- TrapScore
- LongScore
- ShortScore
- FundingHeatScore
- OISpikeScore
- WickType
- VolatilityPercentile
- RiskTags

## 6. Game-like RPG Concept

每個幣種都像一張角色卡。

Example:

```text
SOLUSDT
Class: Momentum Raider
Bias: Long Candidate
TrendRankScore: 82
WatchlistScore: 55
TrapScore: 31

Abilities:
- Relative Strength: 86
- Momentum: 79
- Volume Anomaly: 71
- OI Pressure: 68
- Compression: 42

Tags:
BTC Outperformer / Relative Strength Rising / Volume Spike 3x
```

## 7. Out of Scope for MVP

MVP 不做：

- 自動下單
- 交易所帳號串接
- 真實資金管理
- 複雜回測系統
- 多交易所套利
- 鏈上地址追蹤

可在後續版本加入。

## 8. Success Criteria

MVP 成功條件：

1. 使用 mock data 可以顯示完整 Dashboard。
2. 至少支援 20 個 symbols 的排行榜。
3. 每個 symbol 可以計算所有核心分數。
4. 每個 symbol 可以掛上多個 tags。
5. 可以記錄 event logs。
6. 可以輸出 Discord webhook payload。
7. Codex 可以根據 spec 繼續擴充，而不需要每次重講需求。
