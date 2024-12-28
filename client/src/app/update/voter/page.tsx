"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import VoterUpdateForm from "@/components/custom/UpdateProfile/Voter";

export default function VoterUpdationPage() {
  const { isVoterLoading, userAsVoter } = useUser();

  if (isVoterLoading)
    return (
      <div className="mx-auto flex min-h-[650px] w-full max-w-3xl items-center justify-center rounded-lg bg-transparent p-8 shadow-lg md:bg-[#3c3b3b7b]">
        <Loader2 className="size-24 animate-spin text-primary" />
      </div>
    );

  return userAsVoter ? (
    <VoterUpdateForm />
  ) : (
    <div className="mx-auto flex min-h-[650px] w-full max-w-3xl flex-col items-start justify-center rounded-lg bg-transparent p-8 shadow-lg md:items-center">
      <h2 className="text-center text-3xl text-primary">
        You have not been registered as a Voter
      </h2>
      <Link
        href="/auth/voter"
        className="mt-8 w-full bg-primary text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        Register as a Voter
      </Link>
    </div>
  );
}
