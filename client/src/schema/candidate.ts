import { z } from "zod";

const required_error = "This field is required";

export const candidateSchema = z.object({
  name: z.string({ required_error }),
  gender: z.union(
    [z.literal("Male"), z.literal("Female"), z.literal("Transgender")],
    { required_error }
  ),
  dateOfBirth: z.date({ required_error }),
  partyName: z.string({ required_error }),
  email: z.string({ required_error }).email(),
  city: z.string({ required_error }),
  state: z.string({ required_error }),
  highestDegree: z.string({ required_error }),
  specializationOfDegree: z.string({ required_error }),
  annualIncome: z.number({ required_error }),
  profilePhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
  aadhaarCardPhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
});

export type TCandidate = z.infer<typeof candidateSchema>;
