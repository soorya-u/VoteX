"use client";

import { checkConnection, retrievePublicKey } from "@/lib/freighter";
import { Address } from "@stellar/stellar-sdk";
import { useRouter } from "next/navigation";
import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export const ContractContext = createContext({
  publicKey: "",
  connectWallet: async () => {},
});

export default function ContractProvider({ children }: PropsWithChildren) {
  const route = useRouter();

  const [userPublicKey, setUserPublicKey] = useState("");

  const connectWallet = async () =>
    (await checkConnection()) && setUserPublicKey(await retrievePublicKey());

  return (
    <ContractContext.Provider
      value={{ publicKey: userPublicKey, connectWallet }}
    >
      {children}
    </ContractContext.Provider>
  );
}
