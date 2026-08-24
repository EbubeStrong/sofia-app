"use client";

import { usePathname } from "next/navigation";

//components
import { initialPatientSteps } from "@/data/general-data";

interface PatientStepperProps {
  routeId: string;
}

const PatientStepper: React.FC<PatientStepperProps> = ({ routeId }) => {
  const pathname = usePathname();
  const initialSteps = initialPatientSteps(routeId);

  const handleActiveClass = (stepPaths: string[]) => {
    return stepPaths.some((path) => pathname.startsWith(path))
      ? "bg-[#077D55] text-white border-[#077D55]/50"
      : "bg-white text-black border-[#000000]/50";
  };

  return (
    <div className="flex items-center w-full max-w-full bg-[#F5F5F5] rounded-lg p-4">
      <div className="w-full max-w-[20%]">
        <p className="text-xl whitespace-nowrap font-semibold">Ali Mohammed</p>
        <p className="text-sm text-[#101010]/50">Doctor</p>
        <p className="text-sm text-[#101010]/50">1295857754</p>
      </div>

      <div className="hidden md:flex items-center w-full max-w-full">
        {initialSteps.map((item, index) => (
          <div key={item.id} className="flex items-center w-full">
            {/* Step circle and label */}
            <div className="flex flex-col items-center min-w-[44px]">
              <div
                className={`${handleActiveClass(
                  item.path
                )} border w-[44px] h-[44px] flex items-center justify-center rounded-full z-10`}
              >
                {item.icon}
              </div>
              <p className="mt-1 text-sm text-center">{item.label}</p>
            </div>

            {/* Line between steps */}
            {index < initialSteps.length - 1 && (
              <div className="flex-1 h-px bg-[#000000]/30 mx-2 mb-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientStepper;
