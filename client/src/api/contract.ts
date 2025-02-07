import { TAPIError, TAPIResponse, TAPIResponseWithTag } from "@/types/api";
import { api } from ".";
import { AxiosError } from "axios";

export const approveCandidate = async (
  address: string,
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/approve`, {
      params: { address },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Approving Candidate: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Approve Candidate.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Approve Candidate! Please try again Later",
    };
  }
};

export const rejectCandidate = async (
  address: string,
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/reject`, {
      params: { address },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Rejecting Candidate: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Reject Candidate.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Reject Candidate! Please try again Later",
    };
  }
};

export const setVotingPeriod = async (
  start: number,
  end: number,
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/period`, {
      params: { start, end },
    });
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Setting Voting Period: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Set Voting Period.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Set Voting Period! Please try again Later",
    };
  }
};

export const resetContract = async (): Promise<
  TAPIResponseWithTag | TAPIError
> => {
  try {
    const { data } = await api.get<TAPIResponse>(`/contract/reset`);
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Resetting Contract: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Reset Contract.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Reset Contract! Please try again Later",
    };
  }
};
