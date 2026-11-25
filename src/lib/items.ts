import type { Filter, ItemStatus, ShoppingItem } from '@/types/shopping';

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function getStatus(item: ShoppingItem): ItemStatus {
  if (item.purchased >= item.quantity) return 'done';
  if (item.purchased > 0) return 'partial';
  return 'pending';
}

export const isDone = (item: ShoppingItem) => getStatus(item) === 'done';

export function matchesFilter(item: ShoppingItem, filter: Filter): boolean {
  if (filter === 'all') return true;
  return filter === 'done' ? isDone(item) : !isDone(item);
}

export function sortItems(items: ShoppingItem[]): ShoppingItem[] {
  return [...items].sort((a, b) => {
    if (isDone(a) !== isDone(b)) return isDone(a) ? 1 : -1;
    const key = isDone(a) ? 'updatedAt' : 'createdAt';
    return b[key].localeCompare(a[key]);
  });
}

export function summarize(items: ShoppingItem[]) {
  const total = items.length;
  const done = items.filter(isDone).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

const qtyFormat = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 });
export const formatQty = (value: number) => qtyFormat.format(value);