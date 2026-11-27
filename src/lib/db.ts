import "server-only";
import { Pool } from "pg";

// One pool per server instance. Neon/Supabase free tiers are happy with a small pool.
const g = globalThis as unknown as { __supremePool?: Pool };

export const pool: Pool =
  g.__supremePool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") g.__supremePool = pool;
