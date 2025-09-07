import { Button } from "@/components/ui/button";

type FormNavigationProps = {
  step: number;             
  totalSteps: number;       
  isSubmitting?: boolean;   
  onBack?: () => void;      
  onNext?: () => void;  
  nextLabel?: string;    
  disableNext?: boolean;     
};

export default function FormNavigation({
  step,
  totalSteps,
  isSubmitting,
  onBack,
  onNext,
  nextLabel = "Save & Continue", 
  disableNext = false
  
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-6">
      {/* Back button */}
      {step > 1 ? (
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      ) : (
        <div /> 
      )}

      {/* Next / Submit */}
      {step < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      )}
    </div>
  );
}
