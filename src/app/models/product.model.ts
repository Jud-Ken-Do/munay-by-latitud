export interface Product {
  id: string;
  name: string;
  nameEs: string;
  cat: string;
  price: number;
  was: number | null;
  stone: string;
  stoneDot: string;
  tone: string;
  label: string | null;
  labelTone: string;
  rating: number;
  reviews: number;
  metal: string;
  swatches: { color: string; image: string }[];
  image: string;
}

export interface Category {
  id: string;
  es: string;
  en: string;
  count: number;
  tone: string;
}

export interface Stone {
  es: string;
  en: string;
  from: string;
  meaning: string;
  color: string;
}
