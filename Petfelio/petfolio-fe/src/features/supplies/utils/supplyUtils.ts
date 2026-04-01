import { CATEGORY_META } from '@/shared/constants/categories';

export const strip = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const parse = (s: string) => { 
  const p = s.split('-').map(Number); 
  return new Date(p[0], p[1] - 1, p[2]); 
};

export const dday = (target: string) => 
  Math.ceil((parse(target).getTime() - strip(new Date()).getTime()) / 86400000);

const CATS = CATEGORY_META;
export const catByName = (n: string) => CATS.find(c => c.name === n) ?? CATS[CATS.length - 1];
export const catById = (id: number) => CATS.find(c => c.id === id) ?? CATS[CATS.length - 1];
