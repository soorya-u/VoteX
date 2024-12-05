export const networkPassphrase = "Test SDF Network ; September 2015";

export const RPC_URL = "https://soroban-testnet.stellar.org"

export enum ContractFunctions {
  ChangeOwner = "change_owner",
  ResetContract = "reset_contract",

  SetVotingPeriod = "set_voting_period",

  RegisterVoter = "register_voter",
  UpdateVoter = "update_voter",
  ApproveVoter = "approve_voter",
  RejectVoter = "reject_voter",

  RegisterCandidate = "register_candidate",
  UpdateCandidate = "update_candidate",
  ApproveCandidate = "approve_candidate",
  RejectCandidate = "reject_candidate",

  GetAllVotersWhoVoted = "get_all_voters_who_voted",

  GiveVote = "vote",
  GetCurrentVotingStatus = "get_current_voting_status",
  GetWinningCandidate = "get_winning_candidate",
}

export enum ContractVariables {
  Owner = "Owner",
  StartTime = "StartTime",
  EndTime = "EndTime",
  RegisteredVoters = "RegVot",
  Voter = "Voter",
  Candidate = "Candidate",
  RegisteredCandidates = "RegCan",
  ApprovedCandidates = "ApproCan",
  ApprovedVoters = "ApproVot",
  VotedVoters = "VotVoted",
  TotalVoters = "votIdCntr",
  TotalCandidates = "canIdCntr",
}
