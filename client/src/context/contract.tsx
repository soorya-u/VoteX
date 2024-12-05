"use client";

import { createContext, type PropsWithChildren } from "react";

export const ContractContext = createContext({});

export default function ContractProvider({ children }: PropsWithChildren) {
  return (
    <ContractContext.Provider value={{}}>{children}</ContractContext.Provider>
  );
}
