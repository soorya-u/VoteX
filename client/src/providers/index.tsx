import { type PropsWithChildren } from "react";
import ContractProvider from "@/context/contract";
import { Toaster as ToasterProvider } from "@/components/ui/toaster";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ContractProvider>{children}</ContractProvider>
      <ToasterProvider />
    </>
  );
}
