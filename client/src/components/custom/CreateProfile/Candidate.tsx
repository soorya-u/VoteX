"use client";

import { Loader2 } from "lucide-react";

import { FormDate, FormInput, FormSelect } from "@/components/custom/Elements";
import { Button } from "@/components/ui/button";

import { useCandidate } from "@/hooks/use-candidate";
import { TCandidate } from "@/schema/candidate";

import FormModal from "./Modal";

export default function CandidateForm() {
  const {
    errors,
    handleSubmit,
    register,
    dateOfBirthController,
    genderController,
    phoneNumber,
    isSubmitting,
  } = useCandidate();

  return (
    <>
      <FormModal userType="candidate" phoneNumber={phoneNumber} />
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-lg bg-transparent p-8 shadow-lg md:bg-[#3c3b3b7b]"
      >
        <h2 className="mb-8 text-center text-4xl font-bold text-primary">
          Candidate Registration Form
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput<TCandidate>
            id="name"
            label="Name"
            placeholder="Enter your name"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />
          <FormSelect<TCandidate>
            id="gender"
            errors={errors}
            label="Select Gender"
            placeholder="Select Gender"
            control={genderController}
          />
          <FormDate<TCandidate>
            placeholder="Pick a Date"
            id="dateOfBirth"
            label="Date of Birth"
            control={dateOfBirthController}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="partyName"
            label="Party Name"
            placeholder="Enter party name"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="currentIncome"
            label="Annual Income"
            type="number"
            placeholder="Enter your annual income"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="city"
            label="City"
            placeholder="Enter your city"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="state"
            label="State"
            placeholder="Enter your state"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="highestStudies"
            label="Highest Studies"
            placeholder="Enter your highest education"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="specializationOfDegree"
            label="Specialization of Degree"
            placeholder="Enter your specialization"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="profilePhoto"
            label="Profile Photo"
            type="file"
            placeholder="Upload your profile photo"
            register={register}
            errors={errors}
          />
          <FormInput<TCandidate>
            id="aadhaarCardPhoto"
            label="Aadhaar Card Photo"
            type="file"
            placeholder="Uplaod your aadhaar card photo"
            register={register}
            errors={errors}
          />
        </div>
        <Button
          type="submit"
          className="mt-8 w-full bg-primary text-white transition-colors duration-200 hover:bg-[#129992]"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
