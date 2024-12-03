import { type PropsWithChildren } from "react";
import ContractProvider from "@/context/contract";

export default function Providers({ children }: PropsWithChildren) {
  return <ContractProvider>{children}</ContractProvider>;
}
