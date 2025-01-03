import { AxiosError } from "axios";
import { api } from ".";

import {
  TAPIError,
  TAPIResponse,
  TAPIResponseWithTag,
  TFaceRegistration,
} from "@/types/api";

export const registerFace = async (
  formData: FormData,
  publicKey: string,
): Promise<(TAPIResponseWithTag & TFaceRegistration) | TAPIError> => {
  try {
    const { data } = await api.post<TAPIResponse & TFaceRegistration>(
      `/face/register/${publicKey}`,
      formData,
    );
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Registering Face: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Register Face.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Register Face! Please try again Later",
    };
  }
};

export const compareFace = async (
  formData: FormData,
  publicKey: string,
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.post<TAPIResponse>(
      `/face/compare/${publicKey}`,
      formData,
    );
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Comparing Face: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Compare Faces!",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      title: "Something went Wrong!",
      _tag: "error",
      description: "Unable to Compare Face! Please try again Later",
    };
  }
};
