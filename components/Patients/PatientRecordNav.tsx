"use client";

import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import type { TimeRangePickerProps } from "antd";

import BackButton from "../BackButton";
import FormInputDateRange from "../FormElements/FormInputDateRange";
import FormInputButton from "../FormElements/FormInputButton";
import { ROLES } from "@/utils/roles-enum";

type TRecordProps = {
  patientId: string;
  role: string;
};

const PatientRecordNav: React.FC<TRecordProps> = ({ patientId, role }) => {
  const router = useRouter();

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex-1">
        <BackButton>Back</BackButton>
        <h1 className="text-lg md:text-xl text-[#212121] font-semibold mt-1">
          Patient Record: {patientId ?? "---"}
        </h1>
      </div>
      <div className="w-full md:max-w-[25%] hidden md:block">
        <FormInputDateRange presets={rangePresets} />
      </div>

      {role === ROLES.DOCTOR && (
        <FormInputButton
          onHandleAction={() =>
            router.push(`/queues/${patientId}/consultation`)
          }
          cssProps={{ $height: "48px", $fontSize: "16px" }}
        >
          Start Consultation
        </FormInputButton>
      )}
    </div>
  );
};

export default PatientRecordNav;
