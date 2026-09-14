create table public.applications (
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id text not null,
  applied boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, job_id)
);

alter table public.applications enable row level security;

create policy "Users can read their own applications"
on public.applications for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own applications"
on public.applications for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own applications"
on public.applications for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own applications"
on public.applications for delete
to authenticated
using (auth.uid() = user_id);
