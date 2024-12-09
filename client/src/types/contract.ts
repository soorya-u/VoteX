type TGender = "Male" | "Female" | "Transgender";
type TStatus = "NotVer" | "Pending" | "Approved" | "Rejected";

export type TContractCandidate = {
  candidateAddress: string;
  currentIncome: number;
  dateOfBirth: number;
  degreeDetails: string;
  email: string;
  gender: TGender;
  location: string;
  name: string;
  partyName: string;
  profileIpfsHash: string;
  status: TStatus;
  voteCount: number;
};

export type TContractVoter = {
  dateOfBirth: string;
  email: string;
  faceIpfsHash: string;
  gender: TGender;
  hasVoted: boolean;
  location: string;
  name: string;
  occupation: string;
  profileIpfsHash: string;
  status: TStatus;
  voterAddress: string;
  voterId: string;
};
