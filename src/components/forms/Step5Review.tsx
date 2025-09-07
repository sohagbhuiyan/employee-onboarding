import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import FormNavigation from "./FormNavigation";
import {Card, CardContent} from "@/components/ui/card";

type Props = {
  data: any;
  onBack?: () => void;
  onSubmit: (payload: any) => void;
  step: number;
  totalSteps: number;
};

export default function Step5Review({
  data,
  onBack,
  onSubmit,
  step,
  totalSteps,
}: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalize = async () => {
    if (!confirmed) return;
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        submittedAt: new Date().toISOString(),
      };
      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        finalize();
      }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold">Review Your Information</h2>

      <div className="space-y-4">
        {/* Step 1 – Personal Info */}
        <Card>
          <CardContent className="p-4 space-y-1">
            <h3 className="font-medium text-gray-700">Personal Information</h3>
            <p><span className="font-semibold">Full Name:</span> {data.step1?.fullName}</p>
            <p><span className="font-semibold">Email:</span> {data.step1?.email}</p>
            <p><span className="font-semibold">Phone:</span> {data.step1?.phone}</p>
            <p><span className="font-semibold">DOB:</span> {data.step1?.dob}</p>
          </CardContent>
        </Card>

        {/* Step 2 – Job Details */}
        <Card>
          <CardContent className="p-4 space-y-1">
            <h3 className="font-medium text-gray-700">Job Details</h3>
            <p><span className="font-semibold">Department:</span> {data.step2?.department}</p>
            <p><span className="font-semibold">Position:</span> {data.step2?.positionTitle}</p>
            <p><span className="font-semibold">Job Type:</span> {data.step2?.jobType}</p>
            <p><span className="font-semibold">Manager:</span> {data.step2?.manager}</p>
          </CardContent>
        </Card>

        {/* Step 3 – Skills */}
        <Card>
          <CardContent className="p-4 space-y-1">
            <h3 className="font-medium text-gray-700">Skills & Preferences</h3>
            <p><span className="font-semibold">Skills:</span> {data.step3?.skills?.join(", ")}</p>
            <p><span className="font-semibold">Preferred Hours:</span> {data.step3?.preferredHours?.start} – {data.step3?.preferredHours?.end}</p>
            <p><span className="font-semibold">Remote Preference:</span> {data.step3?.remotePreference}%</p>
            {data.step3?.managerApproved && <p>Manager Approved</p>}
            {data.step3?.notes && <p><span className="font-semibold">Notes:</span> {data.step3?.notes}</p>}
          </CardContent>
        </Card>

        {/* Step 4 – Emergency Contact */}
        <Card>
          <CardContent className="p-4 space-y-1">
            <h3 className="font-medium text-gray-700">Emergency Contact</h3>
            <p><span className="font-semibold">Name:</span> {data.step4?.contactName}</p>
            <p><span className="font-semibold">Relationship:</span> {data.step4?.relationship}</p>
            <p><span className="font-semibold">Phone:</span> {data.step4?.phone}</p>
            {data.step4?.guardianContact && (
              <div>
                <p className="font-semibold mt-2">Guardian:</p>
                <p>{data.step4?.guardianContact?.name} ({data.step4?.guardianContact?.phone})</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={confirmed}
          onCheckedChange={(val) => setConfirmed(Boolean(val))}
        />
        <span>I confirm all information is correct</span>
      </div>

      <FormNavigation
        step={step}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        onBack={onBack}
        onNext={finalize}
        nextLabel="Submit"
        disableNext={!confirmed || isSubmitting}
      />
    </form>
  );
}
