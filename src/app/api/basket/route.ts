import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { quoteItemsSchema } from "@/lib/quote-schema";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const { rows } = await pool.query("select items from quote_basket where user_id = $1", [user.id]);
  return NextResponse.json({ items: rows[0]?.items ?? [] });
}

export async function PUT(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = quoteItemsSchema.safeParse(body?.items);
  if (!parsed.success) return NextResponse.json({ error: "invalid basket" }, { status: 400 });
  await pool.query(
    `insert into quote_basket (user_id, items, updated_at) values ($1, $2::jsonb, now())
     on conflict (user_id) do update set items = excluded.items, updated_at = now()`,
    [user.id, JSON.stringify(parsed.data)],
  );
  return NextResponse.json({ ok: true });
}
