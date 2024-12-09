export const networkPassphrase = "Test SDF Network ; September 2015";

export const RPC_URL = "https://soroban-testnet.stellar.org";

export enum ContractFunctions {
  RegisterVoter = "register_voter",
  UpdateVoter = "update_voter",
  RegisterCandidate = "register_candidate",
  UpdateCandidate = "update_candidate",
  GiveVote = "vote",
}

export enum ContractVariables {
  Admin = "Admin",
  StartTime = "StartTime",
  EndTime = "EndTime",
  RegisteredVoters = "RegVot",
  RegisteredCandidates = "RegCan",
  ApprovedVoters = "ApproVot",
  ApprovedCandidates = "ApproCan",
  VotedVoters = "VotVoted",
  Voter = "Voter",
  Candidate = "Candidate",
}
