import { AxiosError } from "axios";
import { api } from ".";

import {
  TAPIError,
  TAPIResponse,
  TAPIResponseWithTag,
  TFaceRegistration,
} from "@/types/api";

export const pinProfilePhoto = async (
  formData: FormData
): Promise<(TAPIResponseWithTag & TFaceRegistration) | TAPIError> => {
  try {
    const { data } = await api.post<TAPIResponse & TFaceRegistration>(
      `/ipfs/pin`,
      formData
    );

    return { _tag: "success", ...data };
  } catch (err) {
    console.log("Error while Pinning File: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Pin File to Pinata.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      description: "Unable to Pin File! Please try again Later",
      _tag: "error",
    };
  }
};
