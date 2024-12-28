"use client";

import { type PropsWithChildren } from "react";

import { useUser } from "@/hooks/use-context";

import { Button } from "@/components/ui/button";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { publicKey, connectWallet } = useUser();

  return !!publicKey ? (
    children
  ) : (
    <div className="mx-auto flex min-h-[650px] w-full max-w-3xl flex-col items-start justify-center rounded-lg bg-transparent p-8 shadow-lg md:items-center">
      <h2 className="text-center text-3xl text-primary">
        You haven&apos;t Connected You Wallet yet! Please Connect your Wallet to
        Register your Profile.
      </h2>
      <Button
        onClick={connectWallet}
        className="mx-auto mt-8 rounded-md bg-primary px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        Connect Wallet
      </Button>
    </div>
  );
}
