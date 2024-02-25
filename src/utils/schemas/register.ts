import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must have at least 8 characters"),
    passwordRepeat: z
      .string()
      .min(8, "Password must be at least 8 characters and match"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"],
  });
