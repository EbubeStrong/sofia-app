"use client";

import React from "react";
import { Button } from "antd";

export type AdmissionNoteItem = {
  date: string;
  doctor: string;
  time: string;
  note: string;
};

export type AdmissionNotesDetails = {
  headerName: string;
  patientName: string;
  age: number;
  gender: string;
  notes: AdmissionNoteItem[];
};

const primaryBtn =
  "!h-11 !bg-[#1175C0] !text-white hover:!bg-[#0f64a6] !font-medium !rounded-md !w-full";

type AdmissionNotesDrawerContentProps = {
  details: AdmissionNotesDetails;
  onAddNote?: () => void;
};

const AdmissionNotesDrawerContent: React.FC<
  AdmissionNotesDrawerContentProps
> = ({ details, onAddNote }) => {
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
      </div>

      <div className="flex flex-col gap-3">
        {details.notes.map((item, index) => (
          <div
            key={`${item.date}-${item.time}-${index}`}
            className="rounded-lg bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center justify-between text-[11px] text-[#475467]">
              <span>
                {item.date} - {item.doctor}
              </span>
              <span>{item.time}</span>
            </div>
            <p className="mt-1 text-xs text-[#101010]">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      <Button className={primaryBtn} onClick={onAddNote}>
        Add Note
      </Button>
    </div>
  );
};

export default AdmissionNotesDrawerContent;
