import { Check } from 'lucide-react';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import type { ItemStatus } from '@/types/shopping';

interface StatusToggleProps {
  status: ItemStatus;
  progress: number; // 0..1
  label: string;
  onToggle: () => void;
}

export function StatusToggle({ status, progress, label, onToggle }: StatusToggleProps) {
  const done = status === 'done';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      aria-label={label}
      className={cn('grid size-11 shrink-0 place-items-center rounded-full', focusRing)}
    >
      <span
        className={cn(
          'grid size-6 place-items-center rounded-full border-2 border-indicator transition-colors',
          done && 'bg-indicator text-white',
        )}
        style={
          status === 'partial'
            ? {
                background: `conic-gradient(var(--indicator) ${Math.round(progress * 360)}deg, transparent 0deg)`,
              }
            : undefined
        }
      >
        {done && <Check className="size-3.5" strokeWidth={3.5} aria-hidden="true" />}
      </span>
    </button>
  );
}