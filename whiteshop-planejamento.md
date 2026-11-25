# Planejamento — whiteShop (React + Vite)

24 nov 2026 · Enoque Silva

## Visão geral

O whiteShop é uma app web pessoal, feita em React + Vite, para gerir a lista de compras e registar quantas unidades de cada item já foram compradas.

- **Para quem:** uso pessoal, um único utilizador, sem login.
- **Onde:** mobile-first, para usar no telemóvel durante as compras; funciona também no computador.
- **Dados:** sem backend no MVP; tudo fica no `localStorage` do navegador. Consequência: a lista do telemóvel não aparece no computador (ver Evoluções futuras).
- **Execução:** este documento é exportado para Markdown e colado no agente de IA da IDE, que o implementa fase a fase (ver Roadmap de implementação).

## Requisitos funcionais (MVP)

O MVP cobre 11 requisitos; cada um tem um critério de aceitação que o agente usa para validar a fase correspondente.

| ID | Requisito | Critério de aceitação |
| --- | --- | --- |
| RF01 | Adicionar item | Nome obrigatório (1–60 caracteres, com trim), quantidade > 0 (aceita decimais), unidade obrigatória; categoria e nota opcionais. O item entra no topo dos pendentes. |
| RF02 | Registar unidades compradas | Botões − e + alteram `purchased` em 1, sempre entre 0 e a quantidade pretendida. |
| RF03 | Marcar como comprado num toque | Tocar no círculo do item põe `purchased = quantity`; tocar de novo volta a 0. |
| RF04 | Estado visual do item | Pendente (0 comprados), Parcial (alguns), Comprado (todos). Os comprados ficam riscados e descem para a secção “Comprados”. |
| RF05 | Editar item | Abre o mesmo formulário preenchido. Se a nova quantidade for menor que `purchased`, `purchased` é ajustado para baixo. |
| RF06 | Remover item | Remove de imediato e mostra um aviso com “Desfazer” durante 5 s, que repõe o item na mesma posição. |
| RF07 | Progresso geral | O cabeçalho mostra “X de Y itens comprados”, a percentagem e uma barra de progresso. |
| RF08 | Filtros | Separadores Todos / Pendentes / Comprados; “Pendentes” inclui os parciais. |
| RF09 | Ações da lista | “Limpar comprados” apaga os concluídos; “Recomeçar lista” põe `purchased = 0` em todos. Ambas pedem confirmação. |
| RF10 | Persistência | Recarregar a página mantém os itens e o progresso. |
| RF11 | Tema claro/escuro | Segue o sistema por omissão; um botão no cabeçalho alterna e a escolha fica guardada. |

Requisitos não funcionais: layout de 360 px até desktop, alvos de toque com pelo menos 44 px, tudo utilizável por teclado e com leitor de ecrã, e nenhum pedido de rede depois de a app carregar.

## Design — identidade visual

Visual limpo em tons de azul, tipografia Poppins e cantos bem arredondados; o estado de cada item lê-se pelo preenchimento do círculo, não por cores diferentes.

### Paleta (tokens shadcn/ui)

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--primary` | #2563EB | #3B82F6 | Botões principais, barra de progresso, círculo de estado |
| `--primary-foreground` | #FFFFFF | #FFFFFF | Texto e ícones sobre o azul |
| `--accent` | #DBEAFE | #1E3A8A | Fundo do item parcial, hover, separador ativo |
| `--background` | #F5F8FF | #0B1220 | Fundo da página |
| `--card` | #FFFFFF | #111A2E | Cartões dos itens, formulário |
| `--foreground` | #0F172A | #E2E8F0 | Texto principal |
| `--muted-foreground` | #64748B | #94A3B8 | Texto secundário, itens comprados |
| `--border` / `--input` | #E2E8F0 | #1E293B | Bordas e divisórias |
| `--ring` | #60A5FA | #3B82F6 | Contorno de foco |
| `--destructive` | #DC2626 | #EF4444 | Remover, limpar comprados |

### Tipografia

Poppins em toda a app (pesos 400, 500 e 600), carregada localmente com `@fontsource/poppins`; fallback `ui-rounded, system-ui, sans-serif`.

| Elemento | Tamanho / peso |
| --- | --- |
| Nome da app no cabeçalho | 24 px / 600 |
| Título de secção (“Comprados”) | 14 px / 600, maiúsculas pequenas |
| Nome do item | 16 px / 500 |
| Detalhes do item, contadores | 13–14 px / 400, números tabulares |

### Forma, espaço e movimento

- **Raios:** cartões 16 px, campos 12 px, botões e separadores em pílula (`rounded-full`).
- **Espaçamento:** escala de 4 px; margem lateral do ecrã 16 px; 8 px entre itens.
- **Sombras:** só no botão flutuante “Adicionar” e no formulário; o resto é plano, com bordas.
- **Ícones:** `lucide-react`, 20 px, traço 2.
- **Movimento:** transições de 150–200 ms; desligadas com `prefers-reduced-motion`.

## Design — ecrãs e componentes

A app tem um único ecrã (a lista) e um formulário que abre por cima para adicionar ou editar itens.

### Ecrã principal (telemóvel)

```text
┌──────────────────────────────────────┐
│ whiteShop                  [◑]  [⋯]  │
│ 7 de 12 itens comprados          58% │
│ █████████████████████░░░░░░░░░░░░░░░ │
├──────────────────────────────────────┤
│  (Todos)  (Pendentes)  (Comprados)   │
├──────────────────────────────────────┤
│ ○  Arroz                [−] 0/2 [+]  │
│    kg · Mercearia                    │
│ ◔  Leite                [−] 3/6 [+]  │
│    L · Frescos                       │
│ ○  Detergente           [−] 0/1 [+]  │
│    un · Limpeza                      │
│                                      │
│ COMPRADOS (7)                        │
│ ●  Pão (riscado)            4/4      │
│ ●  Ovos (riscado)         12/12      │
│                                      │
│                     ( + Adicionar )  │
└──────────────────────────────────────┘
```

Legenda: ○ pendente · ◔ parcial (círculo preenchido na proporção comprada) · ● comprado · [◑] alternar tema · [⋯] menu. No desktop o conteúdo fica centrado com largura máxima de 640 px.

### Formulário de item

```text
┌──────────────────────────────────────┐
│ Novo item                        [×] │
│                                      │
│ Nome *                               │
│ [ Ex.: Leite meio-gordo            ] │
│                                      │
│ Quantidade *         Unidade         │
│ [−]  [  6  ]  [+]    [ L       ▾ ]   │
│                                      │
│ Categoria (opcional)                 │
│ [ Frescos                        ▾ ] │
│                                      │
│ Nota (opcional)                      │
│ [ Marca preferida, se houver       ] │
│                                      │
│ [ Concluir ]           [ Adicionar ] │
└──────────────────────────────────────┘
```

- Abre como Drawer (painel inferior) abaixo de 640 px e como Dialog a partir de 640 px.
- “Adicionar” grava o item, limpa o formulário e mantém-no aberto com foco no Nome, para adicionar vários itens seguidos; “Concluir” fecha. Enter no Nome também submete.
- Em edição: título “Editar item”, botões “Cancelar” e “Guardar”, um botão “Remover item” no fundo, e o formulário fecha ao guardar ou remover.

### Estados do item

| Estado | Regra | Indicador | Nome | Lado direito |
| --- | --- | --- | --- | --- |
| Pendente | `purchased = 0` | Círculo vazio, borda azul | Normal | Stepper − / + |
| Parcial | `0 < purchased < quantity` | Círculo preenchido na proporção; cartão com fundo `--accent` | Normal | Stepper − / + |
| Comprado | `purchased ≥ quantity` | Círculo azul cheio com ✓ | Riscado, cor secundária | Só o contador (ex.: 4/4) |

### Interações

- **Toque no círculo:** alterna entre comprado e pendente (RF03).
- **− / +:** regista uma unidade a menos ou a mais (RF02); o botão fica desativado no limite.
- **Toque no nome do item:** abre o formulário em modo edição; “Remover item” fecha-o e mostra o aviso “Item removido: Arroz · Desfazer” (RF06).
- **⋯ do cabeçalho:** Limpar comprados / Recomeçar lista, cada um com confirmação (RF09).
- **Lista vazia:** ícone de cesto, “A tua lista está vazia” e botão “Adicionar primeiro item”. Filtro sem resultados: “Nada por aqui”.

## Arquitetura e stack

SPA estática: React + TypeScript com Vite, estado num `useReducer` partilhado por Context e gravado no `localStorage` a cada alteração. Sem backend nem bibliotecas de estado externas.

| Camada | Escolha | Porquê |
| --- | --- | --- |
| Build e linguagem | Vite (template `react-ts`) + TypeScript em modo `strict` | Arranque rápido, tipos no modelo de dados |
| Estilos | Tailwind CSS v4 (plugin `@tailwindcss/vite`) | Tokens de cor e espaços direto nas classes |
| Componentes | shadcn/ui: Button, Input, Label, Textarea, Select, Drawer, Dialog, AlertDialog, DropdownMenu, Progress, Tabs, Sonner | Acessíveis, editáveis no projeto, já usados noutros projetos teus |
| Ícones | `lucide-react` | O conjunto que o shadcn usa |
| Fonte | `@fontsource/poppins` (400, 500, 600) | Sem pedido ao Google Fonts; funciona offline |
| Estado | `useReducer` + Context | Poucas ações, fácil de testar |
| Persistência | `localStorage`, chave versionada `whiteshop:v1:items` | Simples; a versão na chave permite migrar o formato no futuro |
| Testes | Vitest + Testing Library (jsdom) | Mesmo config do Vite |
| Qualidade | ESLint do template + Prettier | Formato consistente no código gerado pelo agente |
| Publicação | Vercel ou Netlify (site estático) | Deploy a partir do repositório, HTTPS grátis |

### Fluxo de dados

```text
Arranque:  loadItems() ──▶ estado inicial do useReducer

Componente ──dispatch(ação)──▶ shoppingReducer ──▶ novo array de itens
    ▲                                               │
    └────────── re-render (useShoppingList) ◀────────┤
                                                    ▼
                               useEffect ──▶ saveItems() ──▶ localStorage
```

Os componentes nunca leem nem escrevem no `localStorage` diretamente: só o Provider o faz. Estados derivados (estado do item, progresso, filtros, ordenação) são calculados em `lib/items.ts` e nunca guardados.

## Modelo de dados e regras

Um único tipo guardado, `ShoppingItem`; o estado (pendente, parcial, comprado) é sempre derivado de `purchased` e `quantity`.

`src/types/shopping.ts`:

```ts
export const UNITS = ['un', 'kg', 'g', 'L', 'ml', 'pct', 'cx', 'dz'] as const;
export type Unit = (typeof UNITS)[number];

export const CATEGORIES = [
  'Mercearia',
  'Frescos',
  'Talho e peixaria',
  'Bebidas',
  'Limpeza',
  'Higiene',
  'Outros',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number; // quantidade pretendida (> 0, aceita decimais)
  purchased: number; // unidades já compradas (0..quantity)
  unit: Unit;
  category?: Category;
  note?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export type ItemInput = Pick<ShoppingItem, 'name' | 'quantity' | 'unit' | 'category' | 'note'>;
export type ItemStatus = 'pending' | 'partial' | 'done';
export type Filter = 'all' | 'pending' | 'done';
```

### Regras

1. `purchased` fica sempre entre 0 e `quantity` (função `clamp`), incluindo depois de editar a quantidade.
2. Estado: `done` se `purchased ≥ quantity`; `partial` se `purchased > 0`; senão `pending`.
3. Filtro “Pendentes” = `pending` + `partial`.
4. Ordenação: não comprados primeiro, mais recentes no topo (`createdAt`); comprados no fim, último comprado no topo (`updatedAt`).
5. O nome guarda-se com `trim()`; nome vazio ou quantidade ≤ 0 não passam na validação do formulário.
6. Quantidades mostram-se com `Intl.NumberFormat('pt-PT')`, até 2 casas decimais (ex.: 1,5 kg).

### Ações do reducer

| Ação | Dados | Efeito |
| --- | --- | --- |
| `add` | `input: ItemInput` | Cria o item com `id`, `purchased: 0` e datas; entra no início do array |
| `update` | `id`, `changes: Partial<ItemInput>` | Aplica as alterações e volta a limitar `purchased` |
| `remove` | `id` | Remove o item |
| `restore` | `item`, `index` | Repõe um item removido na posição original (Desfazer) |
| `increment` | `id` | `purchased + 1`, limitado |
| `decrement` | `id` | `purchased − 1`, limitado |
| `toggleDone` | `id` | Se comprado → 0; senão → `quantity` |
| `clearPurchased` | — | Remove todos os itens comprados |
| `resetProgress` | — | `purchased = 0` em todos os itens |

A preferência de tema guarda-se à parte, na chave `whiteshop:theme` (`'light'` ou `'dark'`).

## Estrutura de pastas e componentes

O código divide-se em tipos, lógica pura (`lib`), estado (`state` + `hooks`) e UI (`components`); só a UI importa componentes do shadcn.

```text
whiteshop/
├── index.html
├── vite.config.ts
├── components.json              # gerado pelo shadcn
└── src/
    ├── main.tsx                 # fontes Poppins + <App />
    ├── App.tsx                  # layout e estado do formulário/filtro
    ├── index.css                # Tailwind + tokens de tema
    ├── types/
    │   └── shopping.ts
    ├── lib/
    │   ├── utils.ts             # cn() do shadcn
    │   ├── id.ts                # createId() com fallback
    │   ├── storage.ts           # loadItems / saveItems
    │   └── items.ts             # clamp, getStatus, filtros, ordenação, resumo
    ├── state/
    │   ├── shopping-reducer.ts
    │   ├── shopping-reducer.test.ts
    │   ├── shopping-context.ts
    │   └── ShoppingListProvider.tsx
    ├── hooks/
    │   ├── useShoppingList.ts
    │   └── useTheme.ts
    └── components/
        ├── ui/                  # componentes shadcn (gerados)
        ├── AppHeader.tsx
        ├── ProgressSummary.tsx
        ├── ListMenu.tsx
        ├── FilterTabs.tsx
        ├── ShoppingList.tsx
        ├── ShoppingItemRow.tsx
        ├── StatusToggle.tsx
        ├── QuantityStepper.tsx
        ├── ItemFormSheet.tsx
        └── EmptyState.tsx
```

### Árvore de componentes

```text
App
└── ShoppingListProvider
    ├── AppHeader ── ProgressSummary, botão de tema, ListMenu
    ├── FilterTabs
    ├── ShoppingList ── ShoppingItemRow ── StatusToggle, QuantityStepper (toque no nome = editar)
    │               └── EmptyState
    ├── Botão flutuante “Adicionar”
    ├── ItemFormSheet (adicionar / editar)
    └── Toaster (sonner)
```

| Componente | Responsabilidade | shadcn |
| --- | --- | --- |
| `App` | Guarda o filtro ativo e o item em edição; compõe o layout (máx. 640 px, centrado) | — |
| `AppHeader` | Nome da app, `ProgressSummary`, botão de tema, `ListMenu`; fixo no topo | Button |
| `ProgressSummary` | “X de Y itens comprados”, percentagem e barra | Progress |
| `ListMenu` | Limpar comprados / Recomeçar lista, com confirmação | DropdownMenu, AlertDialog |
| `FilterTabs` | Todos / Pendentes / Comprados, com contagem em cada separador | Tabs |
| `ShoppingList` | Filtra e ordena; mostra “Comprados (n)” como separador; estado vazio | — |
| `ShoppingItemRow` | Um item: indicador, nome, detalhes, stepper ou contador; o nome é um botão que abre a edição | Button |
| `StatusToggle` | Círculo de estado clicável, com preenchimento proporcional | — |
| `QuantityStepper` | − / contador / +, com limites e `aria-live` | Button |
| `ItemFormSheet` | Formulário adicionar/editar/remover (com Desfazer); Drawer < 640 px, Dialog ≥ 640 px | Drawer, Dialog, Input, Label, Select, Textarea, Button |
| `EmptyState` | Lista vazia e filtro sem resultados | Button |

## Código base

Código de partida dos ficheiros centrais; os restantes componentes seguem a tabela da secção anterior e estes padrões. O ficheiro `src/types/shopping.ts` está na secção Modelo de dados.

### Lógica pura (`src/lib`)

```ts
// src/lib/id.ts
export function createId(): string {
  // randomUUID só existe em contexto seguro (HTTPS ou localhost);
  // ao testar no telemóvel pelo IP da rede local, usa o fallback.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
```

```ts
// src/lib/storage.ts
import type { ShoppingItem } from '@/types/shopping';

const ITEMS_KEY = 'whiteshop:v1:items';

export function loadItems(): ShoppingItem[] {
  try {
    const raw = localStorage.getItem(ITEMS_KEY);
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as ShoppingItem[]) : [];
  } catch {
    return [];
  }
}

export function saveItems(items: ShoppingItem[]): void {
  try {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch {
    // armazenamento cheio ou bloqueado: a app continua a funcionar em memória
  }
}
```

```ts
// src/lib/items.ts
import type { Filter, ItemStatus, ShoppingItem } from '@/types/shopping';

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function getStatus(item: ShoppingItem): ItemStatus {
  if (item.purchased >= item.quantity) return 'done';
  if (item.purchased > 0) return 'partial';
  return 'pending';
}

export const isDone = (item: ShoppingItem) => getStatus(item) === 'done';

export function matchesFilter(item: ShoppingItem, filter: Filter): boolean {
  if (filter === 'all') return true;
  return filter === 'done' ? isDone(item) : !isDone(item);
}

export function sortItems(items: ShoppingItem[]): ShoppingItem[] {
  return [...items].sort((a, b) => {
    if (isDone(a) !== isDone(b)) return isDone(a) ? 1 : -1;
    const key = isDone(a) ? 'updatedAt' : 'createdAt';
    return b[key].localeCompare(a[key]);
  });
}

export function summarize(items: ShoppingItem[]) {
  const total = items.length;
  const done = items.filter(isDone).length;
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

const qtyFormat = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 });
export const formatQty = (value: number) => qtyFormat.format(value);
```

### Reducer (`src/state/shopping-reducer.ts`)

```ts
import { createId } from '@/lib/id';
import { clamp, getStatus } from '@/lib/items';
import type { ItemInput, ShoppingItem } from '@/types/shopping';

export type ShoppingAction =
  | { type: 'add'; input: ItemInput }
  | { type: 'update'; id: string; changes: Partial<ItemInput> }
  | { type: 'remove'; id: string }
  | { type: 'restore'; item: ShoppingItem; index: number }
  | { type: 'increment'; id: string }
  | { type: 'decrement'; id: string }
  | { type: 'toggleDone'; id: string }
  | { type: 'clearPurchased' }
  | { type: 'resetProgress' };

const now = () => new Date().toISOString();

function patchItem(
  items: ShoppingItem[],
  id: string,
  changes: (item: ShoppingItem) => Partial<ShoppingItem>,
): ShoppingItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, ...changes(item), updatedAt: now() } : item,
  );
}

export function shoppingReducer(items: ShoppingItem[], action: ShoppingAction): ShoppingItem[] {
  switch (action.type) {
    case 'add': {
      const timestamp = now();
      const item: ShoppingItem = {
        ...action.input,
        name: action.input.name.trim(),
        id: createId(),
        purchased: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return [item, ...items];
    }
    case 'update': {
      const { changes } = action;
      return patchItem(items, action.id, (item) => ({
        ...changes,
        name: changes.name?.trim() ?? item.name,
        purchased: clamp(item.purchased, 0, changes.quantity ?? item.quantity),
      }));
    }
    case 'remove':
      return items.filter((item) => item.id !== action.id);
    case 'restore': {
      const next = [...items];
      next.splice(clamp(action.index, 0, next.length), 0, action.item);
      return next;
    }
    case 'increment':
      return patchItem(items, action.id, (item) => ({
        purchased: clamp(item.purchased + 1, 0, item.quantity),
      }));
    case 'decrement':
      return patchItem(items, action.id, (item) => ({
        purchased: clamp(item.purchased - 1, 0, item.quantity),
      }));
    case 'toggleDone':
      return patchItem(items, action.id, (item) => ({
        purchased: getStatus(item) === 'done' ? 0 : item.quantity,
      }));
    case 'clearPurchased':
      return items.filter((item) => getStatus(item) !== 'done');
    case 'resetProgress': {
      const timestamp = now();
      return items.map((item) => ({ ...item, purchased: 0, updatedAt: timestamp }));
    }
    default:
      return items;
  }
}
```

### Estado partilhado (Context + Provider + hook)

```ts
// src/state/shopping-context.ts
import { createContext, type Dispatch } from 'react';
import type { ShoppingItem } from '@/types/shopping';
import type { ShoppingAction } from './shopping-reducer';

export interface ShoppingContextValue {
  items: ShoppingItem[];
  dispatch: Dispatch<ShoppingAction>;
}

export const ShoppingContext = createContext<ShoppingContextValue | null>(null);
```

```tsx
// src/state/ShoppingListProvider.tsx
import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { loadItems, saveItems } from '@/lib/storage';
import { ShoppingContext } from './shopping-context';
import { shoppingReducer } from './shopping-reducer';

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(shoppingReducer, undefined, loadItems);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const value = useMemo(() => ({ items, dispatch }), [items]);
  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}
```

```ts
// src/hooks/useShoppingList.ts
import { useContext } from 'react';
import { ShoppingContext } from '@/state/shopping-context';

export function useShoppingList() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingList tem de ser usado dentro de <ShoppingListProvider>');
  }
  return context;
}
```

### Tema (`src/hooks/useTheme.ts`)

```ts
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const THEME_KEY = 'whiteshop:theme';

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // sem acesso ao armazenamento: segue o sistema
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignora: o tema só não fica guardado
    }
  }

  return { theme, toggleTheme };
}
```

### Componentes do item

```tsx
// src/components/StatusToggle.tsx
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ItemStatus } from '@/types/shopping';

interface StatusToggleProps {
  status: ItemStatus;
  progress: number; // 0..1
  label: string;
  onToggle: () => void;
}

export function StatusToggle({ status, progress, label, onToggle }: StatusToggleProps) {
  const done = status === 'done';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      aria-label={label}
      className="grid size-11 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-ring"
    >
      <span
        className={cn(
          'grid size-6 place-items-center rounded-full border-2 border-primary transition-colors',
          done && 'bg-primary text-primary-foreground',
        )}
        style={
          status === 'partial'
            ? { background: `conic-gradient(var(--primary) ${progress * 360}deg, transparent 0deg)` }
            : undefined
        }
      >
        {done && <Check className="size-4" strokeWidth={3} />}
      </span>
    </button>
  );
}
```

```tsx
// src/components/QuantityStepper.tsx
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatQty } from '@/lib/items';

interface QuantityStepperProps {
  purchased: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({
  purchased,
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        size="icon"
        variant="secondary"
        className="size-11 rounded-full"
        onClick={onDecrement}
        disabled={purchased <= 0}
        aria-label="Menos uma unidade comprada"
      >
        <Minus className="size-4" />
      </Button>
      <span className="min-w-12 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {formatQty(purchased)}/{formatQty(quantity)}
      </span>
      <Button
        size="icon"
        variant="secondary"
        className="size-11 rounded-full"
        onClick={onIncrement}
        disabled={purchased >= quantity}
        aria-label="Mais uma unidade comprada"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
```

```tsx
// src/components/ShoppingItemRow.tsx
import { useShoppingList } from '@/hooks/useShoppingList';
import { formatQty, getStatus } from '@/lib/items';
import { cn } from '@/lib/utils';
import type { ShoppingItem } from '@/types/shopping';
import { QuantityStepper } from './QuantityStepper';
import { StatusToggle } from './StatusToggle';

interface ShoppingItemRowProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
}

export function ShoppingItemRow({ item, onEdit }: ShoppingItemRowProps) {
  const { dispatch } = useShoppingList();
  const status = getStatus(item);
  const done = status === 'done';
  const details = [item.unit, item.category, item.note].filter(Boolean).join(' · ');

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-2xl border bg-card p-2 transition-colors',
        status === 'partial' && 'border-primary/30 bg-accent',
      )}
    >
      <StatusToggle
        status={status}
        progress={item.purchased / item.quantity}
        label={done ? `Desmarcar ${item.name}` : `Marcar ${item.name} como comprado`}
        onToggle={() => dispatch({ type: 'toggleDone', id: item.id })}
      />

      <button
        type="button"
        onClick={() => onEdit(item)}
        className="min-w-0 flex-1 rounded-lg py-1 text-left focus-visible:outline-2 focus-visible:outline-ring"
      >
        <span className="sr-only">Editar </span>
        <span className={cn('block truncate font-medium', done && 'text-muted-foreground line-through')}>
          {item.name}
        </span>
        <span className="block truncate text-[13px] text-muted-foreground">{details}</span>
      </button>

      {done ? (
        <span className="px-3 text-sm text-muted-foreground tabular-nums">
          {formatQty(item.purchased)}/{formatQty(item.quantity)}
        </span>
      ) : (
        <QuantityStepper
          purchased={item.purchased}
          quantity={item.quantity}
          onIncrement={() => dispatch({ type: 'increment', id: item.id })}
          onDecrement={() => dispatch({ type: 'decrement', id: item.id })}
        />
      )}
    </li>
  );
}
```

Remover com Desfazer, dentro do `ItemFormSheet` em modo edição:

```tsx
const { items, dispatch } = useShoppingList();

function handleRemove(item: ShoppingItem) {
  const index = items.findIndex((i) => i.id === item.id);
  dispatch({ type: 'remove', id: item.id });
  onClose();
  toast(`Item removido: ${item.name}`, {
    duration: 5000,
    action: { label: 'Desfazer', onClick: () => dispatch({ type: 'restore', item, index }) },
  });
}
```

### Entrada e tema visual

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```css
/* src/index.css — depois do `npx shadcn@latest init`: manter as linhas geradas
   (@import, @custom-variant, @theme inline, @layer base) e trocar só estes valores. */
:root {
  --radius: 0.75rem;
  --background: #f5f8ff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --popover: #ffffff;
  --popover-foreground: #0f172a;
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #e8f0fe;
  --secondary-foreground: #1e3a8a;
  --muted: #eef2f7;
  --muted-foreground: #64748b;
  --accent: #dbeafe;
  --accent-foreground: #1e3a8a;
  --destructive: #dc2626;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #60a5fa;
}

.dark {
  --background: #0b1220;
  --foreground: #e2e8f0;
  --card: #111a2e;
  --card-foreground: #e2e8f0;
  --popover: #111a2e;
  --popover-foreground: #e2e8f0;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #1a2540;
  --secondary-foreground: #dbeafe;
  --muted: #16213a;
  --muted-foreground: #94a3b8;
  --accent: #1e3a8a;
  --accent-foreground: #dbeafe;
  --destructive: #ef4444;
  --border: #1e293b;
  --input: #1e293b;
  --ring: #3b82f6;
}

@theme {
  --font-sans: 'Poppins', ui-rounded, system-ui, sans-serif;
}
```

### Testes do reducer (`src/state/shopping-reducer.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { shoppingReducer } from './shopping-reducer';

const withItem = (name: string, quantity: number) =>
  shoppingReducer([], { type: 'add', input: { name, quantity, unit: 'un' } });

describe('shoppingReducer', () => {
  it('mantém purchased entre 0 e a quantidade', () => {
    let items = withItem('Ovos', 2);
    const id = items[0].id;
    for (let i = 0; i < 5; i++) items = shoppingReducer(items, { type: 'increment', id });
    expect(items[0].purchased).toBe(2);
    items = shoppingReducer(items, { type: 'decrement', id });
    expect(items[0].purchased).toBe(1);
  });

  it('toggleDone alterna entre comprado e pendente', () => {
    let items = withItem('Pão', 4);
    const id = items[0].id;
    items = shoppingReducer(items, { type: 'toggleDone', id });
    expect(items[0].purchased).toBe(4);
    items = shoppingReducer(items, { type: 'toggleDone', id });
    expect(items[0].purchased).toBe(0);
  });

  it('update ajusta purchased quando a quantidade desce', () => {
    let items = withItem('Leite', 6);
    const id = items[0].id;
    items = shoppingReducer(items, { type: 'toggleDone', id });
    items = shoppingReducer(items, { type: 'update', id, changes: { quantity: 3 } });
    expect(items[0].purchased).toBe(3);
  });

  it('restore repõe o item na posição original', () => {
    let items = shoppingReducer(withItem('A', 1), { type: 'add', input: { name: 'B', quantity: 1, unit: 'un' } });
    const removed = items[1];
    items = shoppingReducer(items, { type: 'remove', id: removed.id });
    items = shoppingReducer(items, { type: 'restore', item: removed, index: 1 });
    expect(items.map((i) => i.name)).toEqual(['B', 'A']);
  });
});
```

## Roadmap de implementação

Seis fases, cada uma termina com a app a correr e testável; o agente pára no fim de cada fase para validação.

**Instrução para o agente da IDE:** implementar o whiteShop seguindo este documento, uma fase de cada vez e pela ordem abaixo. No fim de cada fase, correr `npm run build` e `npm test`, resumir o que mudou e esperar confirmação antes de avançar. Respeitar os nomes de ficheiros, tipos, ações e tokens definidos aqui; perante uma ambiguidade, perguntar em vez de inventar.

### Fase 0 — Setup

- [ ] Criar o projeto Vite `react-ts` e instalar as dependências (comandos abaixo).
- [ ] Configurar o alias `@` → `src` em `tsconfig.json`, `tsconfig.app.json` e `vite.config.ts`, seguindo o guia do shadcn para Vite.
- [ ] Correr `shadcn init` e adicionar os componentes listados na Arquitetura.
- [ ] Aplicar os tokens de `index.css` e a fonte Poppins (`main.tsx`), conforme o Código base.
- [ ] Adicionar o script `"test": "vitest"` e um `.prettierrc` com `{ "singleQuote": true, "trailingComma": "all", "printWidth": 100 }`.

```bash
npm create vite@latest whiteshop -- --template react-ts
cd whiteshop
npm install
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
npx shadcn@latest init
npx shadcn@latest add button input label textarea select drawer dialog alert-dialog dropdown-menu progress tabs sonner
npm install lucide-react @fontsource/poppins
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom prettier
```

```ts
// vite.config.ts
/// <reference types="vitest/config" />
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: { environment: 'jsdom' },
});
```

Critério: `npm run dev` mostra uma página com fundo azul-claro, texto em Poppins e um Button do shadcn a azul.

### Fase 1 — Modelo, estado e persistência

- [ ] `types/shopping.ts`, `lib/id.ts`, `lib/storage.ts`, `lib/items.ts`.
- [ ] `state/shopping-reducer.ts` + testes Vitest.
- [ ] `shopping-context.ts`, `ShoppingListProvider.tsx`, `hooks/useShoppingList.ts`; envolver a `App` no Provider.

Critério: `npm test` passa os 4 testes do reducer.

### Fase 2 — Adicionar e ver itens

- [ ] `AppHeader` (só o nome da app, por agora) e layout centrado com máximo de 640 px.
- [ ] `ItemFormSheet` em modo adicionar, com validação e “Adicionar” contínuo.
- [ ] `ShoppingList` + `ShoppingItemRow` (sem stepper ainda) + `EmptyState`.
- [ ] Botão flutuante “Adicionar”.

Critério: adicionar 3 itens, recarregar a página e continuam lá (RF01, RF10).

### Fase 3 — Acompanhar as compras

- [ ] `StatusToggle` e `QuantityStepper` ligados ao reducer.
- [ ] Ordenação com `sortItems` e secção “Comprados (n)”.
- [ ] `ProgressSummary` no cabeçalho.

Critério: − / + e o toque no círculo atualizam o item, a ordem e a barra de progresso (RF02, RF03, RF04, RF07).

### Fase 4 — Gerir a lista

- [ ] Modo edição do `ItemFormSheet`, incluindo “Remover item” com Desfazer.
- [ ] `FilterTabs` com contagens.
- [ ] `ListMenu` com “Limpar comprados” e “Recomeçar lista”, cada um com AlertDialog.
- [ ] `Toaster` do sonner montado na `App`.

Critério: RF05, RF06, RF08 e RF09 cumpridos.

### Fase 5 — Polimento e publicação

- [ ] `useTheme` + botão de tema no cabeçalho (RF11).
- [ ] Acessibilidade: foco visível, navegação por teclado, `aria-label` nos botões só com ícone.
- [ ] Rever o layout a 360 px, 768 px e 1280 px; respeitar `prefers-reduced-motion`.
- [ ] Publicar na Vercel ou na Netlify a partir do repositório.

Critério: Lighthouse com Acessibilidade ≥ 90 e a app abre pelo link público no telemóvel.

## Evoluções futuras

Fora do MVP, por ordem de utilidade provável; nenhuma obriga a reescrever o modelo de dados.

- **PWA:** instalar o whiteShop no ecrã inicial do telemóvel e usar offline (`vite-plugin-pwa`).
- **Sugestões ao escrever:** autocompletar o nome a partir de itens já comprados antes.
- **Várias listas:** por exemplo “Mensal” e “Festa”; passa a guardar `{ lists, activeListId }` numa chave `whiteshop:v2`, com migração a partir da v1.
- **Sincronização entre dispositivos:** login e base de dados (ex.: Supabase), mantendo o `localStorage` como cache offline.
- **Preços:** preço estimado por item e total previsto da lista.
