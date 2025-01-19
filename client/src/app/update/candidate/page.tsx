"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import CandidateUpdateForm from "@/components/custom/update-profile/candidate";

export default function CandidateUpdationPage() {
  const { isCandidateLoading, userAsCandidate } = useUser();

  if (isCandidateLoading)
    return (
      <div className="mx-auto flex min-h-[650px] w-full max-w-3xl items-center justify-center rounded-lg bg-transparent p-8 shadow-lg">
        <Loader2 className="size-24 animate-spin text-primary" />
      </div>
    );

  return userAsCandidate ? (
    <CandidateUpdateForm />
  ) : (
    <div className="mx-auto flex min-h-[650px] w-full max-w-3xl flex-col items-start justify-center rounded-lg bg-transparent p-8 shadow-lg md:items-center">
      <h2 className="text-center text-3xl text-primary">
        You have not been registered as a Candidate
      </h2>
      <Link
        href="/auth/candidate"
        className="mt-8 w-full bg-primary text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        Register as a Candidate
      </Link>
    </div>
  );
}
