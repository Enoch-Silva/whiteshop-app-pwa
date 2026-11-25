import { Plus, ShoppingBasket } from 'lucide-react';
import { CATEGORY_STYLE } from '@/lib/categories';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/shopping';

const STICKERS: { category: Category; position: string }[] = [
  { category: 'Frescos', position: 'left-0 top-[18px] rotate-[-8deg]' },
  { category: 'Bebidas', position: 'right-[6px] top-1 rotate-[7deg]' },
  { category: 'Limpeza', position: 'left-3 bottom-2 rotate-[6deg]' },
  { category: 'Mercearia', position: 'right-0 bottom-6 rotate-[-6deg]' },
];

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24 text-center">
      {/* Ilustração */}
      <div aria-hidden="true" className="relative h-[168px] w-[260px]">
        <div className="absolute top-8 left-[78px] grid size-[104px] place-items-center rounded-full bg-accent">
          <ShoppingBasket className="size-12 text-empty-icon" strokeWidth={1.75} />
        </div>
        {STICKERS.map(({ category, position }) => (
          <span
            key={category}
            className={cn(
              'absolute rounded-full px-3 text-[13px] leading-[30px] font-semibold',
              CATEGORY_STYLE[category].tint,
              position,
            )}
          >
            {category}
          </span>
        ))}
      </div>

      <h2 className="mt-2 text-xl font-semibold">A tua lista está vazia</h2>
      <p className="max-w-[280px] text-[15px] leading-normal text-soft-foreground">
        Adiciona o que precisas de comprar e vai marcando à medida que pões no cesto.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className={cn(
          'mt-2 inline-flex h-[52px] items-center gap-2 rounded-full bg-primary pr-6 pl-5 text-base font-semibold text-primary-foreground shadow-fab transition-colors hover:bg-primary/90',
          focusRing,
        )}
      >
        <Plus className="size-5" strokeWidth={2.5} aria-hidden="true" />
        Adicionar primeiro item
      </button>
    </div>
  );
}