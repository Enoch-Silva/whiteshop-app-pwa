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
      className="size-11 rounded-full bg-muted text-icon hover:bg-muted/80"
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
          className="gap-4 rounded-[24px] border-0 bg-card p-6 shadow-sheet sm:max-w-[440px]"
        >
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            {closeButton}
          </div>
          <DialogDescription className="sr-only">
            Dados do item da lista de compras.
          </DialogDescription>
          {form}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="gap-4 rounded-t-[24px] border-0 bg-card px-4 pt-2 pb-7 shadow-sheet">
        <div className="flex items-center justify-between">
          <DrawerTitle className="text-xl font-semibold">{title}</DrawerTitle>
          {closeButton}
        </div>
        <DrawerDescription className="sr-only">
          Dados do item da lista de compras.
        </DrawerDescription>
        {form}
      </DrawerContent>
    </Drawer>
  );
}