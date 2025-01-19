"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import CandidateForm from "@/components/modules/create-profile/candidate";

export default function CandidateRegistrationPage() {
  const { isCandidateLoading, userAsCandidate } = useUser();

  if (isCandidateLoading)
    return (
      <div className="mx-auto flex min-h-[650px] w-full max-w-3xl items-center justify-center rounded-lg bg-transparent p-8 shadow-lg">
        <Loader2 className="size-24 animate-spin text-primary" />
      </div>
    );

  return userAsCandidate && !(userAsCandidate.status === "NotVer") ? (
    <div className="mx-auto flex min-h-[650px] w-full max-w-3xl flex-col items-start justify-center rounded-lg bg-transparent p-8 shadow-lg md:items-center">
      <h2 className="text-center text-3xl text-primary">
        You have already been registered as a Candidate
      </h2>
      <Link
        href="/candidates"
        className="mx-auto mt-8 rounded-md bg-primary px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        View Candidate List
      </Link>
    </div>
  ) : (
    <CandidateForm />
  );
}
