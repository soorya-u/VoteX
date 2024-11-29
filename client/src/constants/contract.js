import { Contract, rpc } from "@stellar/stellar-sdk";

export const ownerPublicKey = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export const server = new rpc.Server("https://soroban-testnet.stellar.org", {
  allowHttp: true,
});

export const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ID);
export const networkPassphrase = "Test SDF Network ; September 2015";

export const ContractFunctions = {
  changeOwner: "change_owner",
  resetContract: "reset_contract",

  setVotingPeriod: "set_voting_period",

  registerVoter: "register_voter",
  updateVoter: "update_voter",
  approveVoter: "approve_voter",
  rejectVoter: "reject_voter",

  registerCandidate: "register_candidate",
  updateCandidate: "update_candidate",
  approveCandidate: "approve_candidate",
  rejectCandidate: "reject_candidate",

  getAllVotersWhoVoted: "get_all_voters_who_voted",

  giveVote: "vote",
  getCurrentVotingStatus: "get_current_voting_status",
  getWinningCandidate: "get_winning_candidate",
};

export const ContractVariables = {
  owner: "Owner",
  startTime: "StartTime",
  endTime: "EndTime",
  registeredVoters: "RegVot",
  voter: "Voter",
  candidate: "Candidate",
  registeredCandidates: "RegCan",
  approvedCandidates: "ApproCan",
  approvedVoters: "ApproVot",
  votedVoters: "VotVoted",
  totalVoters: "votIdCntr",
  totalCandidates: "canIdCntr",
};
