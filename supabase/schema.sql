-- Valb Studio · Gestionale — database su Supabase
-- Copia tutto questo testo in Supabase › SQL Editor › New query e tocca "Run".
-- Puoi eseguirlo anche più volte: non cancella niente.

-- 1. Una riga per ogni scheda (filati, hardware, borse, ordini, note, …)
create table if not exists public.items (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  coll       text        not null,              -- la sezione: filati, prodotti, ordini, …
  rid        text        not null,              -- l'id della scheda
  data       jsonb,                             -- il contenuto della scheda
  deleted    boolean     not null default false, -- true = scheda eliminata
  updated_at timestamptz not null default now(),
  primary key (user_id, coll, rid)
);
create index if not exists items_user_updated on public.items (user_id, updated_at);

-- l'ora dell'ultima modifica la mette sempre il database (stesso orologio per iPhone e iPad)
create or replace function public.items_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end $$;
drop trigger if exists items_touch on public.items;
create trigger items_touch before insert or update on public.items
  for each row execute function public.items_touch();

-- 2. Ognuno vede e modifica solo le proprie schede
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.items to authenticated;
alter table public.items enable row level security;
drop policy if exists "items_select_own" on public.items;
drop policy if exists "items_insert_own" on public.items;
drop policy if exists "items_update_own" on public.items;
drop policy if exists "items_delete_own" on public.items;
create policy "items_select_own" on public.items for select to authenticated using (auth.uid() = user_id);
create policy "items_insert_own" on public.items for insert to authenticated with check (auth.uid() = user_id);
create policy "items_update_own" on public.items for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "items_delete_own" on public.items for delete to authenticated using (auth.uid() = user_id);

-- 3. Aggiornamenti in tempo reale tra iPhone e iPad
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'items'
  ) then
    alter publication supabase_realtime add table public.items;
  end if;
end $$;

-- 4. Spazio privato per foto e PDF (ognuno nella propria cartella)
insert into storage.buckets (id, name, public)
values ('media', 'media', false)
on conflict (id) do nothing;

drop policy if exists "media_select_own" on storage.objects;
drop policy if exists "media_insert_own" on storage.objects;
drop policy if exists "media_update_own" on storage.objects;
drop policy if exists "media_delete_own" on storage.objects;
create policy "media_select_own" on storage.objects for select to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media_insert_own" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media_update_own" on storage.objects for update to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "media_delete_own" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
