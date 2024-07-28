import { useContext } from "react";
import { ContractContext } from "@/context";
export const useVotingDapp = () => useContext(ContractContext);
