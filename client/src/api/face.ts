import { AxiosError } from "axios";
import { api, APIError } from ".";
import { TAPIResponse, TFaceRegistration } from "@/types/api";

export const registerFace = async (formData: FormData, publicKey: string) => {
  try {
    const { status, data } = await api.post<TAPIResponse & TFaceRegistration>(
      `/face/register/${publicKey}`,
      formData
    );
    return { status, data };
  } catch (err) {
    console.log("Error Registering Face: ", err);
    if (err instanceof AxiosError) {
      const res = err.response;
      return { status: res?.status, data: res?.data };
    } else
      throw new APIError({
        description: "Unable to Register Face! Please try again Later",
      });
  }
};

export const compareFace = async (formData: FormData, publicKey: string) => {
  try {
    const { status, data } = await api.post(
      `/face/compare/${publicKey}`,
      formData
    );
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
