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

export interface FuturesMetric {
  symbol: string;
  timestamp: number;
  openInterest: number;
  openInterestValue?: number;
  fundingRate: number;
  takerBuyVolume: number;
  takerSellVolume: number;
  longShortRatio?: number;
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

export interface TagView {
  tag: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'expired' | 'invalidated';
  timeframe?: Timeframe;
  createdAt: number;
  expiresAt?: number;
}

export interface EventLog {
  id: string;
  symbol: string;
  timestamp: number;
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeframe: Timeframe;
  title: string;
  description: string;
  payloadJson: Record<string, unknown>;
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

export interface MockSymbolScenario {
  symbol: string;
  scenario:
    | 'BTC_OUTPERFORMER'
    | 'HIDDEN_SETUP_COMPRESSION'
    | 'DOWNSIDE_SWEEP_RECOVERY'
    | 'UPSIDE_SWEEP_FAKE_BREAKOUT'
    | 'OI_BUILDUP_FLAT_PRICE'
    | 'OVERHEATED_FUNDING'
    | 'LOW_LIQUIDITY_WARNING'
    | 'NEUTRAL';
  score: ScoreSnapshotView;
  latestKline: Kline;
  futuresMetric: FuturesMetric;
  events: EventLog[];
}
