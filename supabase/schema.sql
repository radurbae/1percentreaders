-- ============================================================
-- 1% Readers — Supabase Database Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type post_type as enum ('rise_post', 'reflect_recap', 'digest', 'announcement');
create type post_status as enum ('pending', 'approved', 'published', 'rejected');
create type submission_status as enum ('pending', 'approved', 'rejected');

-- ============================================================
-- AUTHORS
-- ============================================================

create table authors (
  id uuid primary key default uuid_generate_v4(),
  nickname text unique not null,
  bio text,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- POSTS
-- ============================================================

create table posts (
  id uuid primary key default uuid_generate_v4(),
  type post_type not null default 'rise_post',
  title text not null,
  slug text unique not null,
  content_md text not null,
  excerpt text not null,
  cover_url text,
  author_id uuid references authors(id) on delete set null,
  week_label text,
  status post_status not null default 'pending',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  published_at timestamptz,
  approved_by uuid,
  approved_at timestamptz
);

-- ============================================================
-- TAGS
-- ============================================================

create table tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null
);

-- ============================================================
-- POST_TAGS (Junction)
-- ============================================================

create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- ============================================================
-- SUBMISSIONS
-- ============================================================

create table submissions (
  id uuid primary key default uuid_generate_v4(),
  nickname text not null,
  title text not null,
  content_md text not null,
  notes text,
  status submission_status not null default 'pending',
  created_at timestamptz default now() not null
);

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_posts_status on posts(status);
create index idx_posts_type on posts(type);
create index idx_posts_slug on posts(slug);
create index idx_posts_published_at on posts(published_at);
create index idx_submissions_status on submissions(status);
create index idx_tags_slug on tags(slug);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_posts_updated_at
  before update on posts
  for each row
  execute function update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table authors enable row level security;
alter table posts enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;
alter table submissions enable row level security;

-- Public: anyone can read published posts
create policy "Public can view published posts"
  on posts for select
  using (status = 'published');

-- Public: anyone can read authors of published posts
create policy "Public can view authors"
  on authors for select
  using (true);

-- Public: anyone can read tags
create policy "Public can view tags"
  on tags for select
  using (true);

-- Public: anyone can read post_tags
create policy "Public can view post_tags"
  on post_tags for select
  using (true);

-- Public: anyone can submit
create policy "Public can insert submissions"
  on submissions for insert
  with check (true);

-- Curators (authenticated): full access to posts
create policy "Curators can manage posts"
  on posts for all
  to authenticated
  using (true)
  with check (true);

-- Curators: full access to authors
create policy "Curators can manage authors"
  on authors for all
  to authenticated
  using (true)
  with check (true);

-- Curators: full access to tags
create policy "Curators can manage tags"
  on tags for all
  to authenticated
  using (true)
  with check (true);

-- Curators: full access to post_tags
create policy "Curators can manage post_tags"
  on post_tags for all
  to authenticated
  using (true)
  with check (true);

-- Curators: full access to submissions
create policy "Curators can manage submissions"
  on submissions for all
  to authenticated
  using (true)
  with check (true);
