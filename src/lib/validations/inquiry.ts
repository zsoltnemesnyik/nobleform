import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z.
    email("Please enter a valid email address"),
  phone: z.
    string().
    optional(),
  message: z
    .string()
    .max(500, "Message is too long")
    .optional(),
});

export type InquirySchema = z.infer<typeof inquirySchema>;