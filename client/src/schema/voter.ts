import { z } from "zod";

const required_error = "This field is required";

export const voterSchema = z.object({
  name: z.string({ required_error }),
  gender: z.union(
    [z.literal("Male"), z.literal("Female"), z.literal("Transgender")],
    { required_error }
  ),
  dateOfBirth: z.date({ required_error }),
  email: z.string({ required_error }).email(),
  phoneNumber: z
    .number({ required_error })
    .min(10, { message: "Invalid Phone Number" })
    .max(10, { message: "Invalid Phone Number" }),
  voterId: z.string({ required_error }),
  city: z.string({ required_error }),
  state: z.string({ required_error }),
  profilePhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
  aadhaarCardPhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
});

export type TVoter = z.infer<typeof voterSchema>;
