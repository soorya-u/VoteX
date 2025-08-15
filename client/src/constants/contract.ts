export const networkPassphrase = process.env.NETWORK_PASSPHASE ?? "Test SDF Network ; September 2015";
export const SOROBAN_RPC_URL = process.env.SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org";
export const HORIZON_URL = process.env.HORIZON_URL ?? "https://horizon-testnet.stellar.org";

console.log({ NETWORK_PASSPHASE: process.env.NETWORK_PASSPHASE, SOROBAN_RPC_URL: process.env.SOROBAN_RPC_URL, HORIZON_URL: process.env.HORIZON_URL })

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
