import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export function ScoreIndicator({ 
  score, 
  size = 'md', 
  showLabel = false,
  animated = true 
}: ScoreIndicatorProps) {
  const getScoreClass = (score: number) => {
    if (score >= 75) return 'score-excellent';
    if (score >= 50) return 'score-good';
    return 'score-poor';
  };

  const getBgClass = (score: number) => {
    if (score >= 75) return 'bg-success/20 border-success/30';
    if (score >= 50) return 'bg-warning/20 border-warning/30';
    return 'bg-destructive/20 border-destructive/30';
  };

  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-2xl font-bold',
    lg: 'text-4xl font-extrabold',
  };

  const containerSizes = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1.5',
    lg: 'px-4 py-2',
  };

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border font-mono',
        getBgClass(score),
        containerSizes[size],
        animated && 'animate-fade-in'
      )}
    >
      <span className={cn(sizeClasses[size], getScoreClass(score))}>
        {score}
      </span>
      {showLabel && (
        <span className="text-xs text-muted-foreground">/100</span>
      )}
    </div>
  );
}
