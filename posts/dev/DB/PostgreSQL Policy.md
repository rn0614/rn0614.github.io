```sql

create policy 'Enable select for authenticated users only' ON "public", "todos"
AS PERMISSIVE FOR SELECT
TO authenticated
WITH CHECK (ture)

```