import { z } from "zod";

const required_error = "This field is required";

export const candidateSchema = z
  .object({
    name: z.string({ required_error }),
    gender: z.union(
      [z.literal("Male"), z.literal("Female"), z.literal("Transgender")],
      { required_error }
    ),
    dateOfBirth: z.date({ required_error }),
    constituency: z.string({ required_error }),
    partyName: z.string({ required_error }),
    email: z.string({ required_error }).email(),
    permanentAddress: z.string({ required_error }),
    city: z.string({ required_error }),
    state: z.string({ required_error }),
    highestDegree: z.string({ required_error }),
    specializationOfDegree: z.string({ required_error }),
    hasCriminalRecord: z.boolean({ required_error }),
    criminalCaseNumber: z.number().optional(),
    annualIncome: z.number({ required_error }),
    currentOccupation: z.string({ required_error }),
    profilePhoto: z
      .instanceof(FileList)
      .refine((arg) => arg.length == 1, required_error),
    aadhaarCardPhoto: z
      .instanceof(FileList)
      .refine((arg) => arg.length == 1, required_error),
  })
  .refine(
    (arg) => arg.hasCriminalRecord && arg.criminalCaseNumber,
    "Criminal Case Number is required"
  );

export type TCandidate = z.infer<typeof candidateSchema>;
