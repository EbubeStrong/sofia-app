"use client";

import React from "react";
import { Button } from "antd";
// import type { HospitalByIdResponse } from "@/interfaces/general";
import type {
  TPharmacyPrescriptionQueueItem,
} from "@/interfaces/pharmacy";
import { formatDate } from "@/utils/format-date";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";

export type AdmissionStatus =
  | "admission"
  | "current"
  | "discharge"
  | "history";

export type AdmissionDrawerDetails = {
  patientName: string;
  age: number;
  gender: string;
  preferredWard: string;
  priority: "High" | "Medium" | "Low";
  allergies: string;
  reasonForAdmission: string;
  treatmentPlan: string;
  assignBedOptions: string[];
  assignBed?: string;
  proposedAdmissionStartOptions: string[];
  proposedAdmissionStart?: string;
  expectedDischargeOptions: string[];
  expectedDischarge?: string;
  notes: string;
  forwardedByName: string;
  forwardedByRole: string;
  dateForwarded: string;
};

const primaryBtn =
  "!h-12 !bg-[#1175C0] !text-white hover:!bg-[#0f64a6] !font-medium !rounded-md !w-full";

const dangerBtn =
  "!h-12 !bg-red-600 !text-white hover:!bg-red-700 !font-medium !rounded-md !w-full";

const outlineBtn =
  "!h-12 !border !border-gray-400 !text-gray-800 hover:!border-gray-600 hover:!text-black !font-medium !rounded-md !w-full";

type AdmissionViewAdmissionDetailsProps = {
  admissionItem?: TPharmacyPrescriptionQueueItem | null;
  details?: AdmissionDrawerDetails;
  status: AdmissionStatus;
//   hospitals?: HospitalByIdResponse["data"] | undefined;
};

const AdmissionViewAdmissionDetails: React.FC<
  AdmissionViewAdmissionDetailsProps
> = ({ admissionItem, details, status }) => {
  const fallbackDetails: AdmissionDrawerDetails | null = admissionItem
    ? {
        patientName: `${admissionItem.patient.firstName} ${admissionItem.patient.lastName}`,
        age: Number(admissionItem.patient.dob)
          ? 0
          : 0,
        gender: admissionItem.patient.gender ?? "-",
        preferredWard: "Cardiology",
        priority: (admissionItem.consultation.priority as
          | "High"
          | "Medium"
          | "Low") ?? "Low",
        allergies: admissionItem.medication?.drug ?? "-",
        reasonForAdmission: admissionItem.consultation.reasonForVisit ?? "-",
        treatmentPlan: admissionItem.consultation.activity ?? "-",
        assignBedOptions: ["A102", "B201", "C304"],
        assignBed: "A102",
        proposedAdmissionStartOptions: ["Today's Date", "Tomorrow"],
        proposedAdmissionStart: "Today's Date",
        expectedDischargeOptions: ["17/01/2024", "20/01/2024"],
        expectedDischarge: "17/01/2024",
        notes: admissionItem.consultation.complaint ?? "-",
        forwardedByName: admissionItem.doctor
          ? `Dr ${admissionItem.doctor.firstName} ${admissionItem.doctor.lastName}`
          : "-",
        forwardedByRole: admissionItem.doctor?.practiceType ?? "-",
        dateForwarded: formatDate(admissionItem.consultation.createdAt),
      }
    : null;

  const resolved = details ?? fallbackDetails;

  if (!resolved) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">
          Admission details are not available for this record.
        </p>
      </div>
    );
  }

  const priorityStyles = {
    High: "border-[#F04438] text-[#B42318] bg-[#FEF3F2]",
    Medium: "border-[#F79009] text-[#B54708] bg-[#FFFAEB]",
    Low: "border-[#12B76A] text-[#027A48] bg-[#ECFDF3]",
  };

  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-gray-500">Patient Name</p>
          <p className="text-sm font-medium text-[#101010]">
            {resolved.patientName}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Age</p>
          <p className="text-sm font-medium text-[#101010]">
            {resolved.age}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Gender</p>
          <p className="text-sm font-medium text-[#101010]">
            {resolved.gender}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Preferred ward</p>
          <p className="text-sm font-medium text-[#101010]">
            {resolved.preferredWard}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Priority</p>
          <span
            className={`inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
              priorityStyles[resolved.priority]
            }`}
          >
            {resolved.priority}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500">Allergies</p>
        <p className="text-sm font-medium text-[#101010]">
          {resolved.allergies}
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Reasons for Admission
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {resolved.reasonForAdmission}
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Treatment Plan
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {resolved.treatmentPlan}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[#101010]">Assign bed</p>
        <FormInputDropdown
          placeholder={resolved.assignBed ?? "Select bed"}
          options={resolved.assignBedOptions.map((value) => ({
            label: value,
            value,
          }))}
          className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#101010]">
            Proposed admission start
          </p>
          <FormInputDropdown
            placeholder={resolved.proposedAdmissionStart ?? "Select date"}
            options={resolved.proposedAdmissionStartOptions.map((value) => ({
              label: value,
              value,
            }))}
            className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#101010]">
            Expected Discharge
          </p>
          <FormInputDropdown
            placeholder={resolved.expectedDischarge ?? "Select date"}
            options={resolved.expectedDischargeOptions.map((value) => ({
              label: value,
              value,
            }))}
            className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[#101010]">Notes:</p>
        <textarea
          className="w-full rounded-md border border-gray-200 p-3 text-xs text-[#101010]"
          rows={3}
          defaultValue={resolved.notes}
        />
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#667085]">Forwarded by</p>
            <p className="text-sm font-semibold text-[#101010]">
              {resolved.forwardedByName}
            </p>
            <p className="text-xs text-[#475467] mt-1">
              {resolved.forwardedByRole}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#667085]">Date Forwarded</p>
            <p className="text-sm font-semibold text-[#101010]">
              {resolved.dateForwarded}
            </p>
          </div>
        </div>
      </div>

      {status === "admission" && (
        <>
          <Button className={primaryBtn}>Approve</Button>
          <Button className={outlineBtn}>Reject</Button>
        </>
      )}

      {status === "current" && (
        <Button className={primaryBtn}>Start Discharge</Button>
      )}

      {status === "discharge" && (
        <Button className={primaryBtn}>Complete Discharge</Button>
      )}

      {status === "history" && (
        <Button className={dangerBtn}>Archive Admission</Button>
      )}
    </div>
  );
};

export default AdmissionViewAdmissionDetails;
