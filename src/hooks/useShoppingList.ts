import { useContext } from 'react';
import { ShoppingContext } from '@/state/shopping-context';

export function useShoppingList() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingList tem de ser usado dentro de <ShoppingListProvider>');
  }
  return context;
}