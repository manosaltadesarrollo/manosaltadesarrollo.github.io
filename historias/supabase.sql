-- =====================================================================
-- Historias Clínicas — base de datos de sincronización para Supabase
-- Pegar TODO este archivo en Supabase → SQL Editor → New query → Run.
-- Se puede ejecutar más de una vez sin problema.
--
-- El servidor sólo guarda datos YA CIFRADOS en el dispositivo (AES-256).
-- Ni Supabase ni nadie con acceso a la base puede leer las historias.
-- =====================================================================

-- Bóveda: datos públicos necesarios para derivar la clave en cada dispositivo
create table if not exists public.vault (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  salt       text  not null,
  verifier   jsonb not null,
  updated_at timestamptz not null default now()
);

-- Registros cifrados (un registro por paciente)
create sequence if not exists public.records_rev_seq;

create table if not exists public.records (
  user_id    uuid   not null default auth.uid() references auth.users(id) on delete cascade,
  id         text   not null,
  box        jsonb  not null,
  rev        bigint not null default nextval('public.records_rev_seq'),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
create index if not exists records_user_rev on public.records (user_id, rev);

-- Cada modificación recibe un número de versión nuevo (para detectar cambios y conflictos)
create or replace function public.hc_touch() returns trigger
language plpgsql set search_path = public as $$
begin
  if tg_table_name = 'records' then
    new.rev := nextval('public.records_rev_seq');
  end if;
  new.user_id := old.user_id;   -- nadie puede "pasarle" un registro a otro usuario
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists records_touch on public.records;
create trigger records_touch before update on public.records
  for each row execute function public.hc_touch();

drop trigger if exists vault_touch on public.vault;
create trigger vault_touch before update on public.vault
  for each row execute function public.hc_touch();

-- Seguridad a nivel de fila: cada usuario ve y modifica SÓLO lo suyo
alter table public.vault   enable row level security;
alter table public.records enable row level security;

drop policy if exists "vault propio" on public.vault;
create policy "vault propio" on public.vault
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "registros propios" on public.records;
create policy "registros propios" on public.records
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Permisos: usuarios autenticados pueden leer, crear y modificar (nunca borrar).
revoke all on public.vault, public.records from anon, authenticated;
grant select, insert, update on public.vault, public.records to authenticated;
grant usage on sequence public.records_rev_seq to authenticated;

-- =====================================================================
-- Estudios e imágenes (fotos, PDF, DICOM) — también cifrados en el dispositivo
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('adjuntos', 'adjuntos', false)
on conflict (id) do nothing;

-- Cada usuario sólo accede a su propia carpeta (adjuntos/<su id>/...)
drop policy if exists "adjuntos: ver propios" on storage.objects;
create policy "adjuntos: ver propios" on storage.objects
  for select to authenticated
  using (bucket_id = 'adjuntos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "adjuntos: subir propios" on storage.objects;
create policy "adjuntos: subir propios" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'adjuntos' and (storage.foldername(name))[1] = auth.uid()::text);

-- Borrar archivos propios (documentos vencidos y archivos quitados de la ficha)
drop policy if exists "adjuntos: borrar propios" on storage.objects;
create policy "adjuntos: borrar propios" on storage.objects
  for delete to authenticated
  using (bucket_id = 'adjuntos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "adjuntos: actualizar propios" on storage.objects;
create policy "adjuntos: actualizar propios" on storage.objects
  for update to authenticated
  using (bucket_id = 'adjuntos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'adjuntos' and (storage.foldername(name))[1] = auth.uid()::text);

-- =====================================================================
-- EQUIPO: varios médicos que comparten los mismos pacientes
-- Cada integrante tiene su usuario y su clave. Los datos se cifran con una
-- "clave del equipo", y cada integrante guarda una copia de esa clave cifrada
-- con SU clave maestra. El servidor nunca ve ninguna clave.
-- =====================================================================
create table if not exists public.equipos (
  id         uuid primary key default gen_random_uuid(),
  owner      uuid not null default auth.uid() references auth.users(id) on delete cascade unique,
  nombre     text,
  created_at timestamptz not null default now()
);

create table if not exists public.miembros (
  equipo_id  uuid not null references public.equipos(id) on delete cascade,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  rol        text not null default 'medico' check (rol in ('admin', 'medico')),
  activo     boolean not null default true,
  clave      jsonb not null,     -- clave del equipo, cifrada con la clave maestra del integrante
  perfil     jsonb,              -- nombre y matrícula para la firma, cifrados con la clave del equipo
  updated_at timestamptz not null default now(),
  primary key (equipo_id, user_id)
);

create table if not exists public.invitaciones (
  id         uuid primary key default gen_random_uuid(),
  equipo_id  uuid not null references public.equipos(id) on delete cascade,
  clave      jsonb not null,     -- clave del equipo, cifrada con el código de la invitación
  creada_por uuid not null default auth.uid() references auth.users(id) on delete cascade,
  creada     timestamptz not null default now(),
  expira     timestamptz not null default now() + interval '7 days',
  usada_por  uuid references auth.users(id) on delete set null,
  usada      timestamptz
);

create table if not exists public.registros (
  equipo_id  uuid   not null references public.equipos(id) on delete cascade,
  id         text   not null,
  box        jsonb  not null,
  rev        bigint not null default nextval('public.records_rev_seq'),
  autor      uuid   default auth.uid(),
  updated_at timestamptz not null default now(),
  primary key (equipo_id, id)
);
create index if not exists registros_equipo_rev on public.registros (equipo_id, rev);

-- Equipos activos del usuario actual (security definer: evita recursión en las reglas)
create or replace function public.mis_equipos() returns setof uuid
language sql stable security definer set search_path = public as $$
  select equipo_id from public.miembros where user_id = auth.uid() and activo
$$;
create or replace function public.es_admin(eq uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.miembros where equipo_id = eq and user_id = auth.uid() and activo and rol = 'admin')
$$;

-- Versiones y autor de cada cambio
create or replace function public.registros_touch() returns trigger
language plpgsql set search_path = public as $$
begin
  new.rev := nextval('public.records_rev_seq');
  new.equipo_id := old.equipo_id;
  new.autor := auth.uid();
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists registros_touch on public.registros;
create trigger registros_touch before update on public.registros
  for each row execute function public.registros_touch();

-- Un integrante puede actualizar su copia de la clave y su firma, pero no darse más permisos
create or replace function public.miembros_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.es_admin(old.equipo_id) then
    new.rol := old.rol; new.activo := old.activo;
  end if;
  if old.user_id <> auth.uid() then            -- el administrador sólo puede cambiar rol y acceso de otros
    new.clave := old.clave; new.perfil := old.perfil;
  end if;
  new.equipo_id := old.equipo_id; new.user_id := old.user_id; new.updated_at := now();
  return new;
end $$;
drop trigger if exists miembros_guard on public.miembros;
create trigger miembros_guard before update on public.miembros
  for each row execute function public.miembros_guard();

alter table public.equipos      enable row level security;
alter table public.miembros     enable row level security;
alter table public.invitaciones enable row level security;
alter table public.registros    enable row level security;

drop policy if exists "equipos: ver" on public.equipos;
create policy "equipos: ver" on public.equipos for select to authenticated using (id in (select public.mis_equipos()) or owner = auth.uid());
drop policy if exists "equipos: crear" on public.equipos;
create policy "equipos: crear" on public.equipos for insert to authenticated with check (owner = auth.uid());
drop policy if exists "equipos: editar" on public.equipos;
create policy "equipos: editar" on public.equipos for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "miembros: ver" on public.miembros;
create policy "miembros: ver" on public.miembros for select to authenticated using (equipo_id in (select public.mis_equipos()) or user_id = auth.uid());
drop policy if exists "miembros: alta del creador" on public.miembros;
create policy "miembros: alta del creador" on public.miembros for insert to authenticated
  with check (user_id = auth.uid() and rol = 'admin' and exists (select 1 from public.equipos e where e.id = equipo_id and e.owner = auth.uid()));
drop policy if exists "miembros: editar" on public.miembros;
create policy "miembros: editar" on public.miembros for update to authenticated
  using (user_id = auth.uid() or public.es_admin(equipo_id)) with check (user_id = auth.uid() or public.es_admin(equipo_id));

drop policy if exists "invitaciones: administrar" on public.invitaciones;
create policy "invitaciones: administrar" on public.invitaciones for all to authenticated
  using (public.es_admin(equipo_id)) with check (public.es_admin(equipo_id) and creada_por = auth.uid());

drop policy if exists "registros: equipo" on public.registros;
create policy "registros: equipo" on public.registros for all to authenticated
  using (equipo_id in (select public.mis_equipos())) with check (equipo_id in (select public.mis_equipos()));

-- Invitaciones: ver una por su código y aceptarla (sólo si no se usó ni venció)
create or replace function public.ver_invitacion(p_id uuid) returns table (equipo_id uuid, clave jsonb)
language sql stable security definer set search_path = public as $$
  select i.equipo_id, i.clave from public.invitaciones i where i.id = p_id and i.usada is null and i.expira > now()
$$;
create or replace function public.aceptar_invitacion(p_id uuid, p_clave jsonb, p_perfil jsonb) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_eq uuid;
begin
  if auth.uid() is null then raise exception 'sin sesión'; end if;
  select equipo_id into v_eq from public.invitaciones where id = p_id and usada is null and expira > now() for update;
  if v_eq is null then raise exception 'La invitación no es válida, ya se usó o venció.'; end if;
  insert into public.miembros (equipo_id, user_id, rol, clave, perfil, activo)
    values (v_eq, auth.uid(), 'medico', p_clave, p_perfil, true)
    on conflict (equipo_id, user_id) do update set clave = excluded.clave, perfil = excluded.perfil, activo = true;
  update public.invitaciones set usada = now(), usada_por = auth.uid() where id = p_id;
  return v_eq;
end $$;

revoke all on public.equipos, public.miembros, public.invitaciones, public.registros from anon, authenticated;
grant select, insert, update on public.equipos, public.miembros, public.registros to authenticated;
grant select, insert, update, delete on public.invitaciones to authenticated;
revoke all on function public.mis_equipos(), public.es_admin(uuid), public.ver_invitacion(uuid), public.aceptar_invitacion(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.mis_equipos(), public.es_admin(uuid), public.ver_invitacion(uuid), public.aceptar_invitacion(uuid, jsonb, jsonb) to authenticated;

-- Estudios: cada uno sube a su carpeta; los integrantes del equipo pueden ver los de sus compañeros
drop policy if exists "adjuntos: ver propios" on storage.objects;
drop policy if exists "adjuntos: ver equipo" on storage.objects;
create policy "adjuntos: ver equipo" on storage.objects
  for select to authenticated
  using (bucket_id = 'adjuntos' and (
    (storage.foldername(name))[1] = auth.uid()::text
    or (storage.foldername(name))[1] in (select m.user_id::text from public.miembros m where m.equipo_id in (select public.mis_equipos()) and m.activo)
  ));
