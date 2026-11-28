import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";

/** Current logged-in user for an API route, or null. Reads cookies, so only call from request handlers. */
export async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
