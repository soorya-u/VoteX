import { AxiosError } from "axios";
import { api } from ".";

import {
  TAPIError,
  TAPIResponse,
  TAPIResponseWithTag,
  TPhoneIdentification,
  TUserType,
} from "@/types/api";

export const identifyNumber = async (
  formData: FormData,
  publicKey: string
): Promise<(TAPIResponseWithTag & TPhoneIdentification) | TAPIError> => {
  try {
    const { data } = await api.post<TAPIResponse & TPhoneIdentification>(
      `/number/identify/${publicKey}`,
      formData
    );

    return { _tag: "success", ...data };
  } catch (err) {
    console.log("Error Identifying number: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Identify Phone Number.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      _tag: "error",
      title: "Something went Wrong!",
      description: "Unable to Identify Number! Please try again Later",
    };
  }
};

export const verifyNumber = async (
  otp: string,
  publicKey: string,
  user_type: TUserType
): Promise<TAPIResponseWithTag | TAPIError> => {
  try {
    const { data } = await api.get<TAPIResponse>(
      `/number/verify/${publicKey}`,
      {
        params: { otp, user_type },
      }
    );

    return { _tag: "success", ...data };
  } catch (err) {
    console.log("Error Verifying Number: ", err);

    if (err instanceof AxiosError && err.response)
      return {
        title: "Could not Verify Phone Number.",
        _tag: "error",
        description: err.response.data?.error,
      };

    return {
      _tag: "error",
      title: "Seomthing went Wrong!",
      description: "Unable to Verify Number! Please try again Later",
    };
  }
};
