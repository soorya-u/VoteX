export const networkPassphrase = "Test SDF Network ; September 2015";

export const RPC_URL = "https://soroban-testnet.stellar.org";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";

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
  Voters = "Voters",
  Candidates = "Candids",
  ApprovedVoters = "ApproVot",
  ApprovedCandidates = "ApproCan",
  VotedVoters = "VotVoted",
  Voter = "Voter",
  Candidate = "Candidate",
}
