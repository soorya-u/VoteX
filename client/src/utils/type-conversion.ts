import { TCandidateUpdate } from "@/schema/candidate";
import { TVoterUpdate } from "@/schema/voter";
import { TContractCandidate, TContractVoter } from "@/types/contract";

export const getUpdateVoterFromContract = (
  v: TContractVoter | undefined
): TVoterUpdate | undefined => {
  if (!v) return undefined;

  const { name, dateOfBirth, email, gender, occupation, location, voterId } = v;

  const [city, state] = location.split(", ");

  return {
    city,
    state,
    dateOfBirth: new Date(dateOfBirth),
    email,
    gender,
    name,
    occupation,
    voterId,
  };
};

export const getUpdateCandidateFromContract = (
  v: TContractCandidate | undefined
): TCandidateUpdate | undefined => {
  if (!v) return undefined;

  const {
    name,
    dateOfBirth,
    email,
    gender,
    location,
    currentIncome,
    degreeDetails,
    partyName,
  } = v;

  const [city, state] = location.split(", ");

  const highestStudies = degreeDetails.includes(" in ")
    ? degreeDetails.split(" in ")[0]
    : degreeDetails;

  const specializationOfDegree = degreeDetails.includes(" in ")
    ? degreeDetails.split(" in ")[1]
    : "";

  return {
    city,
    state,
    dateOfBirth: new Date(dateOfBirth),
    email,
    gender,
    name,
    currentIncome,
    partyName,
    highestStudies,
    specializationOfDegree,
  };
};
