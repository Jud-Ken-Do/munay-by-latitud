import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'es';

const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // Utility bar
  'util.shipping': { en: 'Free shipping over $120', es: 'Envio gratis +$120' },
  'util.handcrafted': { en: 'Each piece handcrafted in Colombia', es: 'Cada pieza hecha a mano en Colombia' },
  'util.newCollection': { en: 'New: Filigrana Collection · Now arriving', es: 'Nuevo: Coleccion Filigrana · Disponible' },
  'util.returns': { en: '14-day returns', es: 'Devoluciones de 14 dias' },
  'util.trackOrder': { en: 'Track order', es: 'Rastrear pedido' },
  'util.help': { en: 'Help', es: 'Ayuda' },

  // Navigation
  'nav.rings': { en: 'Rings', es: 'Anillos' },
  'nav.necklaces': { en: 'Necklaces', es: 'Collares' },
  'nav.bracelets': { en: 'Bracelets', es: 'Pulseras' },
  'nav.earrings': { en: 'Earrings', es: 'Aretes' },
  'nav.filigrana': { en: 'Filigrana', es: 'Filigrana' },

  // Hero
  'hero.kicker': { en: 'Autumn 26 · Collection 03', es: 'Otono · Coleccion 03' },
  'hero.title': { en: 'Jewelry woven between the hands', es: 'Joyas tejidas entre las manos' },
  'hero.lead': { en: 'Colombian silver and stones, shaped one piece at a time. Every Munay carries the weight of its maker — soft hammer marks, a stone set just so, a story you carry on your skin.', es: 'Plata y piedras colombianas, moldeadas pieza a pieza. Cada Munay lleva el peso de su creador — marcas suaves de martillo, una piedra colocada con precision, una historia que llevas en tu piel.' },
  'hero.shopCollection': { en: 'Shop the collection', es: 'Ver coleccion' },
  'hero.ourAtelier': { en: 'Our atelier', es: 'Nuestro atelier' },
  'hero.atelier': { en: 'Atelier in Medellin', es: 'Atelier en Medellin' },
  'hero.sterling': { en: 'Sterling silver', es: 'Plata esterlina' },
  'hero.signed': { en: 'Each piece signed', es: 'Cada pieza firmada' },
  'hero.madeIn': { en: 'Made in Colombia · Handmade', es: 'Hecho en Colombia · Hecho a mano' },
  'hero.shopSet': { en: 'Shop set', es: 'Ver set' },

  // Sections
  'cat.section': { en: '01 / Categories', es: '01 / Categorias' },
  'cat.title': { en: 'Shop by silhouette', es: 'Compra por silueta' },
  'cat.lead': { en: 'From the everyday stack to the heirloom piece — four families, hand-finished in our Medellin atelier.', es: 'Desde el stack del dia a dia hasta la pieza de herencia — cuatro familias, terminadas a mano en nuestro atelier de Medellin.' },

  'best.section': { en: '02 / Best loved', es: '02 / Mas amados' },
  'best.title': { en: 'Best loved', es: 'Los mas amados' },
  'best.lead': { en: 'Pieces our community comes back for — the everyday stack, the occasion gift, the one that stays.', es: 'Piezas a las que nuestra comunidad vuelve — el stack diario, el regalo especial, la que se queda.' },
  'best.all': { en: 'All', es: 'Todos' },

  'story.section': { en: '03 / The atelier', es: '03 / El atelier' },
  'story.title': { en: 'A story woven between the hands.', es: 'Una historia tejida entre las manos.' },
  'story.text': { en: 'Munay is the Quechua word for loving with the heart — and it is how we make. Our atelier sits in a quiet corner of Medellin, where four artisans still set every stone, hammer every band, and finish every clasp by hand. No two pieces leave the same.', es: 'Munay es la palabra quechua para amar con el corazon — y asi es como creamos. Nuestro atelier esta en un rincon tranquilo de Medellin, donde cuatro artesanos aun colocan cada piedra, martillan cada banda y terminan cada broche a mano.' },
  'story.meetMakers': { en: 'Meet the makers', es: 'Conoce a los artesanos' },
  'story.visitAtelier': { en: 'Visit the atelier', es: 'Visita el atelier' },

  'stones.section': { en: '04 / The stones', es: '04 / Las piedras' },
  'stones.title': { en: 'The stones we work with', es: 'Las piedras con las que trabajamos' },
  'stones.lead': { en: 'Four stones make up most of what we set. Each one is sourced from a specific corner of Colombia.', es: 'Cuatro piedras componen la mayoria de lo que engastamos. Cada una proviene de un rincon especifico de Colombia.' },

  'community.section': { en: '05 / Community', es: '05 / Comunidad' },
  'community.title': { en: 'Worn by you', es: 'Usado por ti' },

  'news.kicker': { en: 'Letters from the atelier', es: 'Cartas desde el atelier' },
  'news.title': { en: 'Letters from the bench.', es: 'Cartas desde el banco.' },
  'news.text': { en: 'Once a month — new pieces, the stories behind them, and a $20 welcome credit on your first order over $120.', es: 'Una vez al mes — nuevas piezas, las historias detras de ellas, y un credito de bienvenida de $20 en tu primer pedido mayor a $120.' },
  'news.subscribe': { en: 'Subscribe', es: 'Suscribirse' },
  'news.subscribed': { en: 'Subscribed', es: 'Suscrito' },

  // Cart
  'cart.title': { en: 'Your basket', es: 'Tu canasta' },
  'cart.pieces': { en: 'pieces', es: 'piezas' },
  'cart.empty': { en: 'Your basket is quiet.', es: 'Tu canasta esta vacia.' },
  'cart.addPiece': { en: 'Add a piece to begin', es: 'Agrega una pieza para comenzar' },
  'cart.subtotal': { en: 'Subtotal', es: 'Subtotal' },
  'cart.checkout': { en: 'Checkout · secure payment', es: 'Pagar · pago seguro' },
  'cart.freeShipping': { en: 'Free shipping over $120 · Engraving available at checkout', es: 'Envio gratis +$120 · Grabado disponible en el pago' },
  'cart.remove': { en: 'Remove', es: 'Eliminar' },

  // Product detail
  'pd.addToBasket': { en: 'Add to basket', es: 'Agregar a la canasta' },
  'pd.quickAdd': { en: 'Quick add', es: 'Agregar rapido' },
  'pd.size': { en: 'Size', es: 'Talla' },
  'pd.quantity': { en: 'Quantity', es: 'Cantidad' },
  'pd.materials': { en: 'Materials & Care', es: 'Materiales y cuidado' },
  'pd.sizing': { en: 'Sizing', es: 'Tallas' },
  'pd.shipping': { en: 'Shipping & Returns', es: 'Envio y devoluciones' },
  'pd.related': { en: 'You may also love', es: 'Tambien te puede gustar' },
  'pd.sizeGuide': { en: 'Size guide', es: 'Guia de tallas' },

  // General
  'general.home': { en: 'Home', es: 'Inicio' },
  'general.shop': { en: 'Shop', es: 'Tienda' },
  'general.shopAll': { en: 'Shop All', es: 'Ver todo' },
  'general.wishlist': { en: 'Wishlist', es: 'Favoritos' },
  'general.search': { en: 'Search', es: 'Buscar' },
  'general.from': { en: 'From', es: 'Desde' },

  // Quechua
  'quechua.meaning': { en: 'Love with the heart.', es: 'Amar con el corazon.' },

  // Quote
  'quote.text': { en: 'Every piece holds the pulse of the hand that made it.', es: 'Cada pieza guarda el pulso de quien la hizo.' },

  // Footer
  'footer.description': { en: 'Colombian silver, handmade — from our atelier in Medellin to your daily wear.', es: 'Plata colombiana, hecha a mano — desde nuestro atelier en Medellin hasta tu uso diario.' },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>('en');

  toggle() {
    this.lang.update(l => l === 'en' ? 'es' : 'en');
  }

  t(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.lang()] || entry['en'] || key;
  }
}
