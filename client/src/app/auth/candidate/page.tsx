"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useContract } from "@/hooks/use-context";

import { getContractData } from "@/lib/stellar";

import { ContractVariables } from "@/constants/contract";

import CandidateForm from "@/components/custom/Form/Candidate";
import { Button } from "@/components/ui/button";

export default function CandidateRegistrationPage() {
  const { publicKey } = useContract();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getContractData([ContractVariables.Candidate, publicKey]);
        setIsRegistered(true);
      } catch {
        setIsRegistered(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [publicKey]);

  if (loading)
    return (
      <div className="w-full min-h-[650px] max-w-3xl flex justify-center items-center mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg">
        <Loader2 className="animate-spin size-24 text-primary" />
      </div>
    );

  return isRegistered ? (
    <div className="w-full min-h-[650px] max-w-3xl flex items-start flex-col justify-center md:items-center mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl text-primary text-center">
        You have already been registered as a Candidate
      </h2>
      <Button className="w-full mt-8 bg-[#F73859] hover:bg-[#e62d4e] text-white transition-colors duration-200">
        View Candidate List
      </Button>
    </div>
  ) : (
    <CandidateForm />
  );
}
