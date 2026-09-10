import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be under 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores allowed",
      ),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({
    error: "Enter a valid email address",
  }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});
