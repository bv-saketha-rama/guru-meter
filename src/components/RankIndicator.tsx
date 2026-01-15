import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankIndicatorProps {
  rank: number;
  change: number;
}

export function RankIndicator({ rank, change }: RankIndicatorProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (rank === 2) return 'bg-gray-300/20 text-gray-300 border-gray-300/30';
    if (rank === 3) return 'bg-amber-600/20 text-amber-500 border-amber-600/30';
    return 'bg-secondary text-foreground border-border';
  };

  const getChangeIcon = () => {
    if (change > 0) {
      return <TrendingUp className="h-3 w-3 text-success" />;
    }
    if (change < 0) {
      return <TrendingDown className="h-3 w-3 text-destructive" />;
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-lg font-bold',
          getRankBadge(rank)
        )}
      >
        #{rank}
      </div>
      <div className={cn(
        'flex items-center gap-0.5 text-xs font-medium',
        change > 0 && 'text-success',
        change < 0 && 'text-destructive',
        change === 0 && 'text-muted-foreground'
      )}>
        {getChangeIcon()}
        {change !== 0 && <span>{Math.abs(change)}</span>}
      </div>
    </div>
  );
}
