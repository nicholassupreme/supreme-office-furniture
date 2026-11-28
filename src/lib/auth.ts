import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./db";

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } }
    : {};

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },
  socialProviders: google,
  user: {
    additionalFields: {
      company: { type: "string", required: false },
      phone: { type: "string", required: false },
      location: { type: "string", required: false },
    },
  },
  session: { expiresIn: 60 * 60 * 24 * 30 },
  plugins: [nextCookies()], // keeps cookies in sync when sign-in happens in a server action
});
