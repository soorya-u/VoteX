import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "./use-context";
import { useToast } from "./use-toast";

import { TVoterUpdate, voterUpdateSchema } from "@/schema/voter";

import { callContract } from "@/lib/stellar";

import { ContractFunctions } from "@/constants/contract";

import { getUpdateVoterFromContract } from "@/utils/type-conversion";

export const useUpdateVoter = () => {
  const { userAsVoter, publicKey, refetchUserVoter } = useUser();

  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<TVoterUpdate>({
    resolver: zodResolver(voterUpdateSchema),
    defaultValues: getUpdateVoterFromContract(userAsVoter),
  });

  const { field: genderController } = useController({
    control,
    name: "gender",
  });

  const { field: dateOfBirthController } = useController({
    control,
    name: "dateOfBirth",
  });

  const onSubmit = async (val: TVoterUpdate) => {
    try {
      if (!publicKey)
        return toast({
          title: "Wallet is not Connected",
          description: "Connect your Wallet to Update your Voter Profile",
          variant: "destructive",
        });

      const { name, email, gender, dateOfBirth, city, state, voterId } = val;

      const location = `${city}, ${state}`;

      await callContract(
        ContractFunctions.UpdateCandidate,
        [
          publicKey,
          name,
          email,
          gender,
          dateOfBirth.getTime(),
          location,
          voterId,
        ],
        publicKey
      );

      toast({
        title: "Voter Profile Update Completed",
        description: "Your Voter Profile has been successfully Completed",
      });

      await refetchUserVoter();

      router.push(`/voters/${publicKey}`);
    } catch (err) {
      console.log("Unable to Update Voter: ", err);
      return toast({
        title: "Something went Wrong!",
        description: "Unable to Update Voter Profile. Try again Later.",
        variant: "destructive",
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    genderController,
    dateOfBirthController,
  };
};
