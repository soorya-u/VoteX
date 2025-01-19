"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import VoterForm from "@/components/custom/create-profile/voter";

export default function CandidateRegistrationPage() {
  const { isVoterLoading, userAsVoter } = useUser();

  if (isVoterLoading)
    return (
      <div className="mx-auto flex min-h-[650px] w-full max-w-3xl items-center justify-center rounded-lg bg-transparent p-8 shadow-lg">
        <Loader2 className="size-24 animate-spin text-primary" />
      </div>
    );

  return userAsVoter && userAsVoter.status === "Approved" ? (
    <div className="mx-auto flex min-h-[650px] w-full max-w-3xl flex-col items-start justify-center rounded-lg bg-transparent p-8 shadow-lg md:items-center">
      <h2 className="text-center text-3xl text-primary">
        You have already been registered as a Voter
      </h2>
      <Link
        href="/voters"
        className="mx-auto mt-8 rounded-md bg-primary px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        View Voter List
      </Link>
    </div>
  ) : (
    <VoterForm />
  );
}
