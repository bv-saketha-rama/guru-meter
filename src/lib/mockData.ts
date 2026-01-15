export interface Guru {
  id: string;
  name: string;
  avatar: string;
  channelUrl: string;
  subscribers: number;
  category: 'crypto' | 'cricket' | 'economics';
  overallScore: number;
  accuracy: number;
  totalPredictions: number;
  correctPredictions: number;
  incorrectPredictions: number;
  pendingPredictions: number;
  recentForm: ('correct' | 'incorrect' | 'partial' | 'pending')[];
  rankChange: number;
  previousRank: number;
  scoreHistory: number[];
}

export interface Prediction {
  id: string;
  guruId: string;
  guruName: string;
  guruAvatar: string;
  title: string;
  asset: string;
  target: string;
  actual?: string;
  confidence: 'low' | 'medium' | 'high';
  timeframeEnd: string;
  status: 'correct' | 'incorrect' | 'partial' | 'pending';
  reasoning: string;
  videoUrl?: string;
  videoThumbnail?: string;
  scores?: {
    accuracy: number;
    confidence: number;
    timeframe: number;
    reasoning: number;
    total: number;
  };
  createdAt: string;
}

export const gurus: Guru[] = [
  {
    id: '1',
    name: 'CryptoWizard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoWizard',
    channelUrl: 'https://youtube.com/@cryptowizard',
    subscribers: 1250000,
    category: 'crypto',
    overallScore: 87,
    accuracy: 78,
    totalPredictions: 156,
    correctPredictions: 122,
    incorrectPredictions: 28,
    pendingPredictions: 6,
    recentForm: ['correct', 'correct', 'partial', 'correct', 'correct'],
    rankChange: 2,
    previousRank: 3,
    scoreHistory: [72, 75, 78, 82, 85, 87],
  },
  {
    id: '2',
    name: 'BitcoinBull',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BitcoinBull',
    channelUrl: 'https://youtube.com/@bitcoinbull',
    subscribers: 890000,
    category: 'crypto',
    overallScore: 82,
    accuracy: 72,
    totalPredictions: 203,
    correctPredictions: 146,
    incorrectPredictions: 45,
    pendingPredictions: 12,
    recentForm: ['correct', 'incorrect', 'correct', 'correct', 'pending'],
    rankChange: -1,
    previousRank: 1,
    scoreHistory: [85, 83, 80, 81, 83, 82],
  },
  {
    id: '3',
    name: 'AltcoinAlpha',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AltcoinAlpha',
    channelUrl: 'https://youtube.com/@altcoinalpha',
    subscribers: 567000,
    category: 'crypto',
    overallScore: 79,
    accuracy: 68,
    totalPredictions: 98,
    correctPredictions: 67,
    incorrectPredictions: 24,
    pendingPredictions: 7,
    recentForm: ['partial', 'correct', 'correct', 'incorrect', 'correct'],
    rankChange: 1,
    previousRank: 4,
    scoreHistory: [65, 68, 72, 75, 77, 79],
  },
  {
    id: '4',
    name: 'DeFiDegen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiDegen',
    channelUrl: 'https://youtube.com/@defidegen',
    subscribers: 432000,
    category: 'crypto',
    overallScore: 74,
    accuracy: 65,
    totalPredictions: 178,
    correctPredictions: 116,
    incorrectPredictions: 52,
    pendingPredictions: 10,
    recentForm: ['incorrect', 'correct', 'partial', 'correct', 'incorrect'],
    rankChange: -2,
    previousRank: 2,
    scoreHistory: [78, 76, 74, 73, 74, 74],
  },
  {
    id: '5',
    name: 'TokenTitan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TokenTitan',
    channelUrl: 'https://youtube.com/@tokentitan',
    subscribers: 345000,
    category: 'crypto',
    overallScore: 71,
    accuracy: 62,
    totalPredictions: 89,
    correctPredictions: 55,
    incorrectPredictions: 28,
    pendingPredictions: 6,
    recentForm: ['correct', 'correct', 'pending', 'incorrect', 'correct'],
    rankChange: 0,
    previousRank: 5,
    scoreHistory: [68, 69, 70, 70, 71, 71],
  },
  {
    id: '6',
    name: 'ChartMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChartMaster',
    channelUrl: 'https://youtube.com/@chartmaster',
    subscribers: 678000,
    category: 'crypto',
    overallScore: 68,
    accuracy: 58,
    totalPredictions: 234,
    correctPredictions: 136,
    incorrectPredictions: 82,
    pendingPredictions: 16,
    recentForm: ['incorrect', 'partial', 'correct', 'incorrect', 'partial'],
    rankChange: 3,
    previousRank: 9,
    scoreHistory: [55, 58, 62, 65, 67, 68],
  },
  {
    id: '7',
    name: 'WhaleWatcher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WhaleWatcher',
    channelUrl: 'https://youtube.com/@whalewatcher',
    subscribers: 234000,
    category: 'crypto',
    overallScore: 65,
    accuracy: 55,
    totalPredictions: 67,
    correctPredictions: 37,
    incorrectPredictions: 25,
    pendingPredictions: 5,
    recentForm: ['pending', 'correct', 'incorrect', 'correct', 'incorrect'],
    rankChange: -1,
    previousRank: 6,
    scoreHistory: [62, 63, 64, 65, 65, 65],
  },
  {
    id: '8',
    name: 'MoonShot',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MoonShot',
    channelUrl: 'https://youtube.com/@moonshot',
    subscribers: 156000,
    category: 'crypto',
    overallScore: 52,
    accuracy: 45,
    totalPredictions: 145,
    correctPredictions: 65,
    incorrectPredictions: 68,
    pendingPredictions: 12,
    recentForm: ['incorrect', 'incorrect', 'partial', 'incorrect', 'correct'],
    rankChange: -2,
    previousRank: 6,
    scoreHistory: [58, 55, 53, 52, 52, 52],
  },
];

export const predictions: Prediction[] = [
  {
    id: '1',
    guruId: '1',
    guruName: 'CryptoWizard',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoWizard',
    title: 'BTC to hit $100K by EOY 2025',
    asset: 'Bitcoin (BTC)',
    target: '$100,000',
    actual: '$97,500',
    confidence: 'high',
    timeframeEnd: '2025-12-31',
    status: 'pending',
    reasoning: 'Institutional adoption via ETFs, halving cycle momentum, and increasing macro uncertainty driving flight to digital gold.',
    videoUrl: 'https://youtube.com/watch?v=example1',
    videoThumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=320&h=180&fit=crop',
    scores: {
      accuracy: 9.75,
      confidence: 9,
      timeframe: 7,
      reasoning: 8,
      total: 8.4,
    },
    createdAt: '2024-11-15',
  },
  {
    id: '2',
    guruId: '1',
    guruName: 'CryptoWizard',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoWizard',
    title: 'ETH/BTC ratio to recover to 0.06',
    asset: 'Ethereum (ETH)',
    target: '0.06 ETH/BTC',
    actual: '0.058',
    confidence: 'medium',
    timeframeEnd: '2025-03-31',
    status: 'correct',
    reasoning: 'Ethereum upgrade improvements and DeFi resurgence expected to outpace Bitcoin temporarily.',
    videoThumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=320&h=180&fit=crop',
    scores: {
      accuracy: 8.5,
      confidence: 7,
      timeframe: 8,
      reasoning: 7.5,
      total: 7.8,
    },
    createdAt: '2024-12-01',
  },
  {
    id: '3',
    guruId: '2',
    guruName: 'BitcoinBull',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BitcoinBull',
    title: 'SOL to flip BNB in market cap',
    asset: 'Solana (SOL)',
    target: 'Higher MC than BNB',
    actual: 'Not achieved',
    confidence: 'high',
    timeframeEnd: '2025-01-01',
    status: 'incorrect',
    reasoning: 'Solana ecosystem growth and institutional interest would drive valuation above BNB.',
    videoThumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=320&h=180&fit=crop',
    scores: {
      accuracy: 3,
      confidence: 2,
      timeframe: 5,
      reasoning: 6,
      total: 3.8,
    },
    createdAt: '2024-10-20',
  },
  {
    id: '4',
    guruId: '3',
    guruName: 'AltcoinAlpha',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AltcoinAlpha',
    title: 'LINK to reach $30 by Q1 2025',
    asset: 'Chainlink (LINK)',
    target: '$30',
    actual: '$28.50',
    confidence: 'medium',
    timeframeEnd: '2025-03-31',
    status: 'partial',
    reasoning: 'Oracle adoption increasing, CCIP rollout accelerating cross-chain activity.',
    videoThumbnail: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=320&h=180&fit=crop',
    scores: {
      accuracy: 7.5,
      confidence: 7,
      timeframe: 8,
      reasoning: 8,
      total: 7.6,
    },
    createdAt: '2024-11-01',
  },
  {
    id: '5',
    guruId: '4',
    guruName: 'DeFiDegen',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiDegen',
    title: 'AAVE TVL to exceed $20B',
    asset: 'Aave (AAVE)',
    target: '$20B TVL',
    confidence: 'low',
    timeframeEnd: '2025-06-30',
    status: 'pending',
    reasoning: 'DeFi summer 2.0 incoming with institutional capital entering lending protocols.',
    videoThumbnail: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=320&h=180&fit=crop',
    createdAt: '2025-01-05',
  },
  {
    id: '6',
    guruId: '5',
    guruName: 'TokenTitan',
    guruAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TokenTitan',
    title: 'DOGE to hit $0.50',
    asset: 'Dogecoin (DOGE)',
    target: '$0.50',
    actual: '$0.42',
    confidence: 'high',
    timeframeEnd: '2025-02-28',
    status: 'correct',
    reasoning: 'Meme coin mania combined with potential X payments integration.',
    videoThumbnail: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=320&h=180&fit=crop',
    scores: {
      accuracy: 8.4,
      confidence: 8,
      timeframe: 9,
      reasoning: 6,
      total: 7.8,
    },
    createdAt: '2024-12-15',
  },
];

export const categories = [
  { id: 'crypto', name: 'Crypto', icon: '₿', active: true },
  { id: 'cricket', name: 'Cricket', icon: '🏏', active: false },
  { id: 'economics', name: 'Economics', icon: '📈', active: false },
];

export const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

export const sortOptions = [
  { value: 'score', label: 'Overall Score' },
  { value: 'accuracy', label: 'Accuracy' },
  { value: 'recent', label: 'Recent Performance' },
  { value: 'predictions', label: 'Total Predictions' },
];
