-- Supreme Office Furniture: customer accounts
-- Run this ONCE in your database's SQL editor (Neon: SQL Editor -> paste -> Run).
-- Safe to run again: every statement uses "if not exists".

-- ---------- Better Auth tables (login, sessions, Google link) ----------
create table if not exists "user" (
  "id" text not null primary key,
  "name" text not null,
  "email" text not null unique,
  "emailVerified" boolean not null,
  "image" text,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz default CURRENT_TIMESTAMP not null,
  "company" text,
  "phone" text,
  "location" text
);

create table if not exists "session" (
  "id" text not null primary key,
  "expiresAt" timestamptz not null,
  "token" text not null unique,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz not null,
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references "user" ("id") on delete cascade
);

create table if not exists "account" (
  "id" text not null primary key,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references "user" ("id") on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope" text,
  "password" text,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz not null
);

create table if not exists "verification" (
  "id" text not null primary key,
  "identifier" text not null,
  "value" text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "updatedAt" timestamptz default CURRENT_TIMESTAMP not null
);

create index if not exists "session_userId_idx" on "session" ("userId");
create index if not exists "account_userId_idx" on "account" ("userId");
create index if not exists "verification_identifier_idx" on "verification" ("identifier");

-- ---------- Supreme tables ----------
-- One saved quote basket per customer (synced across their devices).
create table if not exists quote_basket (
  user_id text primary key references "user" ("id") on delete cascade,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Every quote the customer sent (WhatsApp or email), kept as their history.
create table if not exists quote_request (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" ("id") on delete cascade,
  items jsonb not null,
  estimated_total numeric(12, 2) not null default 0,
  channel text not null check (channel in ('whatsapp', 'email')),
  contact_name text,
  contact_company text,
  contact_phone text,
  contact_email text,
  delivery_location text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists quote_request_user_idx on quote_request (user_id, created_at desc);
