export type SupplierCategory = 'banquetes' | 'alcohol' | 'musica' | 'dj' | 'grupos' | 'animador';

export const SUPPLIER_CATEGORIES: { key: SupplierCategory; label: string }[] = [
  { key: 'banquetes', label: 'Banquetes' },
  { key: 'alcohol',   label: 'Alcohol' },
  { key: 'musica',    label: 'Música' },
  { key: 'dj',        label: 'DJ' },
  { key: 'grupos',    label: 'Grupos en vivo' },
  { key: 'animador',  label: 'Animación' },
];

export interface Supplier {
  id?: string;
  name: string;
  category: SupplierCategory;
  description: string;
  priceFrom: number;
  priceTo: number | null;
  imageUrl: string;
  phone: string;
  order: number;
  active: boolean;
}
