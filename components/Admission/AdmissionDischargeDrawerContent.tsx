"use client";

import React from "react";
import { Button } from "antd";

export type AdmissionDischargeDetails = {
  headerName: string;
  patientName: string;
  age: number;
  gender: string;
  dischargeDate: string;
  dischargeRequestedBy: string;
  reasonForAdmission: string;
  dischargeSummary: string;
  followUpInstruction: string;
  bed: string;
  admittingDoctor: string;
  admissionDate: string;
  lengthOfStay: string;
  treatmentPlan: string;
};

const primaryBtn =
  "!h-11 !bg-[#1175C0] !text-white hover:!bg-[#0f64a6] !font-medium !rounded-md !w-full";

type AdmissionDischargeDrawerContentProps = {
  details: AdmissionDischargeDetails;
};

const AdmissionDischargeDrawerContent: React.FC<
  AdmissionDischargeDrawerContentProps
> = ({ details }) => {
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
          <p className="text-xs text-gray-500">Age</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.age}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Gender</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.gender}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Discharge Date</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.dischargeDate}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Discharge Request By</p>
          <p className="text-sm font-medium text-[#101010]">
            {details.dischargeRequestedBy}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Reasons for Admission
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {details.reasonForAdmission}
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Discharge Summary
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {details.dischargeSummary}
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold text-[#101010]">
          Follow Up Instruction
        </p>
        <p className="text-xs text-[#475467] mt-1">
          {details.followUpInstruction}
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

      <Button className={primaryBtn}>Approve</Button>
    </div>
  );
};

export default AdmissionDischargeDrawerContent;
