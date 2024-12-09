"use client";

import { z } from "zod";

const required_error = "This field is required";

export const candidateSchema = z.object({
  name: z.string().min(1, required_error),
  gender: z.union([
    z.literal("Male"),
    z.literal("Female"),
    z.literal("Transgender"),
  ]),
  dateOfBirth: z.date({ required_error }),
  partyName: z.string().min(1, required_error),
  email: z.string().email(),
  city: z.string().min(1, required_error),
  state: z.string().min(1, required_error),
  highestStudies: z.string().min(1, required_error),
  specializationOfDegree: z.string().optional(),
  annualIncome: z.coerce.number().min(1, required_error),
  profilePhoto: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine((arg) => arg.length == 1, required_error),
  aadhaarCardPhoto: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine((arg) => arg.length == 1, required_error),
});

export type TCandidate = z.infer<typeof candidateSchema>;
