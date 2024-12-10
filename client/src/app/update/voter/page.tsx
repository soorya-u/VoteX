"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import VoterUpdateForm from "@/components/custom/UpdateProfile/Voter";

export default function CandidateUpdationPage() {
  const { isVoterLoading, userAsVoter } = useUser();

  if (isVoterLoading)
    return (
      <div className="w-full min-h-[650px] max-w-3xl flex justify-center items-center mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg">
        <Loader2 className="animate-spin size-24 text-primary" />
      </div>
    );

  return userAsVoter ? (
    <VoterUpdateForm />
  ) : (
    <div className="w-full min-h-[650px] max-w-3xl flex items-start flex-col justify-center md:items-center mx-auto bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center">
        You have not been registered as a Voter
      </h2>
      <Link
        href="/auth/voter"
        className="w-full mt-8 bg-primary hover:bg-[#e62d4e] text-white transition-colors duration-200"
      >
        Register as a Voter
      </Link>
    </div>
  );
}
