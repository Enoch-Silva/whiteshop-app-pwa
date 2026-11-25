import { useRef, useState, type FormEvent } from 'react';
import { Check, Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useShoppingList } from '@/hooks/useShoppingList';
import { formatQty } from '@/lib/items';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import {
  UNITS,
  type Category,
  type ItemInput,
  type ShoppingItem,
  type Unit,
} from '@/types/shopping';
import { CategoryChips } from './CategoryChips';
import { NativeSelect } from './NativeSelect';

interface FormState {
  name: string;
  quantity: string;
  unit: Unit;
  category: Category | '';
  note: string;
}

const EMPTY_FORM: FormState = { name: '', quantity: '1', unit: 'un', category: '', note: '' };

const labelClass = 'text-sm leading-normal font-medium text-label';
const fieldClass =
  'h-12 rounded-[12px] border-input bg-card px-3.5 text-base shadow-none md:text-base dark:bg-card focus-visible:border-2 focus-visible:border-indicator focus-visible:ring-4 focus-visible:ring-accent';
const stepButtonClass = 'size-11 rounded-full text-secondary-foreground shadow-none';
const actionClass =
  'h-12 flex-1 rounded-full text-base font-semibold shadow-none disabled:opacity-50';

const parseQuantity = (value: string) => Number(value.replace(',', '.'));

function toForm(item?: ShoppingItem): FormState {
  if (!item) return EMPTY_FORM;
  return {
    name: item.name,
    quantity: formatQty(item.quantity),
    unit: item.unit,
    category: item.category ?? '',
    note: item.note ?? '',
  };
}

interface ItemFormProps {
  item?: ShoppingItem;
  onClose: () => void;
}

export function ItemForm({ item, onClose }: ItemFormProps) {
  const { items, dispatch } = useShoppingList();
  const [form, setForm] = useState<FormState>(() => toForm(item));
  const [lastAdded, setLastAdded] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const editing = Boolean(item);
  const quantity = parseQuantity(form.quantity);
  const name = form.name.trim();
  const valid = name.length > 0 && name.length <= 60 && Number.isFinite(quantity) && quantity > 0;

  const update = (changes: Partial<FormState>) =>
    setForm((current) => ({ ...current, ...changes }));

  function changeQuantity(delta: number) {
    const current = Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
    const next = current + delta;
    if (next > 0) update({ quantity: formatQty(next) });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!valid) return;
    const input: ItemInput = {
      name,
      quantity,
      unit: form.unit,
      category: form.category || undefined,
      note: form.note.trim() || undefined,
    };
    if (item) {
      dispatch({ type: 'update', id: item.id, changes: input });
      onClose();
      return;
    }
    dispatch({ type: 'add', input });
    setLastAdded(name);
    setForm(EMPTY_FORM);
    nameRef.current?.focus();
  }

  function handleRemove() {
    if (!item) return;
    const index = items.findIndex((i) => i.id === item.id);
    dispatch({ type: 'remove', id: item.id });
    onClose();
    toast(`Item removido: ${item.name}`, {
      duration: 5000,
      action: { label: 'Desfazer', onClick: () => dispatch({ type: 'restore', item, index }) },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {lastAdded && (
        <p
          aria-live="polite"
          className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent px-3 py-1.5 text-[13px] font-medium text-accent-foreground"
        >
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          {lastAdded} adicionado à lista
        </p>
      )}

      {/* Nome */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-nome" className={labelClass}>
          Nome *
        </Label>
        <Input
          id="item-nome"
          ref={nameRef}
          autoFocus
          maxLength={60}
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Ex.: Leite meio-gordo"
          className={fieldClass}
        />
      </div>

      {/* Quantidade + Unidade */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="item-quantidade" className={labelClass}>
            Quantidade *
          </Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className={stepButtonClass}
              onClick={() => changeQuantity(-1)}
              aria-label="Diminuir quantidade"
            >
              <Minus className="size-4" strokeWidth={2.5} />
            </Button>
            <Input
              id="item-quantidade"
              inputMode="decimal"
              value={form.quantity}
              onChange={(e) => update({ quantity: e.target.value })}
              className={cn(fieldClass, 'w-14 px-1 text-center font-medium tabular-nums')}
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className={stepButtonClass}
              onClick={() => changeQuantity(1)}
              aria-label="Aumentar quantidade"
            >
              <Plus className="size-4" strokeWidth={2.5} />
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Label htmlFor="item-unidade" className={labelClass}>
            Unidade
          </Label>
          <NativeSelect
            id="item-unidade"
            value={form.unit}
            onChange={(e) => update({ unit: e.target.value as Unit })}
          >
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1.5">
        <span id="item-categoria" className={labelClass}>
          Categoria (opcional)
        </span>
        <CategoryChips
          labelledBy="item-categoria"
          value={form.category}
          onChange={(category) => update({ category })}
        />
      </div>

      {/* Nota */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-nota" className={labelClass}>
          Nota (opcional)
        </Label>
        <Input
          id="item-nota"
          value={form.note}
          onChange={(e) => update({ note: e.target.value })}
          placeholder="Ex.: maduros, marca preferida"
          className={fieldClass}
        />
      </div>

      {/* Botões */}
      <div className="mt-1 flex gap-3">
        <Button type="button" variant="secondary" onClick={onClose} className={actionClass}>
          {editing ? 'Cancelar' : 'Concluir'}
        </Button>
        <Button type="submit" disabled={!valid} className={actionClass}>
          {editing ? 'Guardar' : 'Adicionar'}
        </Button>
      </div>

      {editing && (
        <button
          type="button"
          onClick={handleRemove}
          className={cn(
            'inline-flex h-12 items-center justify-center gap-2 rounded-full text-base font-semibold text-destructive transition-colors hover:bg-destructive/10',
            focusRing,
          )}
        >
          <Trash2 className="size-[18px]" aria-hidden="true" />
          Remover item
        </button>
      )}
    </form>
  );
}