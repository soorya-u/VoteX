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
  publicKey: string,
  user_type: TUserType
): Promise<(TAPIResponseWithTag & TPhoneIdentification) | TAPIError> => {
  try {
    const { data } = await api.post<TAPIResponse & TPhoneIdentification>(
      `/number/identify/${publicKey}`,
      formData,
      { params: { user_type } }
    );
    return { ...data, _tag: "success" };
  } catch (err) {
    console.log("Error Identifying number: ", err);

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
    console.log("Error Comparing Face: ", err);

    return {
      _tag: "error",
      title: "Seomthing went Wrong!",
      description: "Unable to Compare Face! Please try again Later",
    };
  }
};
