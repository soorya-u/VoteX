import { useContext } from "react";
import { VotingDappContext } from "@/context";
export const useVotingDapp = () => useContext(VotingDappContext);
