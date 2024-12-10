"use client";

import { Loader2 } from "lucide-react";

import { TCandidateUpdate } from "@/schema/candidate";
import { useUpdateCandidate } from "@/hooks/use-update-candidate";

import { FormDate, FormInput, FormSelect } from "@/components/custom/Elements";
import { Button } from "@/components/ui/button";

export default function CandidateUpdateForm() {
  const {
    errors,
    handleSubmit,
    register,
    dateOfBirthController,
    genderController,
    isSubmitting,
  } = useUpdateCandidate();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto md:bg-[#3c3b3b7b] bg-transparent p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-4xl font-bold mb-8 text-primary text-center">
        Update your Candidate Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput<TCandidateUpdate>
          id="name"
          label="Name"
          placeholder="Enter your name"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
        />
        <FormSelect<TCandidateUpdate>
          id="gender"
          errors={errors}
          label="Select Gender"
          placeholder="Select Gender"
          control={genderController}
        />
        <FormDate<TCandidateUpdate>
          placeholder="Pick a Date"
          id="dateOfBirth"
          label="Date of Birth"
          control={dateOfBirthController}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="partyName"
          label="Party Name"
          placeholder="Enter party name"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="currentIncome"
          label="Annual Income"
          type="number"
          placeholder="Enter your annual income"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="city"
          label="City"
          placeholder="Enter your city"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="state"
          label="State"
          placeholder="Enter your state"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="highestStudies"
          label="Highest Studies"
          placeholder="Enter your highest education"
          register={register}
          errors={errors}
        />
        <FormInput<TCandidateUpdate>
          id="specializationOfDegree"
          label="Specialization of Degree"
          placeholder="Enter your specialization"
          register={register}
          errors={errors}
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-primary hover:bg-[#e62d4e] text-white transition-colors duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}
