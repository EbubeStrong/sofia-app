"use client";

import React from "react";
import { Button } from "antd";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";

export type AdmissionDailyNoteDetails = {
  headerName: string;
  patientName: string;
  patientDob: string;
  patientPhone: string;
  reasonForAdmission: string;
  treatmentPlan: string;
  bedOptions: string[];
  bed: string;
  proposedAdmissionStartOptions: string[];
  proposedAdmissionStart: string;
  expectedDischargeOptions: string[];
  expectedDischarge: string;
  notes: string;
  admittingDoctor: string;
  admissionDate: string;
  lengthOfStay: string;
};

const primaryBtn =
  "!h-11 !bg-[#1175C0] !text-white hover:!bg-[#0f64a6] !font-medium !rounded-md !w-full";

const outlineBtn =
  "!h-11 !border !border-gray-200 !text-[#101010] hover:!border-gray-300 hover:!text-black !font-medium !rounded-md !w-full";

type AdmissionDailyNoteDrawerContentProps = {
  details: AdmissionDailyNoteDetails;
  onBack?: () => void;
};

const AdmissionDailyNoteDrawerContent: React.FC<
  AdmissionDailyNoteDrawerContentProps
> = ({ details, onBack }) => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-gray-500">Patient Name</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.patientName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Patient Date of Birth</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.patientDob}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Patient Phone Number</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.patientPhone}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-[#101010]">Add Daily Note</p>
        <p className="text-xs text-[#667085]">
          Record patient observations and vital signs
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[#101010]">Notes</p>
        <textarea
          className="w-full rounded-md border border-gray-200 p-3 text-xs text-[#101010]"
          rows={4}
          defaultValue={details.notes}
          placeholder="Enter daily observation, treatment updates and patient status..."
        />
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Reasons for Admission
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {details.reasonForAdmission}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#101010]">
          Admission Details
        </p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-xs text-gray-500">Bed</p>
            <p className="text-sm font-medium text-[#101010]">
              {details.bed}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Admitting Doctor</p>
            <p className="text-sm font-medium text-[#101010]">
              {details.admittingDoctor}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Admission Date</p>
            <p className="text-sm font-medium text-[#101010]">
              {details.admissionDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Length of Stay</p>
            <p className="text-sm font-medium text-[#101010]">
              {details.lengthOfStay}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">Treatment Plan</p>
        <p className="text-xs text-[#475467] mt-1">
          {details.treatmentPlan}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[#101010]">Assign bed</p>
        <FormInputDropdown
          placeholder={details.bed}
          options={details.bedOptions.map((value) => ({
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
            placeholder={details.proposedAdmissionStart}
            options={details.proposedAdmissionStartOptions.map((value) => ({
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
            placeholder={details.expectedDischarge}
            options={details.expectedDischargeOptions.map((value) => ({
              label: value,
              value,
            }))}
            className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button className={primaryBtn}>Add Note</Button>
        <Button className={outlineBtn} onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AdmissionDailyNoteDrawerContent;
