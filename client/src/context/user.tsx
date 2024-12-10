"use client";

import { createContext, useState, type PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";

import { checkConnection, retrievePublicKey } from "@/lib/freighter";
import { getContractData } from "@/lib/stellar";

import { ContractVariables } from "@/constants/contract";
import { TContractCandidate, TContractVoter } from "@/types/contract";

type TUserContract = {
  publicKey: string;
  connectWallet: () => Promise<void>;
  admin: string;
  userAsVoter?: TContractVoter;
  userAsCandidate?: TContractCandidate;
  isVoterLoading: boolean;
  isCandidateLoading: boolean;
  refetchUserVoter: () => Promise<any>;
  refetchUserCandidate: () => Promise<any>;
};

export const UserContext = createContext({
  publicKey: "",
  connectWallet: async () => {},
  admin: "",
  userAsVoter: undefined,
  userAsCandidate: undefined,
} as TUserContract);

export default function UserProvider({
  children,
  admin,
}: PropsWithChildren & { admin: string }) {
  const [userPublicKey, setUserPublicKey] = useState("");

  const { toast } = useToast();

  const {
    data: userAsVoter,
    isPending: isVoterLoading,
    refetch: refetchUserVoter,
  } = useQuery<TContractVoter>({
    queryKey: ["voter"],
    queryFn: async () =>
      await getContractData([ContractVariables.Voter, userPublicKey]),
    enabled: !!userPublicKey,
  });

  const {
    data: userAsCandidate,
    isPending: isCandidateLoading,
    refetch: refetchUserCandidate,
  } = useQuery<TContractCandidate>({
    queryKey: ["candidate"],
    queryFn: async () =>
      await getContractData([ContractVariables.Candidate, userPublicKey]),
    enabled: !!userPublicKey,
  });

  const connectWallet = async () => {
    const connection = await checkConnection();
    if (!connection) {
      toast({
        title: "Unable to Connect to Wallet",
        description: "Something went wrong in Connection",
        variant: "destructive",
      });
      return;
    }
    const publicKey = await retrievePublicKey();
    setUserPublicKey(publicKey);
  };

  return (
    <UserContext.Provider
      value={{
        publicKey: userPublicKey,
        connectWallet,
        admin,
        userAsVoter,
        userAsCandidate,
        isVoterLoading,
        isCandidateLoading,
        refetchUserCandidate,
        refetchUserVoter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
