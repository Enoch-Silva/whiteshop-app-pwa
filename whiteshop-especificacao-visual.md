# whiteShop — Especificação visual para o agente da IDE

Este documento complementa o **Planejamento — whiteShop (React + Vite)**. Descreve, ao pormenor, como a interface deve ficar para ser igual ao design aprovado no canvas do whiteShop (ecrãs: Lista, Novo item, Lista vazia e Lista em tema escuro).

**Regra de precedência:** em tudo o que é visual (cores, medidas, textos, layout, estados), este documento prevalece sobre o Planejamento. A lógica (tipos, reducer, persistência, testes) continua a ser a do Planejamento, exceto onde a secção 2 diz o contrário.

Viewport de referência: **390 × 844 px** (telemóvel). No desktop o conteúdo fica centrado com largura máxima de 640 px.

---

## 1. Instrução para o agente

Aplicar esta especificação ao projeto whiteShop existente (ou durante a implementação, se ainda não estiver feito):

1. Ler o documento inteiro antes de alterar código.
2. Aplicar primeiro a secção 3 (tokens) e a secção 4 (`index.html`); depois substituir/criar os componentes da secção 9 exatamente como estão.
3. Usar **só** os tokens definidos aqui (classes como `bg-tabs`, `text-indicator`). Não usar cores Tailwind fixas (`blue-600`, `slate-500`…) nem inventar valores.
4. Respeitar as medidas em px indicadas; onde a classe tem valor arbitrário (`rounded-[16px]`), mantê-lo.
5. Textos da interface em português, exatamente como escritos aqui.
6. No fim, correr `npm run build` e `npm test`, abrir a app com `?demo=1` a 390 × 844 e percorrer a checklist da secção 11. Reportar qualquer item que não bata certo em vez de o "ajustar" por estimativa.

---

## 2. Alterações ao plano original

| # | O que muda | Porquê |
| --- | --- | --- |
| 1 | No tema escuro, `--primary` passa a **#2563EB** (era #3B82F6). Novo token `--indicator` (#2563EB claro / #3B82F6 escuro) para o círculo de estado e a barra de progresso. | Texto branco sobre #3B82F6 tem contraste 3,7:1 (abaixo de 4,5:1). Sobre #2563EB tem 5,2:1. |
| 2 | Novos tokens de cor da app (secção 3). | O design usa tons que o shadcn não tem por omissão (separadores, item parcial, trilho da barra…). |
| 3 | **Filtros** e **barra de progresso** feitos com markup próprio, não com `Tabs` e `Progress` do shadcn. | Controlo total do visual em pílula. |
| 4 | **Unidade** e **Categoria** usam `<select>` nativo estilizado (componente `NativeSelect`), não o `Select` do shadcn. | Igual ao design e abre o seletor nativo no telemóvel. |
| 5 | **Nota** é um `Input` de uma linha (não `Textarea`). | Igual ao design. |
| 6 | Quantidade no formulário: botões − / + à volta de um campo editável (aceita decimais, ex.: 1,5). Valor inicial **1**. | Igual ao design. |
| 7 | O estado do tema passa a viver na `App` e é passado ao cabeçalho e ao `Toaster`. | O toast acompanha o tema escolhido. |
| 8 | Com a lista vazia escondem-se: barra de progresso, filtros, menu ⋯ do cabeçalho e botão flutuante. | Igual ao design do ecrã "Lista vazia". |
| 9 | `StatusToggle`, `QuantityStepper` e `ShoppingItemRow` do plano são **substituídos** pelas versões da secção 9. | Ajustes de cor e medidas. |
| 10 | Comando de componentes shadcn: `npx shadcn@latest add button input label drawer dialog alert-dialog dropdown-menu sonner`. Se `tabs`, `progress`, `select` ou `textarea` já foram adicionados, podem ficar sem uso. | Consequência dos pontos 3–5. |

---

## 3. Tokens de tema (`src/index.css`)

Manter as linhas geradas pelo `shadcn init` (`@import`, `@custom-variant dark`, o `@theme inline` existente e `@layer base`). **Substituir** os blocos `:root` e `.dark` pelos de baixo e **acrescentar** o segundo `@theme inline` e o `@layer base` indicados.

```css
:root {
  --radius: 0.75rem;

  /* shadcn */
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
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #dbeafe;
  --accent-foreground: #1e3a8a;
  --destructive: #dc2626;
  --border: #e2e8f0;
  --input: #cbd5e1;
  --ring: #60a5fa;

  /* whiteShop */
  --soft-foreground: #475569;
  --icon: #334155;
  --label: #334155;
  --indicator: #2563eb;
  --indicator-text: #2563eb;
  --track: #dbeafe;
  --tabs: #e8f0fe;
  --tabs-foreground: #475569;
  --tabs-active: #ffffff;
  --tabs-active-foreground: #1e3a8a;
  --partial-border: #bfdbfe;
  --partial-muted: #475569;
  --empty-icon: #2563eb;
  --handle: #cbd5e1;
  --overlay: rgb(15 23 42 / 0.5);
  --fab-shadow: rgb(37 99 235 / 0.35);
  --sheet-shadow: rgb(15 23 42 / 0.18);
}

.dark {
  /* shadcn */
  --background: #0b1220;
  --foreground: #e2e8f0;
  --card: #111a2e;
  --card-foreground: #e2e8f0;
  --popover: #111a2e;
  --popover-foreground: #e2e8f0;
  --primary: #2563eb;
  --primary-foreground: #ffffff;
  --secondary: #1a2540;
  --secondary-foreground: #dbeafe;
  --muted: #1a2540;
  --muted-foreground: #94a3b8;
  --accent: #1e3a8a;
  --accent-foreground: #dbeafe;
  --destructive: #ef4444;
  --border: #1e293b;
  --input: #334155;
  --ring: #3b82f6;

  /* whiteShop */
  --soft-foreground: #94a3b8;
  --icon: #cbd5e1;
  --label: #cbd5e1;
  --indicator: #3b82f6;
  --indicator-text: #60a5fa;
  --track: #1e293b;
  --tabs: #16213a;
  --tabs-foreground: #94a3b8;
  --tabs-active: #1e3a8a;
  --tabs-active-foreground: #dbeafe;
  --partial-border: #2b4c9b;
  --partial-muted: #bfdbfe;
  --empty-icon: #dbeafe;
  --handle: #334155;
  --overlay: rgb(0 0 0 / 0.6);
  --fab-shadow: rgb(0 0 0 / 0.45);
  --sheet-shadow: rgb(0 0 0 / 0.5);
}

@theme inline {
  --font-sans: 'Poppins', ui-rounded, system-ui, sans-serif;

  --color-soft-foreground: var(--soft-foreground);
  --color-icon: var(--icon);
  --color-label: var(--label);
  --color-indicator: var(--indicator);
  --color-indicator-text: var(--indicator-text);
  --color-track: var(--track);
  --color-tabs: var(--tabs);
  --color-tabs-foreground: var(--tabs-foreground);
  --color-tabs-active: var(--tabs-active);
  --color-tabs-active-foreground: var(--tabs-active-foreground);
  --color-partial-border: var(--partial-border);
  --color-partial-muted: var(--partial-muted);
  --color-empty-icon: var(--empty-icon);
  --color-handle: var(--handle);
  --color-overlay: var(--overlay);

  --shadow-fab: 0 8px 24px var(--fab-shadow);
  --shadow-sheet: 0 -8px 32px var(--sheet-shadow);
}

@layer base {
  body {
    @apply bg-background font-sans text-foreground antialiased;
  }
  button,
  input,
  select {
    font: inherit;
  }
}
```

Nota: o ecrã do formulário e o da lista vazia só foram desenhados em tema claro; os valores escuros de `--input`, `--label`, `--handle`, `--muted` e `--empty-icon` seguem a mesma lógica do ecrã escuro desenhado.

---

## 4. `index.html`

Idioma, meta tags e um script que aplica o tema escuro antes do React arrancar (evita o "flash" do tema claro).

```html
<!doctype html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#f5f8ff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
    <title>whiteShop</title>
    <script>
      try {
        var t = localStorage.getItem('whiteshop:theme');
        if (t === 'dark' || (t !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 5. Tipografia e medidas gerais

- **Fonte:** Poppins 400, 500 e 600 via `@fontsource/poppins` (como no plano). Nenhuma outra fonte.
- **Escala usada:**

| Uso | Tamanho / peso | Classe |
| --- | --- | --- |
| Nome da app | 24 px / 600, `letter-spacing: -0.01em` | `text-2xl font-semibold tracking-[-0.01em]` |
| Título do formulário e da lista vazia | 20 px / 600 | `text-xl font-semibold` |
| Nome do item, botões, campos | 16 px / 500 (botões 600) | `text-base font-medium` / `font-semibold` |
| Texto de apoio da lista vazia | 15 px / 400, `line-height: 1.5` | `text-[15px] leading-normal` |
| Resumo, separadores, contadores, rótulos | 14 px | `text-sm` |
| Detalhes do item, aviso "adicionado" | 13 px | `text-[13px]` |
| Título "COMPRADOS (n)" | 12 px / 600, maiúsculas, `letter-spacing: 0.06em` | `text-xs font-semibold uppercase tracking-[0.06em]` |

- **Raios:** cartão do item 16 px; campos e logótipo 12 px; painel do formulário 24 px (só cantos de cima); botões, separadores, círculos e barra em pílula (`rounded-full`).
- **Alvos de toque:** todos os botões têm pelo menos 44 × 44 px.
- **Ícones:** `lucide-react`, traço 2 (exceções indicadas: − e + com 2,5; ✓ com 3–3,5; ícone grande da lista vazia com 1,75).
- **Sombras:** só no botão flutuante (`shadow-fab`), no botão da lista vazia (`shadow-fab`) e no painel do formulário (`shadow-sheet`).
- **Números:** contadores com `tabular-nums`.
- **Foco por teclado:** anel de 2 px com a cor `--ring` e afastamento de 2 px (classe partilhada `focusRing`, secção 9).

---

## 6. Ecrã principal (Lista)

### 6.1 Estrutura

```text
App (fundo bg-background, centrado, máx. 640 px, altura mínima 100dvh)
├── Cabeçalho fixo no topo (sticky), fundo bg-background
│   ├── Linha 1: logótipo + "whiteShop"            | botão tema · botão ⋯
│   ├── Linha 2: "X de Y itens comprados"          | "NN%"
│   ├── Barra de progresso
│   └── Filtros: Todos N · Pendentes N · Comprados N
├── Lista (itens por comprar → título "COMPRADOS (n)" → itens comprados)
└── Botão flutuante "Adicionar" (fixo, canto inferior direito)
```

### 6.2 Cabeçalho

- Padding: 24 px em cima (+ área segura do iPhone), 16 px nos lados, 12 px em baixo. Espaço de 16 px entre as linhas.
- **Logótipo:** quadrado 36 × 36 px, raio 12 px, fundo `primary`, ícone `ShoppingBasket` 20 px branco. Espaço de 10 px até ao texto "whiteShop".
- **Botões à direita:** dois botões redondos 44 × 44 px, fundo transparente, ícone 20 px cor `icon`, 4 px entre eles.
  - Tema: ícone `Moon` no tema claro ("Mudar para tema escuro"), `Sun` no escuro ("Mudar para tema claro").
  - Menu: ícone `Ellipsis` ("Opções da lista") → menu com "Limpar comprados" e "Recomeçar lista" (cada um com confirmação, como no plano). Escondido com a lista vazia.
- **Resumo:** linha com `justify-between`, 14 px. À esquerda "3 de 9 itens comprados" (cor `soft-foreground`); à direita "33%" (600, cor `indicator-text`). Com 1 item: "1 de 1 item comprado".
- **Barra:** 8 px de altura, pílula, trilho `track`, preenchimento `indicator`, largura = percentagem, transição de 200 ms. 8 px entre o resumo e a barra.
- **Filtros:** contentor em pílula com fundo `tabs`, padding 4 px, 4 px entre botões. Três botões de largura igual, 44 px de altura, 14 px.
  - Ativo: fundo `tabs-active`, texto `tabs-active-foreground`, peso 600.
  - Inativo: fundo transparente, texto `tabs-foreground`, peso 500.
  - Texto: "Todos 9", "Pendentes 6", "Comprados 3" (rótulo + espaço + contagem).

### 6.3 Lista

- Padding: 4 px em cima, 16 px nos lados, **112 px em baixo** (para o botão flutuante não tapar o último item).
- 8 px entre cartões.
- Ordem: itens por comprar (mais recentes primeiro), depois o título **"COMPRADOS (n)"** e os itens comprados (último comprado primeiro).
- Título "COMPRADOS (n)": 12 px, 600, maiúsculas, `tracking-[0.06em]`, cor `muted-foreground`, margem lateral 4 px, 8 px por baixo; 24 px por cima quando há itens por comprar acima, 16 px quando é o primeiro elemento.
- Filtro sem resultados: "Nada por aqui." centrado, 14 px, cor `soft-foreground`, 64 px abaixo dos filtros.

### 6.4 Cartão do item

Layout: linha com `align-items: center`, 8 px de espaço, padding 8 px, raio 16 px, borda 1 px.

```text
[ círculo 44×44 ] [ nome / detalhes (ocupa o resto) ] [ − 44 ] [ 0/2 ] [ + 44 ]
```

| Estado | Fundo / borda do cartão | Círculo (24 px, borda 2 px `indicator`) | Nome | Detalhes | Lado direito |
| --- | --- | --- | --- | --- | --- |
| Pendente (`purchased = 0`) | `card` / `border` | vazio | 16 px 500, `foreground` | 13 px, `muted-foreground` | stepper com botões fundo `secondary` |
| Parcial (`0 < purchased < quantity`) | `accent` / `partial-border` | preenchido em fatia (gradiente cónico) na proporção comprada | 16 px 500, `foreground` | 13 px, `partial-muted` | stepper com botões fundo `card` |
| Comprado (`purchased ≥ quantity`) | `card` / `border` | cheio a `indicator`, com ✓ branco 14 px | 16 px 500, `muted-foreground`, riscado | 13 px, `muted-foreground` | só o contador "4/4" (14 px, `muted-foreground`, padding lateral 12 px) |

- **Detalhes:** "unidade · categoria · nota" (só as partes que existem), ex.: "kg · Mercearia".
- **Stepper:** botões redondos 44 × 44 px, ícones `Minus` / `Plus` 16 px (traço 2,5) cor `secondary-foreground`; contador entre eles com largura mínima 44 px, 14 px 500, centrado; 4 px entre os três elementos. Botão no limite fica desativado com opacidade 40%.
- **Nome e detalhes** formam um único botão (área de toque) que abre o formulário em modo edição. Texto cortado com reticências se não couber.
- Transição de cor do cartão: 150 ms.

### 6.5 Botão flutuante "Adicionar"

- Fixo a 28 px do fundo (+ área segura) e 16 px da direita, dentro da coluna de 640 px no desktop.
- 56 px de altura, pílula, padding 20 px à esquerda e 24 px à direita, 8 px entre ícone e texto.
- Fundo `primary`, texto `primary-foreground` 16 px 600, ícone `Plus` 20 px (traço 2,5), sombra `shadow-fab`.
- Abre o formulário em modo "Novo item".

---

## 7. Formulário (Novo item / Editar item)

- **Telemóvel (< 640 px):** `Drawer` (painel inferior). **Desktop (≥ 640 px):** `Dialog` com o mesmo conteúdo, largura máxima 440 px, raio 24 px.
- **Fundo escurecido:** `bg-overlay` (substitui o `bg-black/50` do overlay em `components/ui/drawer.tsx` e `components/ui/dialog.tsx`).
- **Painel:** fundo `card`, cantos de cima 24 px, sem borda, padding 8 px em cima, 16 px nos lados, 28 px em baixo, 16 px entre blocos, sombra `shadow-sheet`.
- **Pega:** 40 × 4 px, pílula, cor `handle`, centrada (editar a pega gerada em `components/ui/drawer.tsx` para `mt-0 h-1 w-10 bg-handle`).
- **Cabeçalho:** título "Novo item" (ou "Editar item") 20 px 600 à esquerda; botão fechar 44 × 44 px redondo, fundo `muted`, ícone `X` 20 px cor `icon`, à direita.
- **Aviso "adicionado"** (só depois de adicionar, em modo novo): pílula alinhada à esquerda, fundo `accent`, texto `accent-foreground` 13 px 500, padding 6 × 12 px, ícone ✓ 14 px; texto "Tomate adicionado à lista".
- **Campos** (rótulo 14 px 500 cor `label`, 6 px até ao campo):
  - **Nome \*** — campo de texto, placeholder "Ex.: Leite meio-gordo", foco automático ao abrir, máx. 60 caracteres.
  - Linha com 16 px de espaço:
    - **Quantidade \*** — botão − (44 px, fundo `secondary`), campo 56 × 48 px centrado (16 px 500), botão + ; 8 px entre eles.
    - **Unidade** — seletor nativo que ocupa o resto da largura: un, kg, g, L, ml, pct, cx, dz.
  - **Categoria (opcional)** — seletor nativo: "Sem categoria", Mercearia, Frescos, Talho e peixaria, Bebidas, Limpeza, Higiene, Outros.
  - **Nota (opcional)** — campo de texto, placeholder "Ex.: maduros, marca preferida".
- **Estilo dos campos:** 48 px de altura, raio 12 px, borda 1 px `input`, fundo `card`, texto 16 px `foreground`, padding lateral 14 px (seletor com 40 px à direita para a seta `ChevronDown` 18 px cor `soft-foreground`). **Em foco:** borda 2 px `indicator` + anel de 4 px `accent`.
- **Botões** (4 px de margem extra por cima, 12 px entre eles, cada um com metade da largura, 48 px, pílula, 16 px 600):
  - Modo novo: "Concluir" (fundo `secondary`, texto `secondary-foreground`, fecha) e "Adicionar" (fundo `primary`, grava, limpa o formulário, mantém aberto com foco no Nome e mostra o aviso).
  - Modo edição: "Cancelar" e "Guardar" (grava e fecha), e por baixo um botão de largura total "Remover item" (48 px, pílula, sem fundo, texto `destructive` 16 px 600, ícone `Trash2` 18 px) que remove, fecha e mostra o toast "Item removido: Arroz" com "Desfazer" (5 s).
  - "Adicionar"/"Guardar" ficam desativados (opacidade 50%) enquanto o nome estiver vazio ou a quantidade não for > 0.

O modo edição não foi desenhado no canvas; segue o mesmo estilo do modo novo.

---

## 8. Lista vazia e tema escuro

### Lista vazia (nenhum item)

- Cabeçalho só com logótipo, "whiteShop" e botão de tema (sem menu ⋯, sem resumo, sem barra, sem filtros). Sem botão flutuante.
- Conteúdo centrado na vertical e na horizontal, padding lateral 32 px e 96 px em baixo, 16 px entre elementos:
  1. Círculo 104 × 104 px, fundo `accent`, ícone `ShoppingBasket` 48 px (traço 1,75) cor `empty-icon`.
  2. "A tua lista está vazia" — 20 px 600, 8 px de margem extra por cima.
  3. "Adiciona o que precisas de comprar e vai marcando à medida que pões no cesto." — 15 px, `line-height` 1,5, cor `soft-foreground`, largura máxima 280 px.
  4. Botão "Adicionar primeiro item" — 52 px de altura, pílula, padding 20/24 px, fundo `primary`, texto 16 px 600, ícone `Plus` 20 px, sombra `shadow-fab`, 8 px de margem extra por cima. Abre o formulário.

### Tema escuro

Mesmo layout e medidas; só mudam os tokens (secção 3). Pontos a confirmar visualmente: fundo #0B1220, cartões #111A2E, cartão parcial #1E3A8A com borda #2B4C9B e detalhes #BFDBFE, separador ativo #1E3A8A com texto #DBEAFE, percentagem #60A5FA, círculo e barra #3B82F6, botões preenchidos #2563EB, ícones do cabeçalho #CBD5E1.

---

## 9. Código de referência dos componentes

Estes ficheiros substituem as versões do plano com o mesmo nome. Componentes não listados aqui (`ListMenu`, reducer, storage, etc.) mantêm-se como no plano.

### `src/lib/ui.ts`

```ts
export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';
```

### `src/App.tsx`

```tsx
import { useState } from 'react';
import { AddButton } from '@/components/AddButton';
import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { ItemFormSheet } from '@/components/ItemFormSheet';
import { ShoppingList } from '@/components/ShoppingList';
import { Toaster } from '@/components/ui/sonner';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useTheme } from '@/hooks/useTheme';
import { ShoppingListProvider } from '@/state/ShoppingListProvider';
import type { Filter, ShoppingItem } from '@/types/shopping';

interface ShellProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Shell({ theme, onToggleTheme }: ShellProps) {
  const { items } = useShoppingList();
  const [filter, setFilter] = useState<Filter>('all');
  const [sheet, setSheet] = useState<{ open: boolean; item?: ShoppingItem }>({ open: false });
  const hasItems = items.length > 0;

  const openNew = () => setSheet({ open: true });
  const openEdit = (item: ShoppingItem) => setSheet({ open: true, item });

  return (
    <>
      <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col">
        <AppHeader
          hasItems={hasItems}
          theme={theme}
          onToggleTheme={onToggleTheme}
          filter={filter}
          onFilterChange={setFilter}
        />
        {hasItems ? (
          <ShoppingList filter={filter} onEdit={openEdit} />
        ) : (
          <EmptyState onAdd={openNew} />
        )}
      </div>
      {hasItems && <AddButton onClick={openNew} />}
      <ItemFormSheet
        open={sheet.open}
        item={sheet.item}
        onOpenChange={(open) => setSheet((current) => ({ ...current, open }))}
      />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ShoppingListProvider>
      <Shell theme={theme} onToggleTheme={toggleTheme} />
      <Toaster theme={theme} position="top-center" />
    </ShoppingListProvider>
  );
}
```

### `src/components/AppHeader.tsx`

```tsx
import { Moon, ShoppingBasket, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Filter } from '@/types/shopping';
import { FilterTabs } from './FilterTabs';
import { ListMenu } from './ListMenu';
import { ProgressSummary } from './ProgressSummary';

interface AppHeaderProps {
  hasItems: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function AppHeader({ hasItems, theme, onToggleTheme, filter, onFilterChange }: AppHeaderProps) {
  const dark = theme === 'dark';
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 bg-background px-4 pt-[calc(24px+env(safe-area-inset-top))] pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-[12px] bg-primary text-primary-foreground">
            <ShoppingBasket className="size-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.01em]">whiteShop</h1>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full text-icon"
            onClick={onToggleTheme}
            aria-label={dark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          {hasItems && <ListMenu />}
        </div>
      </div>
      {hasItems && (
        <>
          <ProgressSummary />
          <FilterTabs value={filter} onChange={onFilterChange} />
        </>
      )}
    </header>
  );
}
```

No `ListMenu`, o botão que abre o menu usa o mesmo estilo: `<Button variant="ghost" size="icon" className="size-11 rounded-full text-icon" aria-label="Opções da lista">` com `<Ellipsis className="size-5" />`.

### `src/components/ProgressSummary.tsx`

```tsx
import { useShoppingList } from '@/hooks/useShoppingList';
import { summarize } from '@/lib/items';

export function ProgressSummary() {
  const { items } = useShoppingList();
  const { total, done, percent } = summarize(items);
  const label = total === 1 ? 'item comprado' : 'itens comprados';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-soft-foreground">
          {done} de {total} {label}
        </span>
        <span className="font-semibold text-indicator-text">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Itens comprados"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 overflow-hidden rounded-full bg-track"
      >
        <div
          className="h-full rounded-full bg-indicator transition-[width] duration-200 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

### `src/components/FilterTabs.tsx`

```tsx
import { useShoppingList } from '@/hooks/useShoppingList';
import { isDone } from '@/lib/items';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';
import type { Filter } from '@/types/shopping';

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Comprados' },
];

interface FilterTabsProps {
  value: Filter;
  onChange: (filter: Filter) => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  const { items } = useShoppingList();
  const counts: Record<Filter, number> = {
    all: items.length,
    pending: items.filter((item) => !isDone(item)).length,
    done: items.filter(isDone).length,
  };

  return (
    <div role="group" aria-label="Filtrar lista" className="flex gap-1 rounded-full bg-tabs p-1">
      {TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              'h-11 flex-1 rounded-full text-sm transition-colors',
              focusRing,
              active
                ? 'bg-tabs-active font-semibold text-tabs-active-foreground'
                : 'font-medium text-tabs-foreground',
            )}
          >
            {tab.label} {counts[tab.value]}
          </button>
        );
      })}
    </div>
  );
}
```

### `src/components/ShoppingList.tsx`

```tsx
import { isDone, matchesFilter, sortItems } from '@/lib/items';
import { useShoppingList } from '@/hooks/useShoppingList';
import { cn } from '@/lib/utils';
import type { Filter, ShoppingItem } from '@/types/shopping';
import { ShoppingItemRow } from './ShoppingItemRow';

interface ShoppingListProps {
  filter: Filter;
  onEdit: (item: ShoppingItem) => void;
}

export function ShoppingList({ filter, onEdit }: ShoppingListProps) {
  const { items } = useShoppingList();
  const visible = sortItems(items).filter((item) => matchesFilter(item, filter));
  const open = visible.filter((item) => !isDone(item));
  const done = visible.filter(isDone);

  if (visible.length === 0) {
    return <p className="mt-16 text-center text-sm text-soft-foreground">Nada por aqui.</p>;
  }

  return (
    <div className="px-4 pt-1 pb-28">
      {open.length > 0 && (
        <ul className="flex flex-col gap-2">
          {open.map((item) => (
            <ShoppingItemRow key={item.id} item={item} onEdit={onEdit} />
          ))}
        </ul>
      )}
      {done.length > 0 && (
        <section aria-labelledby="comprados-titulo">
          <h2
            id="comprados-titulo"
            className={cn(
              'mx-1 mb-2 text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase',
              open.length > 0 ? 'mt-6' : 'mt-4',
            )}
          >
            Comprados ({done.length})
          </h2>
          <ul className="flex flex-col gap-2">
            {done.map((item) => (
              <ShoppingItemRow key={item.id} item={item} onEdit={onEdit} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
```

### `src/components/ShoppingItemRow.tsx`

```tsx
import { useShoppingList } from '@/hooks/useShoppingList';
import { formatQty, getStatus } from '@/lib/items';
import { focusRing } from '@/lib/ui';
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
  const partial = status === 'partial';
  const details = [item.unit, item.category, item.note].filter(Boolean).join(' · ');

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-[16px] border p-2 transition-colors duration-150',
        partial ? 'border-partial-border bg-accent' : 'border-border bg-card',
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
        className={cn('min-w-0 flex-1 rounded-[12px] py-1 text-left', focusRing)}
      >
        <span className="sr-only">Editar </span>
        <span
          className={cn(
            'block truncate text-base font-medium',
            done ? 'text-muted-foreground line-through' : 'text-foreground',
          )}
        >
          {item.name}
        </span>
        <span
          className={cn(
            'block truncate text-[13px]',
            partial ? 'text-partial-muted' : 'text-muted-foreground',
          )}
        >
          {details}
        </span>
      </button>

      {done ? (
        <span className="px-3 text-sm text-muted-foreground tabular-nums">
          {formatQty(item.purchased)}/{formatQty(item.quantity)}
        </span>
      ) : (
        <QuantityStepper
          purchased={item.purchased}
          quantity={item.quantity}
          onCard={partial}
          onIncrement={() => dispatch({ type: 'increment', id: item.id })}
          onDecrement={() => dispatch({ type: 'decrement', id: item.id })}
        />
      )}
    </li>
  );
}
```

### `src/components/StatusToggle.tsx`

```tsx
import { Check } from 'lucide-react';
import { focusRing } from '@/lib/ui';
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
      className={cn('grid size-11 shrink-0 place-items-center rounded-full', focusRing)}
    >
      <span
        className={cn(
          'grid size-6 place-items-center rounded-full border-2 border-indicator transition-colors',
          done && 'bg-indicator text-white',
        )}
        style={
          status === 'partial'
            ? {
                background: `conic-gradient(var(--indicator) ${Math.round(progress * 360)}deg, transparent 0deg)`,
              }
            : undefined
        }
      >
        {done && <Check className="size-3.5" strokeWidth={3.5} aria-hidden="true" />}
      </span>
    </button>
  );
}
```

### `src/components/QuantityStepper.tsx`

```tsx
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatQty } from '@/lib/items';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  purchased: number;
  quantity: number;
  onCard?: boolean; // true no cartão parcial: botões com fundo `card`
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({
  purchased,
  quantity,
  onCard = false,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const buttonClass = cn(
    'size-11 rounded-full text-secondary-foreground shadow-none disabled:opacity-40',
    onCard ? 'bg-card hover:bg-card/80' : 'bg-secondary hover:bg-secondary/80',
  );

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        variant="secondary"
        size="icon"
        className={buttonClass}
        onClick={onDecrement}
        disabled={purchased <= 0}
        aria-label="Menos uma unidade comprada"
      >
        <Minus className="size-4" strokeWidth={2.5} />
      </Button>
      <span
        className="min-w-11 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {formatQty(purchased)}/{formatQty(quantity)}
      </span>
      <Button
        variant="secondary"
        size="icon"
        className={buttonClass}
        onClick={onIncrement}
        disabled={purchased >= quantity}
        aria-label="Mais uma unidade comprada"
      >
        <Plus className="size-4" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
```

### `src/components/AddButton.tsx`

Usa `<button>` nativo (o `Button` do shadcn aplica `has-[>svg]:px-3`, que estragaria o padding).

```tsx
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
```

### `src/components/EmptyState.tsx`

```tsx
import { Plus, ShoppingBasket } from 'lucide-react';
import { focusRing } from '@/lib/ui';
import { cn } from '@/lib/utils';

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-24 text-center">
      <div className="grid size-[104px] place-items-center rounded-full bg-accent">
        <ShoppingBasket className="size-12 text-empty-icon" strokeWidth={1.75} aria-hidden="true" />
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
```

### `src/components/NativeSelect.tsx`

```tsx
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
```

### `src/hooks/useMediaQuery.ts`

```ts
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
```

### `src/components/ItemFormSheet.tsx`

```tsx
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
          <DialogDescription className="sr-only">Dados do item da lista de compras.</DialogDescription>
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
        <DrawerDescription className="sr-only">Dados do item da lista de compras.</DrawerDescription>
        {form}
      </DrawerContent>
    </Drawer>
  );
}
```

### `src/components/ItemForm.tsx`

```tsx
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
  CATEGORIES,
  UNITS,
  type Category,
  type ItemInput,
  type ShoppingItem,
  type Unit,
} from '@/types/shopping';
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
const actionClass = 'h-12 flex-1 rounded-full text-base font-semibold shadow-none disabled:opacity-50';

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

  const update = (changes: Partial<FormState>) => setForm((current) => ({ ...current, ...changes }));

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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="item-categoria" className={labelClass}>
          Categoria (opcional)
        </Label>
        <NativeSelect
          id="item-categoria"
          value={form.category}
          onChange={(e) => update({ category: e.target.value as Category | '' })}
        >
          <option value="">Sem categoria</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </NativeSelect>
      </div>

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
```

### Ajustes nos componentes gerados pelo shadcn

- `components/ui/drawer.tsx`: no `DrawerOverlay`, trocar `bg-black/50` por `bg-overlay`; na pega dentro do `DrawerContent`, trocar `mt-4 h-2 w-[100px] bg-muted` por `mt-0 h-1 w-10 bg-handle`.
- `components/ui/dialog.tsx`: no `DialogOverlay`, trocar `bg-black/50` por `bg-overlay`.
- `components/ui/sonner.tsx`: não alterar; o `theme` passado pela `App` sobrepõe-se ao valor por omissão.

---

## 10. Dados de demonstração

Para comparar com o design, a app deve poder arrancar com a mesma lista do canvas, **só em desenvolvimento** e sem gravar no `localStorage`.

`src/lib/demo.ts`:

```ts
import type { ShoppingItem } from '@/types/shopping';

type Seed = Pick<ShoppingItem, 'name' | 'quantity' | 'purchased' | 'unit' | 'category'>;

const SEEDS: Seed[] = [
  { name: 'Arroz', quantity: 2, purchased: 0, unit: 'kg', category: 'Mercearia' },
  { name: 'Leite', quantity: 6, purchased: 3, unit: 'L', category: 'Frescos' },
  { name: 'Detergente', quantity: 1, purchased: 0, unit: 'un', category: 'Limpeza' },
  { name: 'Água 1,5 L', quantity: 6, purchased: 2, unit: 'un', category: 'Bebidas' },
  { name: 'Sabonete', quantity: 4, purchased: 0, unit: 'un', category: 'Higiene' },
  { name: 'Tomate', quantity: 1, purchased: 0, unit: 'kg', category: 'Frescos' },
  { name: 'Pão', quantity: 4, purchased: 4, unit: 'un', category: 'Mercearia' },
  { name: 'Ovos', quantity: 12, purchased: 12, unit: 'un', category: 'Frescos' },
  { name: 'Banana', quantity: 6, purchased: 6, unit: 'un', category: 'Frescos' },
];

export const IS_DEMO =
  import.meta.env.DEV && new URLSearchParams(window.location.search).has('demo');

export function demoItems(): ShoppingItem[] {
  const now = Date.now();
  return SEEDS.map((seed, index) => {
    const time = new Date(now - index * 60_000).toISOString();
    return { ...seed, id: `demo-${index}`, createdAt: time, updatedAt: time };
  });
}
```

Alteração em `src/state/ShoppingListProvider.tsx`:

```tsx
import { IS_DEMO, demoItems } from '@/lib/demo';

// …
const [items, dispatch] = useReducer(shoppingReducer, undefined, IS_DEMO ? demoItems : loadItems);

useEffect(() => {
  if (!IS_DEMO) saveItems(items);
}, [items]);
```

Com `?demo=1` o ecrã deve mostrar exatamente: Arroz 0/2, Leite 3/6 (parcial), Detergente 0/1, Água 1,5 L 2/6 (parcial), Sabonete 0/4, Tomate 0/1, depois "COMPRADOS (3)" com Pão 4/4, Ovos 12/12 e Banana 6/6; resumo "3 de 9 itens comprados", "33%"; filtros "Todos 9", "Pendentes 6", "Comprados 3".

---

## 11. Checklist de conformidade

Verificar no navegador com as ferramentas de programador a **390 × 844 px**, primeiro com `?demo=1` e depois com a lista vazia.

**Ecrã principal (tema claro)**

- [ ] Fundo da página #F5F8FF; cartões brancos com borda #E2E8F0 e raio 16 px.
- [ ] Logótipo azul 36 px com cesto branco; "whiteShop" 24 px 600.
- [ ] Resumo "3 de 9 itens comprados" em #475569 e "33%" em #2563EB.
- [ ] Barra de 8 px com trilho #DBEAFE e preenchimento #2563EB a 33%.
- [ ] Filtros em pílula #E8F0FE; "Todos 9" ativo em branco com texto #1E3A8A.
- [ ] Leite e Água com fundo #DBEAFE, borda #BFDBFE, círculo preenchido em fatia e botões − / + brancos.
- [ ] Itens pendentes com botões − / + em #E8F0FE; o − desativado (opacidade 40%) quando o contador é 0.
- [ ] "COMPRADOS (3)" em maiúsculas 12 px; Pão, Ovos e Banana riscados, a cinzento, com círculo azul e ✓.
- [ ] Botão "Adicionar" de 56 px, azul, com sombra azulada, a 28 px do fundo e 16 px da direita.
- [ ] Tocar no círculo, em − / + e nos filtros funciona como no protótipo do canvas.

**Formulário**

- [ ] Abre por baixo, com fundo escurecido, pega 40 × 4 px e cantos de cima de 24 px.
- [ ] Nome em foco com borda azul de 2 px e anel #DBEAFE de 4 px.
- [ ] Quantidade com − / + redondos à volta de um campo de 56 × 48 px; Unidade ao lado a ocupar o resto.
- [ ] "Concluir" (#E8F0FE) e "Adicionar" (#2563EB) lado a lado, 48 px, em pílula.
- [ ] Depois de "Adicionar": formulário limpo, foco no Nome e aviso "… adicionado à lista".

**Lista vazia**

- [ ] Só logótipo, nome e botão de tema no cabeçalho; sem filtros, barra nem botão flutuante.
- [ ] Círculo #DBEAFE de 104 px com cesto azul de 48 px, título, texto e botão "Adicionar primeiro item".

**Tema escuro**

- [ ] Sem "flash" do tema claro ao recarregar com o tema escuro escolhido.
- [ ] Valores da secção 8 (fundo #0B1220, cartões #111A2E, parcial #1E3A8A, botões #2563EB, etc.).
- [ ] O toast de "Item removido" aparece também em tema escuro.

**Geral**

- [ ] Nenhuma cor fora dos tokens; nenhuma fonte além de Poppins.
- [ ] Todos os botões com pelo menos 44 × 44 px e foco visível ao navegar com Tab.
- [ ] `npm run build` e `npm test` sem erros.
