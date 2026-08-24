import React from "react";
import type { MedicalLog } from "@/interfaces/patients";

interface PatientLogCardProps {
  log: MedicalLog;
  isFirst: boolean;
  isLast: boolean;
}

const splitAction = (action?: string) => {
  if (!action) {
    return {
      title: "Activity",
      description: "",
    };
  }

  const [title, ...rest] = action.split(" - ");
  return {
    title: title?.trim() ?? action,
    description: rest.join(" - ").trim(),
  };
};

const PatientLogCard: React.FC<PatientLogCardProps> = ({
  log,
  isFirst,
  isLast,
}) => {
  const { title, description } = splitAction(log.action);

  return (
    <div className="flex items-stretch">
      <div className="flex flex-col items-center w-4 self-stretch">
        <span
          className={`mt-2 h-3 w-3 rounded-full ${
            isFirst ? "bg-[#1175C0]" : "bg-[#D0D5DD]"
          }`}
        />
        {!isLast && (
          <span className="mt-1 w-px flex-1 bg-[#EAECF0]" />
        )}
      </div>

      <div className="flex-1 rounded-lg px-2">
        <div className="space-y-3">
          <div>
            <h3 className="text-[20px] font-semibold leading-tight text-[#101010]">
              {title}
            </h3>
            {description ? (
              <p className="text-[13px] leading-snug text-[#667085]">
                {description}
              </p>
            ) : null}
          </div>

          <p className="text-[12px] leading-4 text-[#98A2B3]">
            Provider: {log.performedBy}
          </p>
          <p className="text-[12px] leading-4 text-[#98A2B3]">
            {log.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogCard;
