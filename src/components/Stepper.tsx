import React from "react";

export default function Stepper({ step }: { step: number }) {
  const steps = ["Personal", "Job", "Skills", "Emergency", "Review"];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((label, i) => {
          const idx = i + 1;
          const active = idx === step;
          const done = idx < step;
          return (
            <div key={label} className="flex-1 text-center">
              <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${done ? 'bg-green-500 text-white' : active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {idx}
              </div>
              <div className="text-xs mt-1">{label}</div>
            </div>
          );
        })}
      </div>
      <div className="h-1 bg-gray-200 rounded-full">
        <div className="h-1 bg-blue-400 rounded-full" style={{ width: `${((step-1)/(steps.length-1))*100}%` }} />
      </div>
    </div>
  );
}
