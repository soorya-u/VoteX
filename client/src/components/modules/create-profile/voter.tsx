"use client";

import { Loader2 } from "lucide-react";

import { useVoter } from "@/hooks/use-voter";
import { TVoter } from "@/schema/voter";

import { FormDate, FormInput, FormSelect } from "@/components/elements";
import { Button } from "@/components/ui/button";
import FormModal from "./modal";

export default function VoterForm() {
  const {
    errors,
    handleSubmit,
    register,
    dateOfBirthController,
    genderController,
    phoneNumber,
    isSubmitting,
  } = useVoter();

  return (
    <>
      <FormModal phoneNumber={phoneNumber} userType="voter" />
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-lg bg-transparent p-8 shadow-lg md:bg-[#3c3b3b7b]"
      >
        <h2 className="mb-8 text-center text-4xl font-bold text-primary">
          Voter Registration Form
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput<TVoter>
            id="name"
            label="Name"
            placeholder="Enter your name"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />
          <FormSelect<TVoter>
            id="gender"
            errors={errors}
            label="Select Gender"
            placeholder="Select Gender"
            control={genderController}
          />
          <FormDate<TVoter>
            placeholder="Pick a Date"
            id="dateOfBirth"
            label="Date of Birth"
            control={dateOfBirthController}
            errors={errors}
          />
          <FormInput<TVoter>
            id="voterId"
            label="Voter ID"
            placeholder="Enter Voter ID"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="occupation"
            label="Occupation"
            placeholder="Enter Occupation"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="city"
            label="City"
            placeholder="Enter your city"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="state"
            label="State"
            placeholder="Enter your state"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="profilePhoto"
            label="Profile Photo"
            type="file"
            placeholder="Upload your profile photo"
            register={register}
            errors={errors}
          />
          <FormInput<TVoter>
            id="aadhaarCardPhoto"
            label="Aadhaar Card Photo"
            type="file"
            placeholder="Uplaod your aadhaar card photo"
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
    </>
  );
}
