import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "./use-context";
import { useToast } from "./use-toast";

import { TCandidateUpdate, candidateUpdateSchema } from "@/schema/candidate";

import { callContract } from "@/lib/stellar";

import { ContractFunctions } from "@/constants/contract";

import { getUpdateCandidateFromContract } from "@/utils/type-conversion";

export const useUpdateCandidate = () => {
  const { userAsCandidate, publicKey, refetchUserVoter } = useUser();

  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    control,
  } = useForm<TCandidateUpdate>({
    resolver: zodResolver(candidateUpdateSchema),
    defaultValues: getUpdateCandidateFromContract(userAsCandidate),
  });

  const { field: genderController } = useController({
    control,
    name: "gender",
  });

  const { field: dateOfBirthController } = useController({
    control,
    name: "dateOfBirth",
  });

  const onSubmit = async (val: TCandidateUpdate) => {
    try {
      if (!publicKey)
        return toast({
          title: "Wallet is not Connected",
          description: "Connect your Wallet to Update your Voter Profile",
          variant: "destructive",
        });

      const {
        name,
        email,
        gender,
        dateOfBirth,
        city,
        state,
        currentIncome,
        highestStudies,
        partyName,
        specializationOfDegree,
      } = val;

      const location = `${city}, ${state}`;

      const degreeDetails = !!specializationOfDegree
        ? `${highestStudies} in ${specializationOfDegree}`
        : highestStudies;

      await callContract(
        ContractFunctions.UpdateCandidate,
        [
          publicKey,
          name,
          email,
          gender,
          dateOfBirth.getTime(),
          partyName,
          degreeDetails,
          location,
          currentIncome,
        ],
        publicKey
      );

      toast({
        title: "Voter Profile Update Completed",
        description: "Your Voter Profile has been successfully Completed",
      });

      await refetchUserVoter();

      router.push(`/candidates/${publicKey}`);
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
