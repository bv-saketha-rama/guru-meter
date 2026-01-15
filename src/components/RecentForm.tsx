import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RecentFormProps {
  form: ('correct' | 'incorrect' | 'partial' | 'pending')[];
}

export function RecentForm({ form }: RecentFormProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-success';
      case 'incorrect':
        return 'bg-destructive';
      case 'partial':
        return 'bg-warning';
      case 'pending':
        return 'bg-pending';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'correct':
        return 'Correct';
      case 'incorrect':
        return 'Incorrect';
      case 'partial':
        return 'Partially Correct';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex items-center gap-1">
      {form.map((status, index) => (
        <Tooltip key={index}>
          <TooltipTrigger>
            <div
              className={cn(
                'h-3 w-3 rounded-full transition-transform hover:scale-125',
                getStatusClass(status)
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{getStatusLabel(status)}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
