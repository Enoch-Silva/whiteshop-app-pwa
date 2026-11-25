import { Plus } from 'lucide-react';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(28px+env(safe-area-inset-bottom))] z-20 mx-auto flex max-w-[640px] justify-end px-4">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'pointer-events-auto inline-flex h-14 items-center gap-2 rounded-full bg-primary pr-6 pl-5 text-base font-semibold text-primary-foreground shadow-fab transition-colors hover:bg-primary/90',
          focusRing,
        )}
      >
        <Plus className="size-5" strokeWidth={2.5} aria-hidden="true" />
        Adicionar
      </button>
    </div>
  );
}