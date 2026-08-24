"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  FailedIcon,
} from "@/assets/icons";
import MakeRequestForm from "./MakeRequestForm";
import PatientApproval from "./PatientApproval";
import SofiaModal from "@/components/SofiaModals";
import CancelRequestContent from "./CancelRequest";
import { ISteps } from "@/interfaces/patients";
import { initialSteps } from "@/data/general-data";

const PatientProfile = () => {
  const [steps, setSteps] = useState<ISteps[]>(initialSteps);
  const [openCancelRequest, setOpenCancelRequest] = useState<boolean>(false);

  const currentStep = steps.find((step) => step.status === "current");

  const handleUpdateStepStatus = (
    stepId: number,
    result?: "done" | "failed"
  ) => {
    setSteps((prevSteps) => {
      return prevSteps.map((step) => {
        if (step.id === stepId) {
          if (result === "failed") {
            return { ...step, status: "failed" };
          }
          if (result === "done") {
            return { ...step, status: "done" };
          }
        }

        if (step.id === stepId + 1 && result === "done") {
          return { ...step, status: "current" };
        }

        // Mark any previous step done if it was current
        if (
          step.id === stepId &&
          step.status === "current" &&
          result === "done"
        ) {
          return { ...step, status: "done" };
        }

        return step;
      });
    });
  };

  const handleStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckIcon />;
      case "pending":
        return <ClockIcon color="#0101014D" />;
      case "failed":
        return <FailedIcon />;
      case "current":
        return <ClockIcon color="#010101" />;
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 xl:gap-6 w-full max-w-full bg-[#F3F7F8] p-2 md:p-4 xl:p-5">
      <div className="flex flex-row md:flex-col w-full max-w-full md:max-w-[30%] bg-white shadow-sm h-fit divide-x md:divide-y py-0 md:py-2">
        {steps.map((step) => (
          <div key={step.id} className="p-4 flex">
            <div className="flex-1">
              <p
                className={`${
                  step.status === "current"
                    ? "text-[#010101]"
                    : "text-[#010101]/40"
                } flex items-center gap-1 text-base font-semibold mb-1.5`}
              >
                {handleStatusIcon(step.status)} {step.label}
              </p>
              <p
                className={`${
                  step.status === "current"
                    ? "text-[#010101]/80"
                    : "text-[#010101]/40"
                } text-sm hidden md:block`}
              >
                {step.desc}
              </p>
            </div>
            <div className="mt-1.5 hidden md:block">
              <ArrowRightIcon
                color={step.status === "current" ? "#010101" : "#0101014D"}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-full md:max-w-[70%] bg-white h-auto p-4">
        {currentStep?.id === 1 && (
          <MakeRequestForm updateStepStatus={handleUpdateStepStatus} />
        )}
        {currentStep?.id === 2 && (
          <PatientApproval setOpenCancelRequest={setOpenCancelRequest} />
        )}
      </div>

      <SofiaModal
        isModalOpen={openCancelRequest}
        handleOk={() => setOpenCancelRequest(false)}
        handleCancel={() => setOpenCancelRequest(false)}
        width={600}
        content={
          <CancelRequestContent setOpenCancelRequest={setOpenCancelRequest} />
        }
      />
    </div>
  );
};

export default PatientProfile;
