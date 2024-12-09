"use client";

import { createContext, useState, type PropsWithChildren } from "react";

import { checkConnection, retrievePublicKey } from "@/lib/freighter";
import { useToast } from "@/hooks/use-toast";

export const ContractContext = createContext({
  publicKey: "",
  connectWallet: async () => {},
  admin: "",
});

export default function ContractProvider({
  children,
  admin,
}: PropsWithChildren & { admin: string }) {
  const [userPublicKey, setUserPublicKey] = useState("");

  const { toast } = useToast();

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
    <ContractContext.Provider
      value={{ publicKey: userPublicKey, connectWallet, admin }}
    >
      {children}
    </ContractContext.Provider>
  );
}
