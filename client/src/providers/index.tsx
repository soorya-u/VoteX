import { type PropsWithChildren } from "react";
import ContractProvider from "@/context/contract";
import { Toaster as ToasterProvider } from "@/components/ui/toaster";
import { getContractData } from "@/lib/stellar";
import { ContractVariables } from "@/constants/contract";

export default async function Providers({ children }: PropsWithChildren) {
  const adminAddress = await getContractData(ContractVariables.Admin);

  return (
    <>
      <ContractProvider admin={adminAddress}>{children}</ContractProvider>
      <ToasterProvider />
    </>
  );
}
