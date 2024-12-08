import { useContext } from "react";
import { ContractContext } from "@/context/contract";

export const useContract = () => useContext(ContractContext);
