import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScoreIndicator } from './ScoreIndicator';
import { RankIndicator } from './RankIndicator';
import { RecentForm } from './RecentForm';
import { MiniSparkline } from './MiniSparkline';
import { Guru } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface LeaderboardRowProps {
  guru: Guru;
  rank: number;
  index: number;
}

export function LeaderboardRow({ guru, rank, index }: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        'group grid grid-cols-12 gap-4 items-center p-4 rounded-xl border border-transparent transition-all duration-300',
        'hover:bg-card hover:border-border hover:shadow-lg',
        rank <= 3 && 'bg-card/50',
        index % 2 === 0 ? 'bg-transparent' : 'bg-card/30'
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Rank */}
      <div className="col-span-2 lg:col-span-1">
        <RankIndicator rank={rank} change={guru.rankChange} />
      </div>

      {/* Guru */}
      <div className="col-span-4 lg:col-span-3 flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-border">
          <AvatarImage src={guru.avatar} alt={guru.name} />
          <AvatarFallback>{guru.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <Link 
            to={`/guru/${guru.id}`}
            className="font-semibold truncate hover:text-accent transition-colors block"
          >
            {guru.name}
          </Link>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>{(guru.subscribers / 1000).toFixed(0)}K subs</span>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="col-span-2 hidden lg:block">
        <ScoreIndicator score={guru.overallScore} size="md" />
      </div>

      {/* Accuracy */}
      <div className="col-span-2 hidden lg:flex items-center gap-2">
        <span className="font-mono text-lg font-semibold">{guru.accuracy}%</span>
        <MiniSparkline data={guru.scoreHistory} />
      </div>

      {/* Predictions */}
      <div className="col-span-2 hidden lg:block">
        <span className="font-mono text-sm">{guru.totalPredictions}</span>
      </div>

      {/* Recent Form */}
      <div className="col-span-2 hidden lg:block">
        <RecentForm form={guru.recentForm} />
      </div>

      {/* Mobile Score */}
      <div className="col-span-3 lg:hidden flex justify-end">
        <ScoreIndicator score={guru.overallScore} size="sm" />
      </div>

      {/* Actions */}
      <div className="col-span-3 lg:col-span-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <a href={guru.channelUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/guru/${guru.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}
