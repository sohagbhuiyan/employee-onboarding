import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, Step4Data } from "@/lib/validations/step4";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormNavigation from "./FormNavigation";

type Props = {
  defaultValues?: Partial<Step4Data>;
  dob?: string;
  onNext: (data: Step4Data) => void;
  onBack?: () => void;
  step: number;
  totalSteps: number;
};

export default function Step4Emergency({
  defaultValues,
  dob,
  onNext,
  onBack,
  step,
  totalSteps,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      contactName: "",
      relationship: "",
      phone: "",
      guardianContact: { name: "", phone: "" },
      ...defaultValues, // ✅ safely merged Partial<Step4Data>
    },
    mode: "onTouched",
  });

  const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 99;

  const submit = (data: Step4Data) => onNext(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* Contact Name */}
      <div>
        <Label>Contact Name</Label>
        <Input {...register("contactName")} />
        {errors.contactName && (
          <p className="text-red-500 text-sm">{errors.contactName.message}</p>
        )}
      </div>

      {/* Relationship */}
      <div>
        <Label>Relationship</Label>
        <Input {...register("relationship")} />
        {errors.relationship && (
          <p className="text-red-500 text-sm">{errors.relationship.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label>Phone</Label>
        <Input {...register("phone")} placeholder="+1-123-456-7890" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Guardian Info if age < 21 */}
      {age < 21 && (
        <div className="border rounded p-3 bg-yellow-50 space-y-2">
          <div>
            <Label>Guardian Name</Label>
            <Input {...register("guardianContact.name")} className="mt-1" />
          </div>
          <div>
            <Label>Guardian Phone</Label>
            <Input
              {...register("guardianContact.phone")}
              placeholder="+1-123-456-7890"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <FormNavigation
        step={step}
        totalSteps={totalSteps}
        isSubmitting={isSubmitting}
        onBack={onBack}
        onNext={handleSubmit(submit)}
      />
    </form>
  );
}
