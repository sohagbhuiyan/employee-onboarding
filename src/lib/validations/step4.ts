import { z } from "zod";

export const step4Schema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phone: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid phone format"),
  guardianContact: z.object({
    name: z.string().min(1, "Guardian name required"),
    phone: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid phone format"),
  }).optional(),
});

export type Step4Data = z.infer<typeof step4Schema>;
