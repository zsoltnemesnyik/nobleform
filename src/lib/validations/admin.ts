import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Érvénytelen email cím"),
  password: z.string().min(6, "A jelszónak legalább 6 karakterből kell állnia"),
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;