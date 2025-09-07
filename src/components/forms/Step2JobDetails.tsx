import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Data, departmentEnum, Department, step2Schema } from "@/lib/validations/step2";
import { mockManagers, skillsByDepartment } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useMemo, useEffect } from "react";
import FormNavigation from "./FormNavigation";

type Props = {
  defaultValues?: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack?: () => void;
  step: number;
  totalSteps: number;
};

export default function Step2JobDetails({
  defaultValues,
  onNext,
  onBack,
  step,
  totalSteps,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: defaultValues ?? {},
    mode: "onTouched",
  });

  const jobType = watch("jobType") ?? defaultValues?.jobType ?? "Full-time";
  const department = (watch("department") ?? defaultValues?.department ?? "Engineering") as Department;

  const availableDepartments = Object.keys(skillsByDepartment) as Department[];

  const [mgrSearch, setMgrSearch] = useState("");
  const filteredManagers = useMemo(
    () =>
      mockManagers
        .filter((m) => m.department === department)
        .filter((m) => m.name.toLowerCase().includes(mgrSearch.toLowerCase())),
    [department, mgrSearch]
  );

  // Auto-set contract salary
  useEffect(() => {
    if (jobType === "Contract") {
      setValue("salary", 150, { shouldValidate: true });
    }
  }, [jobType, setValue]);

  const submit = (data: Step2Data) => onNext(data);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      {/* Department */}
      <div>
        <Label>Department</Label>
        <Select
          defaultValue={department}
          onValueChange={(val: Department) => setValue("department", val)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-200">
            {availableDepartments.map((dept) => (
              <SelectItem
                key={dept}
                value={dept}
                className="bg-gray-200 text-black hover:bg-gray-300"
              >
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department.message}</p>
        )}
      </div>

      {/* Position Title */}
      <div>
        <Label>Position Title</Label>
        <Input placeholder="e.g. Senior Engineer" {...register("positionTitle")} />
        {errors.positionTitle && (
          <p className="text-red-500 text-sm">{errors.positionTitle.message}</p>
        )}
      </div>

      {/* Job Type */}
      <div>
        <Label>Job Type</Label>
        <RadioGroup
          defaultValue={jobType}
          onValueChange={(val: "Full-time" | "Part-time" | "Contract") =>
            setValue("jobType", val)
          }
        >
          <div className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Full-time" id="ft" />
              <Label htmlFor="ft">Full-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Part-time" id="pt" />
              <Label htmlFor="pt">Part-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Contract" id="ct" />
              <Label htmlFor="ct">Contract</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Salary */}
      <div>
        <Label>{jobType === "Contract" ? "Hourly Rate (USD)" : "Salary (USD)"}</Label>
        <Input
          type="number"
          disabled={jobType === "Contract"}
          {...register("salary", { valueAsNumber: true })}
        />
        {errors.salary && (
          <p className="text-red-500 text-sm">{errors.salary.message}</p>
        )}
      </div>

      {/* Manager Search */}
      <div>
        <Label>Manager</Label>
        <Input
          placeholder="Search manager..."
          value={mgrSearch}
          onChange={(e) => setMgrSearch(e.target.value)}
        />

        <div className="max-h-40 overflow-auto border rounded mt-2">
          {filteredManagers.map((m) => {
            const isSelected = watch("manager") === m.name;
            return (
              <div
                key={m.id}
                className={`p-2 flex justify-between items-center cursor-pointer rounded ${
                  isSelected ? "bg-blue-100 border border-blue-400" : "hover:bg-gray-50"
                }`}
                onClick={() => setValue("manager", m.name, { shouldValidate: true })}
              >
                <span>{m.name}</span>
                {isSelected ? (
                  <span className="text-blue-600 font-medium text-sm">Selected</span>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("manager", m.name, { shouldValidate: true });
                    }}
                  >
                    Select
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <Input type="hidden" {...register("manager")} />
        {errors.manager && (
          <p className="text-red-500 text-sm">{errors.manager.message}</p>
        )}
      </div>

      {/* Form Navigation */}
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
