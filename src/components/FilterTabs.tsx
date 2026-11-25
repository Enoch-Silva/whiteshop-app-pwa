import { useShoppingList } from '@/hooks/useShoppingList';
import { isDone } from '@/lib/items';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import type { Filter } from '@/types/shopping';

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Comprados' },
];

interface FilterTabsProps {
  value: Filter;
  onChange: (filter: Filter) => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  const { items } = useShoppingList();
  const counts: Record<Filter, number> = {
    all: items.length,
    pending: items.filter((item) => !isDone(item)).length,
    done: items.filter(isDone).length,
  };

  return (
    <div role="group" aria-label="Filtrar lista" className="flex gap-1 rounded-full bg-tabs p-1">
      {TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full text-sm transition-colors',
              focusRing,
              active
                ? 'bg-tabs-active font-semibold text-tabs-active-foreground'
                : 'font-medium text-tabs-foreground',
            )}
          >
            {tab.label}
            <span
              className={cn(
                'h-5 min-w-5 rounded-full px-1.5 text-center text-xs leading-5 font-semibold',
                active
                  ? 'bg-tab-badge-active text-tab-badge-active-foreground'
                  : 'bg-tab-badge text-tab-badge-foreground',
              )}
            >
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}