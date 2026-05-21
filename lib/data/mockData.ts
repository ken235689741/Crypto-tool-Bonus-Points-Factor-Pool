import type { MockSymbolScenario } from '@/lib/types';

const now = Date.now();

const scenarioSeed: MockSymbolScenario[] = [
  ['BTCUSDT', 'NEUTRAL', 55, 50, 52, 48, 35],
  ['ETHUSDT', 'BTC_OUTPERFORMER', 74, 63, 70, 34, 28],
  ['SOLUSDT', 'BTC_OUTPERFORMER', 82, 60, 78, 29, 24],
  ['BNBUSDT', 'NEUTRAL', 58, 54, 56, 46, 30],
  ['XRPUSDT', 'HIDDEN_SETUP_COMPRESSION', 57, 74, 61, 43, 33],
  ['DOGEUSDT', 'UPSIDE_SWEEP_FAKE_BREAKOUT', 62, 58, 64, 51, 71],
  ['ARBUSDT', 'DOWNSIDE_SWEEP_RECOVERY', 60, 72, 68, 40, 37],
  ['OPUSDT', 'OI_BUILDUP_FLAT_PRICE', 59, 69, 62, 49, 45],
  ['ENAUSDT', 'OVERHEATED_FUNDING', 68, 56, 74, 52, 84],
  ['WIFUSDT', 'LOW_LIQUIDITY_WARNING', 44, 40, 47, 45, 78],
  ['PEPEUSDT', 'UPSIDE_SWEEP_FAKE_BREAKOUT', 66, 59, 70, 54, 76],
  ['SUIUSDT', 'HIDDEN_SETUP_COMPRESSION', 61, 75, 65, 44, 35]
] as const;

export const mockScenarios: MockSymbolScenario[] = scenarioSeed.map(([symbol, scenario, trend, watch, long, short, trap], idx) => ({
  symbol,
  scenario,
  score: {
    symbol,
    timestamp: now,
    trendRankScore: trend,
    watchlistScore: watch,
    longScore: long,
    shortScore: short,
    trapScore: trap,
    netBias: trap > 75 ? 'TRAP' : long - short > 8 ? 'LONG' : short - long > 8 ? 'SHORT' : 'NEUTRAL',
    confidence: Math.min(95, Math.max(40, trend + 8)),
    riskLevel: trap > 80 ? 'CRITICAL' : trap > 65 ? 'HIGH' : trap > 45 ? 'MEDIUM' : 'LOW',
    tags: [
      {
        tag: scenario,
        severity: trap > 70 ? 'high' : 'medium',
        status: 'active',
        timeframe: '4H',
        createdAt: now - 60 * 60 * 1000
      }
    ],
    factors: {
      relativeStrengthScore: trend,
      momentumScore: long,
      volumeAnomalyScore: Math.min(100, watch + 5),
      oiBuildupScore: watch,
      volatilityCompressionScore: scenario.includes('COMPRESSION') ? 78 : 45,
      wickSweepScore: scenario.includes('SWEEP') ? 82 : 40,
      absorptionScore: scenario === 'DOWNSIDE_SWEEP_RECOVERY' ? 76 : 48,
      fundingHeatScore: scenario === 'OVERHEATED_FUNDING' ? 89 : 42,
      tradabilityScore: scenario === 'LOW_LIQUIDITY_WARNING' ? 25 : 66
    }
  },
  latestKline: {
    symbol,
    openTime: now - 60 * 60 * 1000,
    closeTime: now,
    open: 100 + idx,
    high: 102 + idx,
    low: 98 + idx,
    close: 101 + idx,
    volume: 1000000 + idx * 10000,
    quoteVolume: 3000000 + idx * 12000,
    tradeCount: 5000 + idx * 17
  },
  futuresMetric: {
    symbol,
    timestamp: now,
    openInterest: 10000000 + idx * 200000,
    openInterestValue: 12000000 + idx * 210000,
    fundingRate: scenario === 'OVERHEATED_FUNDING' ? 0.0012 : 0.0001,
    takerBuyVolume: 800000 + idx * 5000,
    takerSellVolume: 760000 + idx * 4500,
    longShortRatio: 1.05 + idx * 0.01
  },
  events: [
    {
      id: `${symbol}-event-1`,
      symbol,
      timestamp: now - 30 * 60 * 1000,
      eventType: 'SCENARIO_MARKER',
      severity: 'medium',
      timeframe: '1H',
      title: `${scenario} detected`,
      description: `Mock scenario ${scenario} seeded for Phase 1 tests.`,
      payloadJson: { scenario }
    }
  ]
}));
