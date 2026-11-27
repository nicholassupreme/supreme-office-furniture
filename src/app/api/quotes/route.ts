import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { currentUser } from "@/lib/session";
import { quoteRequestSchema } from "@/lib/quote-schema";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const { rows } = await pool.query(
    `select id, items, estimated_total, channel, created_at
       from quote_request where user_id = $1 order by created_at desc limit 50`,
    [user.id],
  );
  return NextResponse.json({
    quotes: rows.map((r) => ({
      id: r.id,
      items: r.items,
      total: Number(r.estimated_total),
      channel: r.channel,
      createdAt: r.created_at,
    })),
  });
}

/** Records a quote the customer just sent, and remembers their contact details if their profile is still empty. */
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const parsed = quoteRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid quote" }, { status: 400 });
  const q = parsed.data;
  const total = q.items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);

  await pool.query(
    `insert into quote_request
       (user_id, items, estimated_total, channel, contact_name, contact_company, contact_phone, contact_email, delivery_location, notes)
     values ($1, $2::jsonb, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [user.id, JSON.stringify(q.items), total, q.channel, q.name, q.company, q.phone, q.email, q.location, q.notes],
  );

  // Save-company-details: only fill gaps, never overwrite what the customer already stored.
  await pool.query(
    `update "user" set
       company = coalesce(nullif(company, ''), nullif($2, '')),
       phone = coalesce(nullif(phone, ''), nullif($3, '')),
       location = coalesce(nullif(location, ''), nullif($4, '')),
       "updatedAt" = now()
     where id = $1`,
    [user.id, q.company, q.phone, q.location],
  );
  return NextResponse.json({ ok: true });
}
