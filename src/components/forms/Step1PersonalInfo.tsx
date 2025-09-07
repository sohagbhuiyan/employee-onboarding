import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1Data } from "@/lib/validations/step1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import FormNavigation from "@/components/forms/FormNavigation";

type Props = {
  defaultValues?: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
  onBack?: () => void; 
  step: number;
  totalSteps: number;
};

export default function Step1PersonalInfo({
  defaultValues,
  onNext,
  onBack,
  step,
  totalSteps,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: defaultValues as any,
    mode: "onTouched",
  });

const submit = (data: Step1Data) => {
  onNext(data);
};


  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" placeholder="John Doe" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="+1-123-456-7890" {...register("phone")} />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* DOB */}
      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" {...register("dob")} />
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}
      </div>

      {/* Profile Picture */}
      <div>
        <Label htmlFor="profilePicture">Profile Picture (optional)</Label>
        <Input
          id="profilePicture"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("profilePicture", file, { shouldValidate: true });
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={80}
            height={80}
            className="mt-2 w-20 h-20 object-cover rounded-full border"
          />
        )}
        {errors.profilePicture && (
          <p className="text-red-500 text-sm">
            {errors.profilePicture.message as string}
          </p>
        )}
      </div>

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


