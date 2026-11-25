import { useState } from 'react';
import { Ellipsis, RotateCcw, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useShoppingList } from '@/hooks/useShoppingList';

export function ListMenu() {
  const { dispatch } = useShoppingList();
  const [clearOpen, setClearOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-11 rounded-full text-icon"
              aria-label="Opções da lista"
            />
          }
        >
          <Ellipsis className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem variant="destructive" onClick={() => setClearOpen(true)}>
            <Trash2 className="size-4" />
            Limpar comprados
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setResetOpen(true)}>
            <RotateCcw className="size-4" />
            Recomeçar lista
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Limpar comprados */}
      <AlertDialog open={clearOpen} onOpenChange={setClearOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar comprados</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os itens marcados como comprados serão removidos da lista. Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                dispatch({ type: 'clearPurchased' });
                setClearOpen(false);
              }}
            >
              Limpar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Recomeçar lista */}
      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Recomeçar lista</AlertDialogTitle>
            <AlertDialogDescription>
              O progresso de todos os itens será reposto a zero. Os itens continuam na lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dispatch({ type: 'resetProgress' });
                setResetOpen(false);
              }}
            >
              Recomeçar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}