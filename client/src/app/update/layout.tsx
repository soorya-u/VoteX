"use client";

import { type PropsWithChildren } from "react";

import { useUser } from "@/hooks/use-context";

import { Button } from "@/components/ui/button";

export default function UpdateLayout({ children }: PropsWithChildren) {
  const { publicKey, connectWallet } = useUser();

  return !!publicKey ? (
    children
  ) : (
    <div className="w-full min-h-[650px] max-w-3xl flex items-start flex-col justify-center md:items-center mx-auto bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center">
        You haven't Connected You Wallet yet! Please Connect your Wallet to
        Update your Profile.
      </h2>
      <Button
        onClick={connectWallet}
        className="mt-8 mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#e62d4e] text-white transition-colors duration-200"
      >
        Connect Wallet
      </Button>
    </div>
  );
}
