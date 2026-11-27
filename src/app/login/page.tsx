import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in or create an account",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-10 md:pt-16">
      <Suspense fallback={<div className="h-96" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
