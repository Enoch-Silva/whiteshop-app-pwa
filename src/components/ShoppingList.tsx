import { isDone, matchesFilter, sortItems } from '@/lib/items';
import { useShoppingList } from '@/hooks/useShoppingList';
import { cn } from '@/lib/utils';
import type { Filter, ShoppingItem } from '@/types/shopping';
import { ShoppingItemRow } from './ShoppingItemRow';

interface ShoppingListProps {
  filter: Filter;
  onEdit: (item: ShoppingItem) => void;
}

export function ShoppingList({ filter, onEdit }: ShoppingListProps) {
  const { items } = useShoppingList();
  const visible = sortItems(items).filter((item) => matchesFilter(item, filter));
  const open = visible.filter((item) => !isDone(item));
  const done = visible.filter(isDone);

  if (visible.length === 0) {
    return <p className="mt-16 text-center text-sm text-soft-foreground">Nada por aqui.</p>;
  }

  return (
    <div className="px-4 pt-1 pb-28">
      {open.length > 0 && (
        <ul className="flex flex-col gap-2">
          {open.map((item) => (
            <ShoppingItemRow key={item.id} item={item} onEdit={onEdit} />
          ))}
        </ul>
      )}
      {done.length > 0 && (
        <section aria-labelledby="comprados-titulo">
          <h2
            id="comprados-titulo"
            className={cn(
              'mx-1 mb-2 text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase',
              open.length > 0 ? 'mt-6' : 'mt-4',
            )}
          >
            Comprados ({done.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {done.map((item) => (
              <ShoppingItemRow key={item.id} item={item} onEdit={onEdit} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}