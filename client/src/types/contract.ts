export type TContractCandidate = {
  candidate_address: string;
  name: string;
  gender: string;
  date_of_birth: number;
  party_name: string;
  email: string;
  location: string;
  degree_details: string;
  current_income: number;
  status: string;
  vote_count: number;
};

export type TContractVoter = {
  voter_address: string;
  name: string;
  gender: string;
  date_of_birth: number;
  email: string;
  voter_id: string;
  occupation: string;
  location: string;
  face_ipfs_hash: string;
  status: string;
  has_voted: boolean;
};

type TContract = TContractVoter;
