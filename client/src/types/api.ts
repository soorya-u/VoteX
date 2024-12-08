type TAPISuccessTag = { _tag: "success" };
type TAPIFailureTag = { _tag: "error" };

export type TAPIResponse = { message: string };

export type TFaceRegistration = { ipfs_hash: string };
export type TPhoneIdentification = { phone_number: string };

export type TUserType = "voter" | "candidate";

export type TAPIError = { title: string; description: string } & TAPIFailureTag;

export type TAPIResponseWithTag = TAPIResponse & TAPISuccessTag;
