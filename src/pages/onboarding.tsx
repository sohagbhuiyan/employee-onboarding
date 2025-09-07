import { useEffect, useState } from "react";
import Stepper from "@/components/Stepper";
import Step1PersonalInfo from "@/components/forms/Step1PersonalInfo";
import Step2JobDetails from "@/components/forms/Step2JobDetails";
import Step3Skills from "@/components/forms/Step3Skills";
import Step4Emergency from "@/components/forms/Step4Emergency";
import Step5Review from "@/components/forms/Step5Review";
import { AllFormData } from "@/types/formTypes";

export default function OnboardingPage() {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AllFormData>({});
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Warn on unsaved changes before closing tab
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!hasUnsaved) return;
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsaved]);

  // Go forward and store data
  const handleNext = <T extends object>(currentStep: number, data?: T) => {
    if (data) {
      setFormData((prev) => ({ ...prev, [`step${currentStep}`]: data }));
      setHasUnsaved(true);
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };

  // Go back and store data
  const handleBack = <T extends object>(currentStep: number, data?: T) => {
    if (data) {
      setFormData((prev) => ({ ...prev, [`step${currentStep}`]: data }));
      setHasUnsaved(true);
    }
    setStep((s) => Math.max(1, s - 1));
  };

  // Final submit
  const handleSubmit = async (payload: AllFormData) => {
    console.log("FINAL SUBMIT:", payload);
    setHasUnsaved(false);
    alert("Form submitted successfully ✅");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Stepper */}
      <Stepper step={step} />

      <div className="mt-6 bg-white shadow rounded p-6">
        {/* Step content */}
        {step === 1 && (
          <Step1PersonalInfo
            defaultValues={formData.step1}
            step={1}
            totalSteps={totalSteps}
            onNext={(data) => handleNext(1, data)}
            onBack={() => handleBack(1)}
          />
        )}
        {step === 2 && (
          <Step2JobDetails
            defaultValues={formData.step2}
            step={2}
            totalSteps={totalSteps}
            onNext={(data) => handleNext(2, data)}
            onBack={() => handleBack(2)}
          />
        )}
        {step === 3 && (
          <Step3Skills
            defaultValues={formData.step3}
            step={3}
            totalSteps={totalSteps}
            onNext={(data) => handleNext(3, data)}
            onBack={() => handleBack(3)}
          />
        )}
        {step === 4 && (
          <Step4Emergency
            defaultValues={formData.step4}
            step={4}
            totalSteps={totalSteps}
            dob={formData.step1?.dob}
            onNext={(data) => handleNext(4, data)}
            onBack={() => handleBack(4)}
          />
        )}
        {step === 5 && (
          <Step5Review
            data={formData}
            step={5}
            totalSteps={totalSteps}
            onBack={() => handleBack(5)}
            onSubmit={handleSubmit}
          />
        )}

        {/* Progress info */}
        <div className="mt-4 text-sm text-gray-500 text-right">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
}
