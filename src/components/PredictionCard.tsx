import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Flame, Snowflake, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Prediction } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  prediction: Prediction;
  showGuru?: boolean;
}

export function PredictionCard({ prediction, showGuru = true }: PredictionCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'correct':
        return <Badge className="bg-success/20 text-success border-success/30 hover:bg-success/30">Correct</Badge>;
      case 'incorrect':
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30">Incorrect</Badge>;
      case 'partial':
        return <Badge className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30">Partial</Badge>;
      case 'pending':
        return <Badge className="bg-pending/20 text-pending border-pending/30 hover:bg-pending/30">Pending</Badge>;
      default:
        return null;
    }
  };

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <Flame className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <Thermometer className="h-4 w-4 text-warning" />;
      case 'low':
        return <Snowflake className="h-4 w-4 text-accent" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="glass-card hover:border-accent/50 transition-all duration-300 overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {showGuru && (
              <Link 
                to={`/guru/${prediction.guruId}`}
                className="flex items-center gap-2 mb-2 hover:text-accent transition-colors"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={prediction.guruAvatar} />
                  <AvatarFallback>{prediction.guruName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{prediction.guruName}</span>
              </Link>
            )}
            <h3 className="font-semibold text-lg leading-tight">{prediction.title}</h3>
          </div>
          {getStatusBadge(prediction.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thumbnail */}
        {prediction.videoThumbnail && (
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <img
              src={prediction.videoThumbnail}
              alt={prediction.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {prediction.videoUrl && (
              <a
                href={prediction.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-8 w-8 text-accent" />
              </a>
            )}
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Asset:</span>
            <p className="font-medium">{prediction.asset}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Target:</span>
            <p className="font-medium">{prediction.target}</p>
          </div>
          {prediction.actual && (
            <div>
              <span className="text-muted-foreground">Actual:</span>
              <p className={cn(
                'font-medium',
                prediction.status === 'correct' && 'text-success',
                prediction.status === 'incorrect' && 'text-destructive'
              )}>
                {prediction.actual}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Confidence:</span>
            <div className="flex items-center gap-1">
              {getConfidenceIcon(prediction.confidence)}
              <span className="font-medium capitalize">{prediction.confidence}</span>
            </div>
          </div>
        </div>

        {/* Reasoning */}
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground line-clamp-2">{prediction.reasoning}</p>
        </div>

        {/* Scores */}
        {prediction.scores && (
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-5 gap-2 text-center">
              {[
                { label: 'Accuracy', value: prediction.scores.accuracy },
                { label: 'Confidence', value: prediction.scores.confidence },
                { label: 'Timeframe', value: prediction.scores.timeframe },
                { label: 'Reasoning', value: prediction.scores.reasoning },
                { label: 'Total', value: prediction.scores.total, highlight: true },
              ].map((score) => (
                <div key={score.label}>
                  <p className={cn(
                    'font-mono text-sm font-bold',
                    score.highlight && 'text-accent'
                  )}>
                    {score.value.toFixed(1)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{score.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Deadline: {formatDate(prediction.timeframeEnd)}</span>
          </div>
          <span>Created: {formatDate(prediction.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
