import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatQty } from '@/lib/items';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  purchased: number;
  quantity: number;
  onCard?: boolean; // true no cartão parcial: botões com fundo `card`
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({
  purchased,
  quantity,
  onCard = false,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const buttonClass = cn(
    'size-11 rounded-full text-secondary-foreground shadow-none disabled:opacity-40',
    onCard ? 'bg-card hover:bg-card/80' : 'bg-secondary hover:bg-secondary/80',
  );

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        variant="secondary"
        size="icon"
        className={buttonClass}
        onClick={onDecrement}
        disabled={purchased <= 0}
        aria-label="Menos uma unidade comprada"
      >
        <Minus className="size-4" strokeWidth={2.5} />
      </Button>
      <span className="min-w-11 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {formatQty(purchased)}/{formatQty(quantity)}
      </span>
      <Button
        variant="secondary"
        size="icon"
        className={buttonClass}
        onClick={onIncrement}
        disabled={purchased >= quantity}
        aria-label="Mais uma unidade comprada"
      >
        <Plus className="size-4" strokeWidth={2.5} />
      </Button>
    </div>
  );
}