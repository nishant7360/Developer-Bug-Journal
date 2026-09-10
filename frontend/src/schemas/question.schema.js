import { X } from "lucide-react";
import { z } from "zod";

export const createQuestionSchema = z.object({
  title: z
    .string()
    .min(10, { error: "Title must be at least 10 characters" })
    .max(150),
  description: z
    .string()
    .min(20, { error: "Description must be at least 20 characters" }),
  errorMessage: z.string().optional(),
  technologies: z
    .array(z.string())
    .min(1, { error: "Add at least 1 technologies" }),
  tags: z
    .array(z.string())
    .min(1, { error: "Add at least 1 tag" })
    .max(5, { error: "Max 5 tags are allowed" }),
});
