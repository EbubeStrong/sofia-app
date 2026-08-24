"use client";

import React, { CSSProperties, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import SofiaAccordion from "@/components/Accordion";
import PatientSummaryCard from "@/components/Patients/PatientSummaryCard";
import type { CollapseProps } from "antd";
import AppointmentList from "./AppointmentList";
import { ProfileLock } from "@/assets/icons";

const panelStyle: React.CSSProperties = {
  background: "#fff",
  fontSize: 16,
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ConsultationRoomLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("roomId");

  const [activeKey, setActiveKey] = useState<string | string[]>("doctorNote");

  const handleAccordionChange = (key: string | string[]) => {
    setActiveKey(key[0]);
  };

  const renderNewButton = (label: string) => {
    return (
      <button
        type="button"
        className="text-base font-normal text-[#1175C0] border border-[#1175C0] px-3 py-1 rounded-md"
      >
        {label}
      </button>
    );
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "doctorNote",
      label: "Doctors Note",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "doctorNote" && renderNewButton("Add Note"),
    },
    {
      key: "vitalSigns",
      label: "Vital Signs",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "vitalSigns" && renderNewButton("Add Vital Sign"),
    },
    {
      key: "diagnosis",
      label: "Diagnosis",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "diagnosis" && renderNewButton("Add Diagnosis"),
    },
    {
      key: "labTest",
      label: "Laboratory Test",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "labTest" && renderNewButton("Add Test"),
    },
    {
      key: "imaging",
      label: "Imaging",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "imaging" && renderNewButton("Add Imaging"),
    },
    {
      key: "allergy",
      label: "Allergy",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "allergy" && renderNewButton("Add Allergy"),
    },
    {
      key: "treatment",
      label: "Treatment",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "treatment" && renderNewButton("Add Treatment"),
    },
    {
      key: "nurseNote",
      label: "Nurse Note",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "nurseNote" && renderNewButton("Add Note"),
    },
    {
      key: "surgery",
      label: "Surgery",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "surgery" && renderNewButton("Add Surgery"),
    },
    {
      key: "vaccination",
      label: "Vaccination",
      children: <p>{text}</p>,
      style: panelStyle,
      extra: activeKey === "vaccination" && renderNewButton("Add Vaccination"),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full gap-6 md:gap-5">
      <div className="w-full max-w-full md:max-w-[65%] flex flex-col gap-6">
        <PatientSummaryCard bg="light" type="consult" />
        <SofiaAccordion
          accordion
          items={getItems(panelStyle)}
          onChange={handleAccordionChange}
          activeKey={activeKey}
        />
      </div>

      <div className="w-full max-w-full md:max-w-[35%] flex flex-col gap-6">
        <div className="border border-[rgb(33 33 33 / 0.1)] p-4 rounded-lg flex flex-col gap-2">
          <ProfileLock />
          <p className="text-lg text-[#101010] font-semibold font-libre_franklin">
            Request profile access
          </p>
          <p className="text-base text-[#101010] font-normal mb-2.5 font-libre_franklin">
            Please submit a request to review their history, medications,
            allergies, and previous consultations. Access will be granted once
            approved by the patient or their authorized representative.
          </p>
          <button
            type="button"
            onClick={() => router.push(`/patients/access`)}
            className="w-fit text-base text-white bg-[#1175C0] py-2 px-4 rounded-md font-medium font-libre_franklin"
          >
            Request Access
          </button>
        </div>

        <div className="border border-[#1175C04D] bg-[#1175C00F] p-4 rounded-lg flex flex-col gap-2">
          <p className="text-lg text-[#101010] font-semibold font-libre_franklin">
            Consultation with Johnson Michael
          </p>
          <div>
            <p className="text-sm text-[#101010] mb-2">Booking Information</p>
            <div className="divide-y border rounded-md">
              <div className="grid grid-cols-2 p-2">
                <div>
                  <p className="text-xs text-[#101010]/80">Call Duration</p>
                  <p className="text-sm text-[#101010]">11:30am - 12:00PM</p>
                </div>
                <div>
                  <p className="text-xs text-[#101010]/80">Booked on</p>
                  <p className="text-sm text-[#101010]">Jan 21st 10:00 AM</p>
                </div>
              </div>
              <div className="grid grid-cols-2 p-2">
                <div>
                  <p className="text-xs text-[#101010]/80">Appointment ID</p>
                  <p className="text-sm text-[#101010]">2984hdbsr</p>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/room/${roomIdParam}`}
            target="_blank"
            className="w-fit text-base text-white bg-[#1175C0] py-2 px-4 rounded-md font-medium font-libre_franklin mt-2"
          >
            Join Call
          </Link>
        </div>

        <AppointmentList />
      </div>
    </div>
  );
};

export default ConsultationRoomLayout;
