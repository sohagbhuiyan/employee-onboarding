import { z } from "zod";

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Full Name must contain at least 2 words",
    }),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Phone format: +1-123-456-7890"),
  dob: z.string().refine((val) => {
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    const diff = now.getFullYear() - d.getFullYear();
    // rough check; okay for form validation
    return diff >= 18 || (diff === 17 ? now >= new Date(d.getFullYear() + 18, d.getMonth(), d.getDate()) : false);
  }, "Must be at least 18 years old"),
  profilePicture: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      { message: "Only JPG or PNG allowed" }
    )
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Max file size is 2MB",
    }),
});

export type Step1Data = z.infer<typeof step1Schema>;
