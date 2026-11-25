import { createContext, type Dispatch } from 'react';
import type { ShoppingItem } from '@/types/shopping';
import type { ShoppingAction } from './shopping-reducer';

export interface ShoppingContextValue {
  items: ShoppingItem[];
  dispatch: Dispatch<ShoppingAction>;
}

export const ShoppingContext = createContext<ShoppingContextValue | null>(null);