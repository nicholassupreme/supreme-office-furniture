"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { authClient, safeNext } from "@/lib/auth-client";

const googleOn = process.env.NEXT_PUBLIC_GOOGLE_LOGIN === "1";

const input =
  "mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-brand";

export function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({ name: "", email: "", password: "", company: "", phone: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res =
      mode === "signup"
        ? await authClient.signUp.email({
            name: f.name.trim(),
            email: f.email.trim(),
            password: f.password,
            company: f.company.trim() || undefined,
            phone: f.phone.trim() || undefined,
          })
        : await authClient.signIn.email({ email: f.email.trim(), password: f.password });
    setBusy(false);
    if (res.error) {
      setError(res.error.message || "Something went wrong. Please try again.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  async function google() {
    setError("");
    await authClient.signIn.social({ provider: "google", callbackURL: next });
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {mode === "signup"
          ? "Save your quote on any device, keep a history of requests, and skip retyping your company details."
          : "Sign in to open your saved quote and past requests."}
      </p>

      {googleOn && (
        <>
          <button
            onClick={google}
            type="button"
            className="group mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-line text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/25 active:translate-y-0 hover:border-brand"
          >
            <span className="text-base font-bold leading-none text-brand transition-colors group-hover:text-white" aria-hidden>G</span>
            Continue with Google
          </button>
          <div className="my-5 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" /> or use email <span className="h-px flex-1 bg-line" />
          </div>
        </>
      )}

      <form onSubmit={submit} className={`space-y-4 ${googleOn ? "" : "mt-6"}`}>
        {mode === "signup" && (
          <label className="block">
            <span className="text-sm font-medium">Your name</span>
            <input required minLength={2} value={f.name} onChange={set("name")} autoComplete="name" className={input} />
          </label>
        )}
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input required type="email" value={f.email} onChange={set("email")} autoComplete="email" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            required
            type="password"
            minLength={8}
            value={f.password}
            onChange={set("password")}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className={input}
          />
          {mode === "signup" && <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>}
        </label>
        {mode === "signup" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Company <span className="font-normal text-muted">(optional)</span></span>
              <input value={f.company} onChange={set("company")} autoComplete="organization" className={input} />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Phone <span className="font-normal text-muted">(optional)</span></span>
              <input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" className={input} />
            </label>
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="h-12 w-full rounded-full bg-ink text-sm font-semibold text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-brand/25 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError("");
          }}
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          {mode === "signup" ? "Sign in" : "Create an account"}
        </button>
      </p>
      <p className="mt-4 text-center text-xs text-muted">
        An account is optional.{" "}
        <Link href="/quote" className="underline underline-offset-4">
          Continue as a guest
        </Link>
      </p>
    </div>
  );
}
