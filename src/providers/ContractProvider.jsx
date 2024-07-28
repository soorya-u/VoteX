"use client";

import { ContractProvider as ContractContextProvider } from "@/context/contract";

export default function ContractProvider({ children }) {
  return <ContractContextProvider>{children}</ContractContextProvider>;
}
