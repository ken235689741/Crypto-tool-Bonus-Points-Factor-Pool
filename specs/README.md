# Crypto RPG Factor Screener — Spec Pack

這是一組給 Codex / AI coding agent 使用的專案規格文件。目的不是一次寫出所有功能，而是讓工程代理可以根據穩定的目標、資料結構、任務拆解與驗收標準，持續開發與優化。

## 專案核心目標

建立一個虛擬貨幣因子池判讀工具，用來找出：

1. 明顯優於 BTC 走勢的項目。
2. 成交量、持倉量、波動率、Funding、Taker Buy/Sell 等底層數據正在增強或減弱的項目。
3. 價格仍在橫盤，但出現異常放量、插針收回、OI 堆積、波動率壓縮等早期結構的項目。
4. 可能進入趨勢發動、假突破、槓桿清洗、軋空或殺多風險的項目。

此工具不直接宣稱「莊家吸籌」或「主力拉盤」，而是輸出客觀可驗證的市場行為描述，例如：

- 放量但價格位移有限
- 下插針後收回
- OI 堆積但價格橫盤
- 相對 BTC 強度轉正
- 波動率壓縮
- 假突破風險提高

## 文件使用順序

建議 Codex 依照以下順序讀取：

1. `01_PRODUCT_SPEC.md`：產品目標與功能定義
2. `02_ARCHITECTURE.md`：技術架構與資料流
3. `03_FACTOR_ENGINE_SPEC.md`：因子與評分公式
4. `04_PATTERN_TAGGING_SPEC.md`：插針、橫盤、異常事件與標籤系統
5. `05_DATA_API_SPEC.md`：資料來源與 API 抽象層
6. `06_UI_SPEC.md`：介面與角色能力值設計
7. `07_ALERTS_AND_EVENT_LOGS.md`：通知與事件追蹤
8. `08_CODEX_WORKFLOW.md`：Codex 工作流程與開發規則
9. `09_TASK_BACKLOG.md`：分階段開發任務
10. `10_CODEX_TASK_PROMPTS.md`：可直接貼給 Codex 的任務提示詞

## 第一階段目標

MVP 不需要真實下單，不需要策略自動交易。第一版只做：

- 資料抓取架構
- Mock data
- 因子計算
- 排行榜
- 幣種詳情頁
- 標籤系統
- 事件紀錄
- Discord 通知架構

## 建議技術棧

- Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui
- Chart: Recharts for radar chart, Lightweight Charts for Kline chart
- Backend: Next.js API Routes first, later can migrate to FastAPI
- ORM: Prisma
- Database: PostgreSQL
- Scheduler: Vercel Cron / GitHub Actions / Cloud Run Jobs
- Alert: Discord Webhook / Telegram Bot later

## 核心開發原則

1. 計算邏輯不可寫死在 React component。
2. 每個因子都要獨立 function，方便回測與調整。
3. 所有分數都統一為 0–100。
4. 所有原始數據與標準化後分數都要保留。
5. 同一個幣種可以同時掛多個標籤。
6. 異常訊號要記錄成 event log，不要只顯示當下狀態。
7. 每個功能完成後都要有明確驗收條件。
8. 交易相關輸出只做「市場判讀」與「候選區間」，不做投資建議或自動下單。
