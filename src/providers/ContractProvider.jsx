"use client";

import { ContractProvider as ContractContextProvider } from "@/context";

export default function ContractProvider({ children }) {
  return <ContractContextProvider>{children}</ContractContextProvider>;
}
