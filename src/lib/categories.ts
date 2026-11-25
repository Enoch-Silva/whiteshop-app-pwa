import type { Category } from '@/types/shopping';

interface CategoryStyle {
  tint: string; // fundo suave + texto forte
  solid: string; // fundo forte + texto on-category (etiqueta selecionada)
}

export const CATEGORY_STYLE: Record<Category, CategoryStyle> = {
  Mercearia: {
    tint: 'bg-cat-mercearia text-cat-mercearia-foreground',
    solid: 'bg-cat-mercearia-foreground text-on-category',
  },
  Frescos: {
    tint: 'bg-cat-frescos text-cat-frescos-foreground',
    solid: 'bg-cat-frescos-foreground text-on-category',
  },
  Bebidas: {
    tint: 'bg-cat-bebidas text-cat-bebidas-foreground',
    solid: 'bg-cat-bebidas-foreground text-on-category',
  },
  'Talho e peixaria': {
    tint: 'bg-cat-talho text-cat-talho-foreground',
    solid: 'bg-cat-talho-foreground text-on-category',
  },
  Limpeza: {
    tint: 'bg-cat-limpeza text-cat-limpeza-foreground',
    solid: 'bg-cat-limpeza-foreground text-on-category',
  },
  Higiene: {
    tint: 'bg-cat-higiene text-cat-higiene-foreground',
    solid: 'bg-cat-higiene-foreground text-on-category',
  },
  Outros: {
    tint: 'bg-cat-outros text-cat-outros-foreground',
    solid: 'bg-cat-outros-foreground text-on-category',
  },
};