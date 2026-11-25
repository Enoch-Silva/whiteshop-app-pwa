import { useState } from 'react';
import { AddButton } from '@/components/AddButton';
import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { ItemFormSheet } from '@/components/ItemFormSheet';
import { ShoppingList } from '@/components/ShoppingList';
import { Toaster } from '@/components/ui/sonner';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useTheme } from '@/hooks/useTheme';
import { ShoppingListProvider } from '@/state/ShoppingListProvider';
import type { Filter, ShoppingItem } from '@/types/shopping';

interface ShellProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Shell({ theme, onToggleTheme }: ShellProps) {
  const { items } = useShoppingList();
  const [filter, setFilter] = useState<Filter>('all');
  const [sheet, setSheet] = useState<{ open: boolean; item?: ShoppingItem }>({ open: false });
  const hasItems = items.length > 0;

  const openNew = () => setSheet({ open: true });
  const openEdit = (item: ShoppingItem) => setSheet({ open: true, item });

  return (
    <>
      <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col">
        <AppHeader
          hasItems={hasItems}
          theme={theme}
          onToggleTheme={onToggleTheme}
          filter={filter}
          onFilterChange={setFilter}
        />
        {hasItems ? (
          <ShoppingList filter={filter} onEdit={openEdit} />
        ) : (
          <EmptyState onAdd={openNew} />
        )}
      </div>
      {hasItems && <AddButton onClick={openNew} />}
      <ItemFormSheet
        open={sheet.open}
        item={sheet.item}
        onOpenChange={(open) => setSheet((current) => ({ ...current, open }))}
      />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ShoppingListProvider>
      <Shell theme={theme} onToggleTheme={toggleTheme} />
      <Toaster theme={theme} position="top-center" />
    </ShoppingListProvider>
  );
}