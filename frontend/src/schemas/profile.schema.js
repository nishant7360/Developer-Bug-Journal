import { z } from "zod";

export const updateProfileSchema = z.object({
  bio: z
    .string()
    .max(300, { error: "Bio must be under 300 characters" })
    .optional(),
});
