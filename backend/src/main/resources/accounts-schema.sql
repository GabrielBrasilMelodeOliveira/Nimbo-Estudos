create table if not exists public.nimbo_accounts (
    id uuid primary key,
    name varchar(80) not null,
    email varchar(254) not null unique,
    password_hash varchar(100) not null,
    schema_name varchar(63) not null unique,
    legacy_owner boolean not null default false,
    created_at timestamptz not null default now()
);

create table if not exists public.nimbo_installation (
    id integer primary key check (id = 1),
    completed boolean not null default false,
    setup_key_hash varchar(64)
);
insert into public.nimbo_installation (id) values (1) on conflict do nothing;

create table if not exists public.nimbo_sessions (
    primary_id char(36) primary key,
    session_id char(36) not null,
    creation_time bigint not null,
    last_access_time bigint not null,
    max_inactive_interval integer not null,
    expiry_time bigint not null,
    principal_name varchar(254)
);
create unique index if not exists nimbo_sessions_id
    on public.nimbo_sessions (session_id);
create index if not exists nimbo_sessions_expiry
    on public.nimbo_sessions (expiry_time);
create index if not exists nimbo_sessions_principal
    on public.nimbo_sessions (principal_name);

create table if not exists public.nimbo_sessions_attributes (
    session_primary_id char(36) not null
        references public.nimbo_sessions (primary_id) on delete cascade,
    attribute_name varchar(200) not null,
    attribute_bytes bytea not null,
    primary key (session_primary_id, attribute_name)
);
