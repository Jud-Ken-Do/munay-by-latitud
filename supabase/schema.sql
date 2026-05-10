-- ============================================
-- Munay by Latitud — Database Schema
-- Run this in Supabase SQL Editor (Settings → SQL Editor)
-- ============================================

-- 1. Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null default '',
  role text not null default 'customer' check (role in ('customer', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- 2. Categories table
create table public.categories (
  id text primary key,
  es text not null,
  en text not null,
  count int not null default 0,
  tone text not null default 'lilac',
  image text,
  sort_order int not null default 0
);

-- 3. Products table
create table public.products (
  id text primary key,
  name text not null,
  name_es text not null,
  category_id text references public.categories(id),
  price numeric(10,2) not null,
  was numeric(10,2),
  stone text not null default 'Silver',
  stone_dot text not null default '#cdcdd2',
  tone text not null default 'lilac',
  label text,
  label_tone text default '',
  rating numeric(2,1) not null default 5.0,
  reviews int not null default 0,
  metal text not null default 'Plata 950',
  image text,
  swatches jsonb not null default '[]'::jsonb,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Stones table
create table public.stones (
  id serial primary key,
  es text not null,
  en text not null,
  origin text not null,
  meaning text not null,
  color text not null
);

-- 5. Orders table (for future use)
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total numeric(10,2) not null,
  items jsonb not null default '[]'::jsonb,
  shipping_address jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- Row Level Security Policies
-- ============================================

-- Profiles: users can read their own, admins can read all
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Categories: public read, admin write
alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

create policy "Admins can manage categories"
  on public.categories for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Products: public read, admin write
alter table public.products enable row level security;

create policy "Products are viewable by everyone"
  on public.products for select using (true);

create policy "Admins can insert products"
  on public.products for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update products"
  on public.products for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete products"
  on public.products for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Stones: public read, admin write
alter table public.stones enable row level security;

create policy "Stones are viewable by everyone"
  on public.stones for select using (true);

create policy "Admins can manage stones"
  on public.stones for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Orders: users see own orders, admins see all
alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert with check (auth.uid() = user_id);

create policy "Admins can view all orders"
  on public.orders for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update orders"
  on public.orders for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ============================================
-- Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- Storage bucket for product images
-- ============================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Anyone can view product images"
  on storage.objects for select using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert with check (
    bucket_id = 'product-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update product images"
  on storage.objects for update using (
    bucket_id = 'product-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete product images"
  on storage.objects for delete using (
    bucket_id = 'product-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
