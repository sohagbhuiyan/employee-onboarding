import type { Step1Data } from "@/lib/validations/step1";
import type { Step2Data } from "@/lib/validations/step2";
import type { Step3Data } from "@/lib/validations/step3";
import type { Step4Data } from "@/lib/validations/step4";

export type AllFormData = {
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
  step4?: Step4Data;
};
