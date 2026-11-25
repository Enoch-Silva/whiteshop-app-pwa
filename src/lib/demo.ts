import type { ShoppingItem } from '@/types/shopping';

type Seed = Pick<ShoppingItem, 'name' | 'quantity' | 'purchased' | 'unit' | 'category'>;

const SEEDS: Seed[] = [
  { name: 'Arroz', quantity: 2, purchased: 0, unit: 'kg', category: 'Mercearia' },
  { name: 'Leite', quantity: 6, purchased: 3, unit: 'L', category: 'Frescos' },
  { name: 'Detergente', quantity: 1, purchased: 0, unit: 'un', category: 'Limpeza' },
  { name: 'Água 1,5 L', quantity: 6, purchased: 2, unit: 'un', category: 'Bebidas' },
  { name: 'Sabonete', quantity: 4, purchased: 0, unit: 'un', category: 'Higiene' },
  { name: 'Tomate', quantity: 1, purchased: 0, unit: 'kg', category: 'Frescos' },
  { name: 'Pão', quantity: 4, purchased: 4, unit: 'un', category: 'Mercearia' },
  { name: 'Ovos', quantity: 12, purchased: 12, unit: 'un', category: 'Frescos' },
  { name: 'Banana', quantity: 6, purchased: 6, unit: 'un', category: 'Frescos' },
];

export const IS_DEMO =
  import.meta.env.DEV && new URLSearchParams(window.location.search).has('demo');

export function demoItems(): ShoppingItem[] {
  const now = Date.now();
  return SEEDS.map((seed, index) => {
    const time = new Date(now - index * 60_000).toISOString();
    return { ...seed, id: `demo-${index}`, createdAt: time, updatedAt: time };
  });
}