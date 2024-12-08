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
    const {data} = await api.post<TAPIResponse & TFaceRegistration>(
      `/ipfs/pin`,
      formData
    );

    return { _tag: "success", ...data };
  } catch (err) {
    console.log("Error Registering Face: ", err);

    return {
      title: "Something went Wrong!",
      description: "Unable to Register Face! Please try again Later",
      _tag: "error",
    };
  }
};
