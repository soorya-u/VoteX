export const networkPassphrase = "Test SDF Network ; September 2015";

export const RPC_URL = "https://soroban-testnet.stellar.org";

export enum AdminContractFunctions {
  ChangeAdmin = "change_admin",
  ResetContract = "reset_contract",
  SetVoterAsApproved = "set_voter_as_approved",
  SetCandidateAsVerified = "set_candidate_as_verified",
  SetVotingPeriod = "set_voting_period",
  ApproveCandidate = "approve_candidate",
  RejectCandidate = "reject_candidate",
}

export enum UserContractFunctions {
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
