import React from "react";

interface StepperHeaderProps {
  step: number;
  steps?: { id: number; label: string }[];
}

const defaultSteps = [
  { id: 1, label: "Prescription" },
  { id: 2, label: "Prescriber" },
  { id: 3, label: "Preview" },
];

export const PharmacyFormProgressStepper = ({
  step,
  steps = defaultSteps,
}: StepperHeaderProps) => {
  return (
    <div className="w-full">
      {/* LABELS */}
      <div className="flex justify-between mb-3">
        {steps.map((s, index) => (
          <p
            key={s.id}
            className={`text-sm font-medium ${
              index === steps.length - 1 ? "text-right" : "text-center"
            } w-20
              ${step >= s.id ? "text-[#1175C0]" : "text-gray-400"}
            `}
          >
            {s.label}
          </p>
        ))}
      </div>

      {/* STEPPER */}
      <div className="flex items-center justify-between">
        {steps.map((s, index) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center w-fit justify-center">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2
              ${step >= s.id ? "bg-[#1175C0] border-[#1175C0]" : "border-gray-300"}
            `}
              />
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px]
            ${step >= steps[index + 1].id ? "bg-[#1175C0]" : "bg-gray-300"}
          `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
