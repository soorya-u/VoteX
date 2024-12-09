import { TAPIError, TAPIResponse, TAPIResponseWithTag } from "@/types/api";
import { api } from ".";

export const approveCandidate = async (
  address: string
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/approve`, {
      params: { address },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Approving Candidate: ", err);

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Register Face! Please try again Later",
    };
  }
};

export const rejectCandidate = async (
  address: string
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/reject`, {
      params: { address },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Rejecting Candidate: ", err);

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Register Face! Please try again Later",
    };
  }
};

export const setVotingPeriod = async (
  start: number,
  end: number
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/period`, {
      params: { start, end },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Setting Voting Period: ", err);

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Register Face! Please try again Later",
    };
  }
};

export const resetContract = async (): Promise<
  TAPIResponseWithTag | TAPIError
> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/period`);
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Resetting Contract: ", err);

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Register Face! Please try again Later",
    };
  }
};
