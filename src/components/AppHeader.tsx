import { Moon, ShoppingBasket, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Filter } from '@/types/shopping';
import { FilterTabs } from './FilterTabs';
import { ListMenu } from './ListMenu';
import { ProgressCard } from './ProgressCard';

interface AppHeaderProps {
  hasItems: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function AppHeader({
  hasItems,
  theme,
  onToggleTheme,
  filter,
  onFilterChange,
}: AppHeaderProps) {
  const dark = theme === 'dark';
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 bg-background px-4 pt-[calc(24px+env(safe-area-inset-top))] pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-[12px] bg-primary text-primary-foreground">
            <ShoppingBasket className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.01em]">whiteShop</h1>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full text-icon"
            onClick={onToggleTheme}
            aria-label={dark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          {hasItems && <ListMenu />}
        </div>
      </div>
      {hasItems && (
        <>
          <ProgressCard />
          <FilterTabs value={filter} onChange={onFilterChange} />
        </>
      )}
    </header>
  );
}