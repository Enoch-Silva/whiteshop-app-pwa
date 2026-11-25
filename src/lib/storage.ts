import type { ShoppingItem } from '@/types/shopping';

const ITEMS_KEY = 'whiteshop:v1:items';

export function loadItems(): ShoppingItem[] {
  try {
    const raw = localStorage.getItem(ITEMS_KEY);
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as ShoppingItem[]) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: ShoppingItem[]): void {
  try {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch {
    // armazenamento cheio ou bloqueado: a app continua a funcionar em memória
  }
}