-- A private group is submittable immediately, but it can't actually be
-- scanned until an admin assigns it a pooled Facebook account (see
-- app/dashboard/private-groups). Before this, a brand-new private source
-- still showed status 'active' in the meantime, which read as "already
-- watching" when it wasn't. 'pending' lets the UI say so honestly; the
-- assignments route flips it to 'active' the moment an admin approves one.
alter type public.watch_status add value 'pending';
