import { CATEGORY_STYLE } from '@/lib/categories';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { CATEGORIES, type Category } from '@/types/shopping';

interface CategoryChipsProps {
  value: Category | '';
  onChange: (value: Category | '') => void;
  labelledBy: string;
}

export function CategoryChips({ value, onChange, labelledBy }: CategoryChipsProps) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const selected = value === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected ? '' : category)}
            className={cn(
              'h-10 rounded-full px-4 text-sm font-semibold transition-colors',
              focusRing,
              selected ? CATEGORY_STYLE[category].solid : CATEGORY_STYLE[category].tint,
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}