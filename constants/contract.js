import { Contract, SorobanRpc } from "@stellar/stellar-sdk";

export const ownerPublicKey = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export const server = new SorobanRpc.Server(
  "https://soroban-testnet.stellar.org",
  {
    allowHttp: true,
  }
);

export const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID);
export const networkPassphrase = "Test SDF Network ; September 2015";

export const ContractFunctions = {
  changeOwner: "change_owner",
  resetContract: "reset_contract",

  setVotingPeriod: "set_voting_period",
  getVotingTime: "get_voting_time",

  registerVoter: "register_voter",
  getVoter: "get_voter",
  updateVoter: "update_voter",
  approveVoter: "approve_voter",
  rejectVoter: "reject_voter",

  registerCandidate: "register_candidate",
  getCandidate: "get_candidate",
  updateCandidate: "update_candidate",
  approveCandidate: "approve_candidate",
  rejectCandidate: "reject_candidate",

  getAllRegisteredCandidates: "get_all_registered_candidates",
  getAllApprovedCandidates: "get_all_approved_candidates",

  getAllRegisteredVoters: "get_all_registered_voters",
  getAllApprovedVoters: "get_all_approved_voters",
  getAllVotersWhoVoted: "get_all_voters_who_voted",

  giveVote: "vote",
  getCurrentVotingStatus: "get_current_voting_status",
  getWinningCandidate: "get_winning_candidate",
};
