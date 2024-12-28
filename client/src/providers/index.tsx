import { type PropsWithChildren } from "react";
import UserProvider from "@/context/user";
import { Toaster as ToasterProvider } from "@/components/ui/toaster";
import { getContractData } from "@/lib/stellar";
import { ContractVariables } from "@/constants/contract";
import TanstackQueryProvider from "./TanstackQuery";

export default async function Providers({ children }: PropsWithChildren) {
  const adminAddress = (await getContractData(
    ContractVariables.Admin,
  )) as string;

  return (
    <TanstackQueryProvider>
      <UserProvider admin={adminAddress}>
        {children}
        <ToasterProvider />
      </UserProvider>
    </TanstackQueryProvider>
  );
}
