import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NativeSelect({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'h-12 w-full appearance-none rounded-[12px] border border-input bg-card pr-10 pl-3.5 text-base text-foreground outline-none',
          'focus-visible:border-2 focus-visible:border-indicator focus-visible:ring-4 focus-visible:ring-accent',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3.5 size-[18px] -translate-y-1/2 text-soft-foreground"
        aria-hidden="true"
      />
    </div>
  );
}