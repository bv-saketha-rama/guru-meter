import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { LeaderboardFilters } from '@/components/LeaderboardFilters';
import { LeaderboardRow } from '@/components/LeaderboardRow';
import { gurus } from '@/lib/mockData';

const Index = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [sortBy, setSortBy] = useState('score');
  const [lastUpdated] = useState(new Date());

  const sortedGurus = useMemo(() => {
    const sorted = [...gurus];
    switch (sortBy) {
      case 'accuracy':
        return sorted.sort((a, b) => b.accuracy - a.accuracy);
      case 'predictions':
        return sorted.sort((a, b) => b.totalPredictions - a.totalPredictions);
      case 'recent':
        return sorted.sort((a, b) => {
          const aRecent = a.recentForm.filter(f => f === 'correct').length;
          const bRecent = b.recentForm.filter(f => f === 'correct').length;
          return bRecent - aRecent;
        });
      default:
        return sorted.sort((a, b) => b.overallScore - a.overallScore);
    }
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>Live Rankings • Updated in Real-Time</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="text-gradient">GuruMeter</span>{' '}
            <span className="text-foreground">Leaderboard</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track the prediction accuracy of top crypto influencers. 
            Transparent scoring, real accountability.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <LeaderboardFilters
            timeRange={timeRange}
            sortBy={sortBy}
            onTimeRangeChange={setTimeRange}
            onSortChange={setSortBy}
            lastUpdated={lastUpdated}
          />
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border mb-2">
          <div className="col-span-1">Rank</div>
          <div className="col-span-3">Guru</div>
          <div className="col-span-2">Score</div>
          <div className="col-span-2">Accuracy</div>
          <div className="col-span-2">Predictions</div>
          <div className="col-span-2">Recent Form</div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {sortedGurus.map((guru, index) => (
            <LeaderboardRow 
              key={guru.id} 
              guru={guru} 
              rank={index + 1}
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
