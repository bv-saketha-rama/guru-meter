import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Trophy, Target, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { ScoreIndicator } from '@/components/ScoreIndicator';
import { StatCard } from '@/components/StatCard';
import { PredictionCard } from '@/components/PredictionCard';
import { MiniSparkline } from '@/components/MiniSparkline';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gurus, predictions } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GuruProfile = () => {
  const { id } = useParams();
  const guru = gurus.find(g => g.id === id);
  const guruPredictions = predictions.filter(p => p.guruId === id);

  if (!guru) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-28 text-center">
          <h1 className="text-2xl font-bold mb-4">Guru not found</h1>
          <Button asChild>
            <Link to="/">Back to Leaderboard</Link>
          </Button>
        </main>
      </div>
    );
  }

  const chartData = guru.scoreHistory.map((score, index) => ({
    month: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][index],
    score,
  }));

  const currentRank = gurus.findIndex(g => g.id === guru.id) + 1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-12">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Leaderboard
          </Link>
        </Button>

        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-accent/30 glow-accent">
              <AvatarImage src={guru.avatar} alt={guru.name} />
              <AvatarFallback className="text-2xl">{guru.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{guru.name}</h1>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="font-mono font-bold text-accent">#{currentRank}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span>{(guru.subscribers / 1000000).toFixed(2)}M subscribers</span>
                <Button variant="link" size="sm" asChild className="p-0 h-auto text-accent">
                  <a href={guru.channelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    YouTube Channel
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <ScoreIndicator score={guru.overallScore} size="lg" showLabel />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>6-month trend</span>
                <MiniSparkline data={guru.scoreHistory} width={80} height={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Overall Score" 
            value={guru.overallScore} 
            icon={Trophy} 
            variant="accent"
          />
          <StatCard 
            label="Accuracy" 
            value={`${guru.accuracy}%`} 
            icon={Target} 
            variant="default"
          />
          <StatCard 
            label="Correct" 
            value={guru.correctPredictions} 
            icon={CheckCircle} 
            variant="success"
          />
          <StatCard 
            label="Incorrect" 
            value={guru.incorrectPredictions} 
            icon={XCircle} 
            variant="destructive"
          />
        </div>

        {/* Performance Chart */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Score Evolution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Predictions Tabs */}
        <div className="glass-card rounded-2xl p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({guruPredictions.length})</TabsTrigger>
              <TabsTrigger value="correct" className="text-success">
                Correct ({guruPredictions.filter(p => p.status === 'correct').length})
              </TabsTrigger>
              <TabsTrigger value="incorrect" className="text-destructive">
                Incorrect ({guruPredictions.filter(p => p.status === 'incorrect').length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-pending">
                Pending ({guruPredictions.filter(p => p.status === 'pending').length})
              </TabsTrigger>
            </TabsList>

            {['all', 'correct', 'incorrect', 'pending', 'partial'].map((status) => (
              <TabsContent key={status} value={status}>
                <div className="grid md:grid-cols-2 gap-4">
                  {guruPredictions
                    .filter(p => status === 'all' || p.status === status)
                    .map((prediction) => (
                      <PredictionCard 
                        key={prediction.id} 
                        prediction={prediction} 
                        showGuru={false}
                      />
                    ))}
                </div>
                {guruPredictions.filter(p => status === 'all' || p.status === status).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No predictions in this category</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Rank Timeline */}
        <div className="glass-card rounded-2xl p-6 mt-8">
          <h2 className="text-xl font-bold mb-6">Rank History</h2>
          <div className="relative pl-6 border-l-2 border-accent/30 space-y-6">
            {[
              { rank: currentRank, label: 'Current Position', date: 'Now' },
              { rank: guru.previousRank, label: 'Previous Week', date: '7 days ago' },
              { rank: 15, label: 'Starting Position', date: '6 months ago' },
            ].map((milestone, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-8 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-accent">#{milestone.rank}</span>
                  <div>
                    <p className="font-medium">{milestone.label}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuruProfile;
