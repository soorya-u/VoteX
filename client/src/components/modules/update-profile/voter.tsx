"use client";

import { Loader2 } from "lucide-react";

import { TVoterUpdate } from "@/schema/voter";
import { useUpdateVoter } from "@/hooks/use-update-voter";

import { FormDate, FormInput, FormSelect } from "@/components/elements";
import { Button } from "@/components/ui/button";

export default function VoterUpdateForm() {
  const {
    errors,
    handleSubmit,
    register,
    dateOfBirthController,
    genderController,
    isSubmitting,
  } = useUpdateVoter();

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-lg bg-transparent p-8 shadow-lg md:bg-[#3c3b3b7b]"
    >
      <h2 className="mb-8 text-center text-4xl font-bold text-primary">
        Voter Registration Form
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput<TVoterUpdate>
          id="name"
          label="Name"
          placeholder="Enter your name"
          register={register}
          errors={errors}
        />
        <FormInput<TVoterUpdate>
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
        />
        <FormSelect<TVoterUpdate>
          id="gender"
          errors={errors}
          label="Select Gender"
          placeholder="Select Gender"
          control={genderController}
        />
        <FormDate<TVoterUpdate>
          placeholder="Pick a Date"
          id="dateOfBirth"
          label="Date of Birth"
          control={dateOfBirthController}
          errors={errors}
        />
        <FormInput<TVoterUpdate>
          id="voterId"
          label="Voter ID"
          placeholder="Enter Voter ID"
          register={register}
          errors={errors}
        />
        <FormInput<TVoterUpdate>
          id="occupation"
          label="Occupation"
          placeholder="Enter Occupation"
          register={register}
          errors={errors}
        />
        <FormInput<TVoterUpdate>
          id="city"
          label="City"
          placeholder="Enter your city"
          register={register}
          errors={errors}
        />
        <FormInput<TVoterUpdate>
          id="state"
          label="State"
          placeholder="Enter your state"
          register={register}
          errors={errors}
        />
      </div>

      <Button
        disabled={isSubmitting}
        type="submit"
        className="mt-8 w-full bg-primary text-white transition-colors duration-200 hover:bg-[#129992]"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}
