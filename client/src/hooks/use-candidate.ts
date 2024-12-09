import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TCandidate, candidateSchema } from "@/schema/candidate";

import { pinProfilePhoto } from "@/api/ipfs";
import { identifyNumber } from "@/api/number";

import { useToast } from "./use-toast";
import { useContract } from "./use-context";

import { callContract } from "@/lib/stellar";

import { UserContractFunctions } from "@/constants/contract";

export const useCandidate = (
  defaultValues: TCandidate | undefined = undefined
) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TCandidate>({
    resolver: zodResolver(candidateSchema),
    defaultValues,
  });

  const { publicKey } = useContract();

  const { field: genderController } = useController<TCandidate>({
    control,
    name: "gender",
  });

  const { toast } = useToast();

  const { field: dateOfBirthController } = useController<TCandidate>({
    control,
    name: "dateOfBirth",
  });

  const onSubmit = async (val: TCandidate) => {
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
      partyName,
      highestStudies,
      specializationOfDegree,
      annualIncome,
      city,
      state,
    } = val;

    const degreeDetails = specializationOfDegree
      ? `${highestStudies} in ${specializationOfDegree}`
      : highestStudies;

    const location = `${city}, ${state}`;

    const photoIpfsHash = resp.ipfs_hash;

    try {
      await callContract(
        UserContractFunctions.RegisterCandidate,
        [
          publicKey,
          name,
          email,
          gender,
          dateOfBirth.getTime(),
          partyName,
          degreeDetails,
          annualIncome,
          location,
          photoIpfsHash,
        ],
        publicKey
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
    isSubmitting,
    phoneNumber,
  };
};
