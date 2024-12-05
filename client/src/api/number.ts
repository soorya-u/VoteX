import { AxiosError } from "axios";
import { api, APIError } from ".";
import { TAPIResponse, TPhoneIdentification, TUserType } from "@/types/api";

export const identifyNumber = async (
  formData: FormData,
  publicKey: string,
  user_type: TUserType
) => {
  try {
    const { status, data } = await api.post<
      TAPIResponse & TPhoneIdentification
    >(`/number/identify/${publicKey}`, formData, { params: { user_type } });
    return { status, data };
  } catch (err) {
    console.log("Error Identifying number: ", err);

    if (err instanceof AxiosError) {
      const res = err.response;
      return { status: res?.status, data: res?.data };
    } else
      throw new APIError({
        description: "Unable to Identify Number! Please try again Later",
      });
  }
};

export const verifyNumber = async (
  otp: string,
  publicKey: string,
  user_type: TUserType
) => {
  try {
    const { status, data } = await api.get(`/number/verify/${publicKey}`, {
      params: { otp, user_type },
    });

    return { status, data };
  } catch (err) {
    console.log("Error Comparing Face: ", err);
    if (err instanceof AxiosError) {
      const res = err.response;
      return { status: res?.status, data: res?.data };
    } else
      throw new APIError({
        description: "Unable to Compare Face! Please try again Later",
      });
  }
};
