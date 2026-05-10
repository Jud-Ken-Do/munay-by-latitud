import { Injectable, signal } from '@angular/core';
import { Product, Category, Stone } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly products = signal<Product[]>([
    {
      id: 'esmeralda-drop', name: 'Esmeralda Drop', nameEs: 'Aretes Esmeralda',
      cat: 'Aretes', price: 248, was: null, stone: 'Emerald', stoneDot: '#3f7a5a',
      tone: 'emerald', label: 'New', labelTone: 'fresh', rating: 5, reviews: 28,
      metal: 'Plata 950', swatches: [
        { color: '#3f7a5a', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop' },
        { color: '#8a3a3a', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=800&fit=crop' },
        { color: '#7a5da8', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
    },
    {
      id: 'filigrana-pendant', name: 'Filigrana Pendant', nameEs: 'Collar Filigrana',
      cat: 'Collares', price: 186, was: null, stone: 'Silver', stoneDot: '#cdcdd2',
      tone: 'pearl', label: 'Bestseller', labelTone: 'lilac', rating: 5, reviews: 64,
      metal: 'Plata 950', swatches: [
        { color: '#cdcdd2', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop' },
        { color: '#d4a86a', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
    },
    {
      id: 'amor-bracelet', name: 'Amor Bracelet', nameEs: 'Pulsera Amor',
      cat: 'Pulseras', price: 142, was: 168, stone: 'Garnet', stoneDot: '#8a3a3a',
      tone: 'garnet', label: 'Limited', labelTone: 'warm', rating: 5, reviews: 41,
      metal: 'Plata 950', swatches: [
        { color: '#8a3a3a', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop' },
        { color: '#3f7a5a', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop' },
        { color: '#2a1e34', image: 'https://images.unsplash.com/photo-1609042890394-631e9560de34?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop',
    },
    {
      id: 'colibri-ring', name: 'Colibri Ring', nameEs: 'Anillo Colibri',
      cat: 'Anillos', price: 198, was: null, stone: 'Amethyst', stoneDot: '#7a5da8',
      tone: 'amethyst', label: null, labelTone: '', rating: 4, reviews: 19,
      metal: 'Plata 950', swatches: [
        { color: '#7a5da8', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop' },
        { color: '#3f7a5a', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop',
    },
    {
      id: 'andina-stack', name: 'Andina Stack', nameEs: 'Anillos Andina',
      cat: 'Anillos', price: 264, was: null, stone: 'Mixed', stoneDot: '#a07432',
      tone: 'cream', label: 'Set of 3', labelTone: 'lilac', rating: 5, reviews: 33,
      metal: 'Plata 950 · 18k', swatches: [
        { color: '#a07432', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop' },
        { color: '#cdcdd2', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop' },
        { color: '#7a5da8', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop',
    },
    {
      id: 'estrella-studs', name: 'Estrella Studs', nameEs: 'Aretes Estrella',
      cat: 'Aretes', price: 96, was: null, stone: 'Silver', stoneDot: '#cdcdd2',
      tone: 'bone', label: null, labelTone: '', rating: 4, reviews: 22,
      metal: 'Plata 950', swatches: [
        { color: '#cdcdd2', image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=800&fit=crop',
    },
    {
      id: 'corazon-pendant', name: 'Corazon Pendant', nameEs: 'Collar Corazon',
      cat: 'Collares', price: 158, was: null, stone: 'Pearl', stoneDot: '#e3dfd6',
      tone: 'lilac', label: 'Bestseller', labelTone: 'lilac', rating: 5, reviews: 87,
      metal: 'Plata 950', swatches: [
        { color: '#e3dfd6', image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=600&h=800&fit=crop' },
        { color: '#cdcdd2', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=600&h=800&fit=crop',
    },
    {
      id: 'rubi-bracelet', name: 'Rubi Beaded', nameEs: 'Pulsera Rubi',
      cat: 'Pulseras', price: 124, was: null, stone: 'Garnet', stoneDot: '#8a3a3a',
      tone: 'garnet', label: null, labelTone: '', rating: 5, reviews: 56,
      metal: 'Plata 950', swatches: [
        { color: '#8a3a3a', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop',
    },
  ]);

  readonly categories = signal<Category[]>([
    { id: 'anillos', es: 'Anillos', en: 'Rings', count: 42, tone: 'lilac' },
    { id: 'collares', es: 'Collares', en: 'Necklaces', count: 36, tone: 'rose' },
    { id: 'pulseras', es: 'Pulseras', en: 'Bracelets', count: 28, tone: 'emerald' },
    { id: 'aretes', es: 'Aretes', en: 'Earrings', count: 51, tone: 'lilac-deep' },
  ]);

  readonly stones = signal<Stone[]>([
    { es: 'Esmeralda', en: 'Emerald', from: 'Muzo, Colombia', meaning: 'Renewal · vision', color: '#3f7a5a' },
    { es: 'Granate', en: 'Garnet', from: 'Antioquia', meaning: 'Love · vitality', color: '#8a3a3a' },
    { es: 'Amatista', en: 'Amethyst', from: 'Boyaca', meaning: 'Calm · clarity', color: '#7a5da8' },
    { es: 'Perla', en: 'Pearl', from: 'Cartagena coast', meaning: 'Memory · grace', color: '#e3dfd6' },
  ]);
}
