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
    let items = shoppingReducer(withItem('A', 1), {
      type: 'add',
      input: { name: 'B', quantity: 1, unit: 'un' },
    });
    const removed = items[1];
    items = shoppingReducer(items, { type: 'remove', id: removed.id });
    items = shoppingReducer(items, { type: 'restore', item: removed, index: 1 });
    expect(items.map((i) => i.name)).toEqual(['B', 'A']);
  });
});