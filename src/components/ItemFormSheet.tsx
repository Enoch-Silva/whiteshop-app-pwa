import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { ShoppingItem } from '@/types/shopping';
import { ItemForm } from './ItemForm';

interface ItemFormSheetProps {
  open: boolean;
  item?: ShoppingItem;
  onOpenChange: (open: boolean) => void;
}

export function ItemFormSheet({ open, item, onOpenChange }: ItemFormSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const title = item ? 'Editar item' : 'Novo item';
  const close = () => onOpenChange(false);

  const closeButton = (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={close}
      aria-label="Fechar"
      className="size-11 shrink-0 rounded-full bg-muted text-icon hover:bg-muted/80"
    >
      <X className="size-5" />
    </Button>
  );

  const form = <ItemForm key={item?.id ?? 'new'} item={item} onClose={close} />;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="gap-0 rounded-[24px] border-0 bg-card p-0 shadow-sheet sm:max-w-[440px]"
        >
          {/* Fixed header */}
          <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            {closeButton}
          </div>
          <DialogDescription className="sr-only">Dados do item da lista de compras.</DialogDescription>
          {/* Scrollable form */}
          <div className="max-h-[80dvh] overflow-y-auto overscroll-contain px-6 pb-6">
            {form}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/*
        rounded-t-[24px] + border-0 + bg-card are applied to the outer popup via className.
        The inner DrawerPrimitive.Content is now overflow-x-hidden (not overflow-hidden),
        so the child scroll div works properly.
      */}
      <DrawerContent className="rounded-t-[24px] border-0 bg-card shadow-sheet">
        {/* Fixed header — stays on screen even when keyboard is open */}
        <div className="flex shrink-0 items-center justify-between px-4 pb-2">
          <DrawerTitle className="text-xl font-semibold">{title}</DrawerTitle>
          {closeButton}
        </div>
        <DrawerDescription className="sr-only">Dados do item da lista de compras.</DrawerDescription>
        {/* Scrollable form — fills remaining height; scrolls with keyboard open */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          {form}
        </div>
      </DrawerContent>
    </Drawer>
  );
}