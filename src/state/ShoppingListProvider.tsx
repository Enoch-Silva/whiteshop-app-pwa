import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { IS_DEMO, demoItems } from '@/lib/demo';
import { loadItems, saveItems } from '@/lib/storage';
import { ShoppingContext } from './shopping-context';
import { shoppingReducer } from './shopping-reducer';

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(shoppingReducer, undefined, IS_DEMO ? demoItems : loadItems);

  useEffect(() => {
    if (!IS_DEMO) saveItems(items);
  }, [items]);

  const value = useMemo(() => ({ items, dispatch }), [items]);
  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}