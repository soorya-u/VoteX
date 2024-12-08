"use client";

import { z } from "zod";

const required_error = "This field is required";

export const voterSchema = z.object({
  name: z.string().min(1, required_error),
  gender: z.union([
    z.literal("Male"),
    z.literal("Female"),
    z.literal("Transgender"),
  ]),
  dateOfBirth: z.date({ required_error }),
  email: z.string({ required_error }).email(),
  voterId: z.string().min(1, required_error),
  occupation: z.string().min(1, required_error),
  city: z.string().min(1, required_error),
  state: z.string().min(1, required_error),
  profilePhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
  aadhaarCardPhoto: z
    .instanceof(FileList)
    .refine((arg) => arg.length == 1, required_error),
});

export type TVoter = z.infer<typeof voterSchema>;
