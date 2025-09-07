import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3Data } from "@/lib/validations/step3";
import { skillsByDepartment } from "@/lib/mockData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import FormNavigation from "./FormNavigation";

type Props = {
  defaultValues?: Partial<Step3Data>;
  department?: string;
  onNext: (data: Step3Data) => void;
  onBack?: () => void;
  step: number;
  totalSteps: number;
};

export default function Step3Skills({
  defaultValues,
  department = "Engineering",
  onNext,
  onBack,
  step,
  totalSteps,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      skills: [],
      ...defaultValues,
    } as any,
    mode: "onTouched",
  });

  const skills = skillsByDepartment[department];
  const selectedSkills: string[] = watch("skills") || [];

  const toggleSkill = (skill: string, checked: boolean) => {
    const updated = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter((s) => s !== skill);

    setValue("skills", updated, { shouldValidate: true });
  };

  const submit = (data: Step3Data) => onNext(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* Skills */}
      <div>
        <Label>Primary Skills (min 3)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {skills.map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedSkills.includes(s)}
                onCheckedChange={(checked) =>
                  toggleSkill(s, checked as boolean)
                }
              />
              <span>{s}</span>
            </div>
          ))}
        </div>
        {errors.skills && (
          <p className="text-red-500 text-sm">
            {errors.skills.message as string}
          </p>
        )}
      </div>

      {/* Experience inputs */}
      {selectedSkills.length > 0 && (
        <div>
          <Label>Experience per Skill</Label>
          {selectedSkills.map((skill) => (
            <Input
              key={skill}
              placeholder={`Experience with ${skill}`}
              {...register(`experiences.${skill}`)}
              className="mt-2"
            />
          ))}
        </div>
      )}

      {/* Hours */}
      <div>
        <Label>Preferred Working Hours</Label>
        <div className="flex gap-2 mt-2">
          <Input type="time" {...register("preferredHours.start")} />
          <Input type="time" {...register("preferredHours.end")} />
        </div>
      </div>

      {/* Remote */}
      <div>
        <Label>
          Remote Work Preference: {watch("remotePreference") ?? 0}%
        </Label>
        <Slider
          defaultValue={[0]}
          max={100}
          step={10}
          onValueChange={(v) => setValue("remotePreference", v[0])}
        />
        {(watch("remotePreference") ?? 0) > 50 && (
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox {...register("managerApproved")} />
            <span>Manager Approved</span>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <Label>Extra Notes</Label>
        <Textarea {...register("notes")} rows={3} />
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
