import { useShoppingList } from '@/hooks/useShoppingList';
import { summarize } from '@/lib/items';

export function ProgressCard() {
  const { items } = useShoppingList();
  const { total, done, percent } = summarize(items);
  const label = total === 1 ? 'item comprado' : 'itens comprados';

  return (
    <section
      aria-label="Progresso da lista"
      className="relative flex flex-col gap-2.5 overflow-hidden rounded-[20px] bg-progress-card p-4 text-on-progress"
    >
      {/* Círculo decorativo */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -bottom-16 size-[150px] rounded-full bg-progress-glow"
      />

      {/* Linha 1 */}
      <div className="relative flex items-center justify-between">
        <span className="text-[13px] font-medium">Progresso da compra</span>
        <div aria-hidden="true" className="flex gap-1">
          <span className="size-2 rounded-full bg-dot-amber" />
          <span className="size-2 rounded-full bg-dot-green" />
          <span className="size-2 rounded-full bg-dot-pink" />
        </div>
      </div>

      {/* Linha 2 */}
      <div className="relative flex items-baseline justify-between">
        <span className="text-[15px] font-medium">
          {done} de {total} {label}
        </span>
        <span className="text-[28px] leading-none font-semibold">{percent}%</span>
      </div>

      {/* Barra */}
      <div
        role="progressbar"
        aria-label="Itens comprados"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="relative h-2 overflow-hidden rounded-full bg-progress-track"
      >
        <div
          className="h-full rounded-full bg-on-progress transition-[width] duration-200 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}