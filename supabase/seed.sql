-- ============================================
-- Munay by Latitud — Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Categories
insert into public.categories (id, es, en, count, tone, sort_order) values
  ('anillos', 'Anillos', 'Rings', 42, 'lilac', 1),
  ('collares', 'Collares', 'Necklaces', 36, 'rose', 2),
  ('pulseras', 'Pulseras', 'Bracelets', 28, 'emerald', 3),
  ('aretes', 'Aretes', 'Earrings', 51, 'lilac-deep', 4);

-- Products
insert into public.products (id, name, name_es, category_id, price, was, stone, stone_dot, tone, label, label_tone, rating, reviews, metal, image, swatches) values
  ('esmeralda-drop', 'Esmeralda Drop', 'Aretes Esmeralda', 'aretes', 248, null, 'Emerald', '#3f7a5a', 'emerald', 'New', 'fresh', 5, 28, 'Plata 950',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
    '[{"color":"#3f7a5a","image":"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop"},{"color":"#8a3a3a","image":"https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=800&fit=crop"},{"color":"#7a5da8","image":"https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop"}]'
  ),
  ('filigrana-pendant', 'Filigrana Pendant', 'Collar Filigrana', 'collares', 186, null, 'Silver', '#cdcdd2', 'pearl', 'Bestseller', 'lilac', 5, 64, 'Plata 950',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
    '[{"color":"#cdcdd2","image":"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop"},{"color":"#d4a86a","image":"https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=800&fit=crop"}]'
  ),
  ('amor-bracelet', 'Amor Bracelet', 'Pulsera Amor', 'pulseras', 142, 168, 'Garnet', '#8a3a3a', 'garnet', 'Limited', 'warm', 5, 41, 'Plata 950',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop',
    '[{"color":"#8a3a3a","image":"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=800&fit=crop"},{"color":"#3f7a5a","image":"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop"},{"color":"#2a1e34","image":"https://images.unsplash.com/photo-1609042890394-631e9560de34?w=600&h=800&fit=crop"}]'
  ),
  ('colibri-ring', 'Colibri Ring', 'Anillo Colibri', 'anillos', 198, null, 'Amethyst', '#7a5da8', 'amethyst', null, '', 4, 19, 'Plata 950',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop',
    '[{"color":"#7a5da8","image":"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop"},{"color":"#3f7a5a","image":"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop"}]'
  ),
  ('andina-stack', 'Andina Stack', 'Anillos Andina', 'anillos', 264, null, 'Mixed', '#a07432', 'cream', 'Set of 3', 'lilac', 5, 33, 'Plata 950 · 18k',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop',
    '[{"color":"#a07432","image":"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=800&fit=crop"},{"color":"#cdcdd2","image":"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop"},{"color":"#7a5da8","image":"https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop"}]'
  ),
  ('estrella-studs', 'Estrella Studs', 'Aretes Estrella', 'aretes', 96, null, 'Silver', '#cdcdd2', 'bone', null, '', 4, 22, 'Plata 950',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=800&fit=crop',
    '[{"color":"#cdcdd2","image":"https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=800&fit=crop"}]'
  ),
  ('corazon-pendant', 'Corazon Pendant', 'Collar Corazon', 'collares', 158, null, 'Pearl', '#e3dfd6', 'lilac', 'Bestseller', 'lilac', 5, 87, 'Plata 950',
    'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=600&h=800&fit=crop',
    '[{"color":"#e3dfd6","image":"https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=600&h=800&fit=crop"},{"color":"#cdcdd2","image":"https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=800&fit=crop"}]'
  ),
  ('rubi-bracelet', 'Rubi Beaded', 'Pulsera Rubi', 'pulseras', 124, null, 'Garnet', '#8a3a3a', 'garnet', null, '', 5, 56, 'Plata 950',
    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop',
    '[{"color":"#8a3a3a","image":"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop"}]'
  );

-- Stones
insert into public.stones (es, en, origin, meaning, color) values
  ('Esmeralda', 'Emerald', 'Muzo, Colombia', 'Renewal · vision', '#3f7a5a'),
  ('Granate', 'Garnet', 'Antioquia', 'Love · vitality', '#8a3a3a'),
  ('Amatista', 'Amethyst', 'Boyaca', 'Calm · clarity', '#7a5da8'),
  ('Perla', 'Pearl', 'Cartagena coast', 'Memory · grace', '#e3dfd6');
