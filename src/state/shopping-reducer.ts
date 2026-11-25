import { createId } from '@/lib/id';
import { clamp, getStatus } from '@/lib/items';
import type { ItemInput, ShoppingItem } from '@/types/shopping';

export type ShoppingAction =
  | { type: 'add'; input: ItemInput }
  | { type: 'update'; id: string; changes: Partial<ItemInput> }
  | { type: 'remove'; id: string }
  | { type: 'restore'; item: ShoppingItem; index: number }
  | { type: 'increment'; id: string }
  | { type: 'decrement'; id: string }
  | { type: 'toggleDone'; id: string }
  | { type: 'clearPurchased' }
  | { type: 'resetProgress' };

const now = () => new Date().toISOString();

function patchItem(
  items: ShoppingItem[],
  id: string,
  changes: (item: ShoppingItem) => Partial<ShoppingItem>,
): ShoppingItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, ...changes(item), updatedAt: now() } : item,
  );
}

export function shoppingReducer(items: ShoppingItem[], action: ShoppingAction): ShoppingItem[] {
  switch (action.type) {
    case 'add': {
      const timestamp = now();
      const item: ShoppingItem = {
        ...action.input,
        name: action.input.name.trim(),
        id: createId(),
        purchased: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return [item, ...items];
    }
    case 'update': {
      const { changes } = action;
      return patchItem(items, action.id, (item) => ({
        ...changes,
        name: changes.name?.trim() ?? item.name,
        purchased: clamp(item.purchased, 0, changes.quantity ?? item.quantity),
      }));
    }
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'restore': {
      const next = [...items];
      next.splice(clamp(action.index, 0, next.length), 0, action.item);
      return next;
    }
    case 'increment':
      return patchItem(items, action.id, (item) => ({
        purchased: clamp(item.purchased + 1, 0, item.quantity),
      }));
    case 'decrement':
      return patchItem(items, action.id, (item) => ({
        purchased: clamp(item.purchased - 1, 0, item.quantity),
      }));
    case 'toggleDone':
      return patchItem(items, action.id, (item) => ({
        purchased: getStatus(item) === 'done' ? 0 : item.quantity,
      }));
    case 'clearPurchased':
      return items.filter((item) => getStatus(item) !== 'done');
    case 'resetProgress': {
      const timestamp = now();
      return items.map((item) => ({ ...item, purchased: 0, updatedAt: timestamp }));
    }
    default:
      return items;
  }
}