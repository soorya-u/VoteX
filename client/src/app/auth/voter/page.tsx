"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

import { useUser } from "@/hooks/use-context";

import VoterForm from "@/components/custom/CreateProfile/Voter";

export default function CandidateRegistrationPage() {
  const { isVoterLoading, userAsVoter } = useUser();

  if (isVoterLoading)
    return (
      <div className="w-full min-h-[650px] max-w-3xl flex justify-center items-center mx-auto bg-transparent p-8 rounded-lg shadow-lg">
        <Loader2 className="animate-spin size-24 text-primary" />
      </div>
    );

  return !!userAsVoter ? (
    <div className="w-full min-h-[650px] max-w-3xl flex items-start flex-col justify-center md:items-center mx-auto  bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center">
        You have already been registered as a Voter
      </h2>
      <Link
        href="/voters"
        className="mt-8 mx-auto bg-primary rounded-md text-center py-2 px-4 hover:bg-[#e62d4e] text-white transition-colors duration-200"
      >
        View Voter List
      </Link>
    </div>
  ) : (
    <VoterForm />
  );
}
