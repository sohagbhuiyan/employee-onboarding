import { z } from "zod";

const departmentEnum = z.enum(["Engineering", "Marketing", "Sales", "HR", "Finance"]);

export const step2Schema = z
  .object({
    department: departmentEnum,
    positionTitle: z.string().min(3, "Position must be at least 3 characters"),
    startDate: z.string().refine((val, ctx) => {
      const today = new Date();
      const start = new Date(val + "T00:00:00");
      if (Number.isNaN(start.getTime())) return false;

      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 90);

      if (start < startOfDay(today) || start > startOfDay(maxDate)) return false;

      // If HR or Finance: no Friday(5) or Saturday(6)
      const dept = ctx.parent?.department;
      const day = start.getDay(); // 0=Sun ... 5=Fri 6=Sat
      if ((dept === "HR" || dept === "Finance") && (day === 5 || day === 6)) {
        return false;
      }

      return true;
    }, "Invalid start date (past / beyond 90 days / weekend not allowed for HR/Finance)"),
    jobType: z.enum(["Full-time", "Part-time", "Contract"]),
    salary: z.number().optional(),
    manager: z.string().min(1, "Manager is required"),
  })
  .superRefine((val, ctx) => {
    const { jobType, salary } = val;

    if (jobType === "Full-time") {
      if (salary === undefined || Number.isNaN(salary)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Salary required for Full-time",
          path: ["salary"],
        });
      } else if (salary < 30000 || salary > 200000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Full-time salary must be between 30,000 and 200,000",
          path: ["salary"],
        });
      }
    } else if (jobType === "Contract") {
      if (salary === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Salary required for Contract (150/hour)",
          path: ["salary"],
        });
      } else if (salary !== 150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contract salary must be exactly 150/hour",
          path: ["salary"],
        });
      }
    } else if (jobType === "Part-time") {
      if (salary !== undefined && (salary < 10000 || salary > 120000)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Part-time salary (if provided) must be between 10,000 and 120,000",
          path: ["salary"],
        });
      }
    }
  });

// Helper function
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Type inference
export type Step2Data = z.infer<typeof step2Schema>;
