export const UNITS = ['un', 'kg', 'g', 'L', 'ml', 'pct', 'cx', 'dz'] as const;
export type Unit = (typeof UNITS)[number];

export const CATEGORIES = [
  'Mercearia',
  'Frescos',
  'Bebidas',
  'Talho e peixaria',
  'Limpeza',
  'Higiene',
  'Outros',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number; // quantidade pretendida (> 0, aceita decimais)
  purchased: number; // unidades já compradas (0..quantity)
  unit: Unit;
  category?: Category;
  note?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export type ItemInput = Pick<ShoppingItem, 'name' | 'quantity' | 'unit' | 'category' | 'note'>;
export type ItemStatus = 'pending' | 'partial' | 'done';
export type Filter = 'all' | 'pending' | 'done';