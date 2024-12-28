import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TVoter, voterSchema } from "@/schema/voter";
import { useToast } from "./use-toast";
import { useUser } from "./use-context";
import { pinProfilePhoto } from "@/api/ipfs";
import { callContract } from "@/lib/stellar";
import { ContractFunctions } from "@/constants/contract";
import { identifyNumber } from "@/api/number";

export const useVoter = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const { publicKey } = useUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TVoter>({ resolver: zodResolver(voterSchema) });

  const { field: genderController } = useController<TVoter>({
    control,
    name: "gender",
  });

  const { field: dateOfBirthController } = useController<TVoter>({
    control,
    name: "dateOfBirth",
  });

  const onSubmit = async (val: TVoter) => {
    if (!publicKey)
      return toast({
        title: "Wallet Not Connected",
        description:
          "Please Connect your Wallet to our App to make further transactions",
        variant: "destructive",
      });

    const profileFormData = new FormData();
    profileFormData.set("file", val.profilePhoto[0]);

    const resp = await pinProfilePhoto(profileFormData);
    if (resp._tag === "error")
      return toast({
        title: resp.title,
        description: resp.description,
        variant: "destructive",
      });

    const {
      name,
      email,
      gender,
      dateOfBirth,
      voterId,
      occupation,
      city,
      state,
    } = val;

    const location = `${city}, ${state}`;

    const photoIpfsHash = resp.ipfs_hash;

    try {
      await callContract(
        ContractFunctions.RegisterVoter,
        [
          publicKey,
          name,
          email,
          gender,
          dateOfBirth.getTime(),
          location,
          voterId,
          occupation,
          photoIpfsHash,
        ],
        publicKey,
      );
    } catch (err) {
      console.error("Unable to Call Contract: ", err);
      return toast({
        title: "Unable to Initiate Contract",
        description: "Something went Wrong while connecting to Stellar!",
        variant: "destructive",
      });
    }

    const formData = new FormData();
    formData.set("file", val.aadhaarCardPhoto[0]);
    const res = await identifyNumber(formData, publicKey);
    if (res._tag === "error")
      return toast({
        title: res.title,
        description: res.description,
        variant: "destructive",
      });

    setPhoneNumber(res.phone_number);

    return;
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    genderController,
    dateOfBirthController,
    phoneNumber,
    isSubmitting,
  };
};
