import { useShoppingList } from '@/hooks/useShoppingList';
import { CATEGORY_STYLE } from '@/lib/categories';
import { formatQty, getStatus } from '@/lib/items';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import type { ShoppingItem } from '@/types/shopping';
import { QuantityStepper } from './QuantityStepper';
import { StatusToggle } from './StatusToggle';

interface ShoppingItemRowProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
}

export function ShoppingItemRow({ item, onEdit }: ShoppingItemRowProps) {
  const { dispatch } = useShoppingList();
  const status = getStatus(item);
  const done = status === 'done';
  const partial = status === 'partial';

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-[16px] border p-2 transition-colors duration-150',
        partial ? 'border-partial-border bg-accent' : 'border-border bg-card',
      )}
    >
      <StatusToggle
        status={status}
        progress={item.purchased / item.quantity}
        label={done ? `Desmarcar ${item.name}` : `Marcar ${item.name} como comprado`}
        onToggle={() => dispatch({ type: 'toggleDone', id: item.id })}
      />

      <button
        type="button"
        onClick={() => onEdit(item)}
        className={cn('min-w-0 flex-1 rounded-[12px] py-1 text-left', focusRing)}
      >
        <span className="sr-only">Editar </span>
        <span
          className={cn(
            'block truncate text-base font-medium',
            done ? 'text-muted-foreground line-through' : 'text-foreground',
          )}
        >
          {item.name}
        </span>
        <span className="mt-[3px] flex min-w-0 items-center gap-1.5">
          {item.category && (
            <span
              className={cn(
                'min-w-0 truncate rounded-full px-2 text-[11px] leading-5 font-semibold',
                CATEGORY_STYLE[item.category].tint,
              )}
            >
              {item.category}
            </span>
          )}
          <span
            className={cn(
              'shrink-0 text-[13px]',
              partial ? 'text-partial-muted' : 'text-muted-foreground',
            )}
          >
            {item.unit}
          </span>
        </span>
      </button>

      {done ? (
        <span className="px-3 text-sm text-muted-foreground tabular-nums">
          {formatQty(item.purchased)}/{formatQty(item.quantity)}
        </span>
      ) : (
        <QuantityStepper
          purchased={item.purchased}
          quantity={item.quantity}
          onCard={partial}
          onIncrement={() => dispatch({ type: 'increment', id: item.id })}
          onDecrement={() => dispatch({ type: 'decrement', id: item.id })}
        />
      )}
    </li>
  );
}