import type { Metadata } from "next";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = {
  title: "My account",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-10 pt-8 md:px-6 md:pt-12">
      <h1 className="text-[34px] font-semibold tracking-[-0.03em] md:text-5xl">My account</h1>
      <div className="mt-10">
        <AccountView />
      </div>
    </div>
  );
}
