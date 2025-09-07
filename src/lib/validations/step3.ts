import { z } from "zod";

export const step3Schema = z.object({
  skills: z.array(z.string()).min(3, "Select at least 3 skills"),
  experiences: z.record(z.string(), z.string().optional()),
  preferredHours: z.object({
    start: z.string(),
    end: z.string(),
  }).refine(v => v.start < v.end, { message: "Start time must be before end time" }),
  remotePreference: z.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  notes: z.string().max(500, "Max 500 characters").optional(),
});

export type Step3Data = z.infer<typeof step3Schema>;
