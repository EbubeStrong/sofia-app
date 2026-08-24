"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowLeftOutlined,
  DownOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Divider } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { mockAppointmentsByTab } from "./PharmacyMockData";
import { mockPrescriptionPatients } from "./utils/types";

interface PharmacyFormDetailsProps {
  initialPatientId: string;
  tab: "filled" | "approved";
}

const PharmacyFormDetails = ({
  initialPatientId,
  tab,
}: PharmacyFormDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId);

  const appointments = mockAppointmentsByTab[tab];

  // Get the previous tab from URL query parameter, fallback to current tab
  const previousTab = searchParams.get("tab") || tab;

  const [selectedPatientId, setSelectedPatientId] = useState(
    initialPatientId ?? appointments[0]?.patientId
  );

  // 2. Find the current patient data based on selection
  const currentPatient = useMemo(() => {
    return (
      appointments.find((p) => p.patientId === selectedPatientId) ||
      appointments[0]
    );
  }, [appointments, selectedPatientId]);

  // 2b. For approved tab, pull richer mock prescription data for this patient
  const approvedDetails = useMemo(() => {
    if (tab !== "approved") return null;
    return mockPrescriptionPatients.find(
      (p) => p.patientId === selectedPatientId
    );
  }, [selectedPatientId, tab]);

  const primaryPrescription = approvedDetails?.prescriptions?.[0];

  // 3. Create options for the Select dropdown
  const patientOptions = useMemo(
    () =>
      appointments.map((p) => ({
        value: p.patientId,
        label: p.patientName,
      })),
    [appointments]
  );

  return (
    <div className="w-full min-h-screen bg-white p-6 font-sans">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="w-full">
          <Button
            onClick={() => router.push(`/pharmacy?q=${previousTab}`)}
            className="flex items-center text-sm font-semibold text-gray-600 !border-none hover:text-black mb-1 transition-colors"
          >
            <ArrowLeftOutlined className="mr-2 text-xs" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {tab === "approved" ? "Approved Medication" : "Filled Medication"}
          </h1>
          <p className="text-sm text-gray-500">
            Confirm medication to be dispensed
          </p>
        </div>

        <div className="flex gap-3 w-full">
          <Button
            className="!bg-[#D91F11] !text-white !hover:!bg-red-700 !hover:!text-white border-none font-medium !p-6 w-full"
            size="large"
          >
            Void
          </Button>
          {tab === "filled" ? (
            <Button
              className="!bg-[#1175C01A] !text-[#1175C080] border-none font-medium hover:!bg-blue-100 hover:!text-blue-400 !p-6 w-full"
              size="large"
            >
              Reviewed
            </Button>
          ) : null}
          <Button
            type="primary"
            className="!bg-[#1175C0] !text-white !hover:!bg-blue-700 font-medium !p-6 w-full"
            size="large"
          >
            Print and Approve
          </Button>
        </div>
      </div>

      <div className="space-y-8 ">
        {/* --- Patient Selection --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Full Name
          </label>
          <Select
            value={selectedPatientId}
            onChange={(value) => setSelectedPatientId(value)}
            className="w-full !h-11 !border-none"
            suffixIcon={<DownOutlined className="text-gray-400" />}
            options={patientOptions}
          />
        </div>

        {/* --- Patient Information Bar --- */}
        <div className="bg-[#F5F5F5] p-4 rounded-md">
          <p className="font-bold text-sm text-gray-800 mb-3">
            Patient Information
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">
                Allergy
              </p>
              {/* Mapping 'drugs' to Allergy based on your previous screenshot showing drugs listed here */}
              <p className="text-sm font-semibold text-gray-800">
                {currentPatient.drugs}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">
                Check- In
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {currentPatient.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">
                Date Prescribed
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {currentPatient.datePrescribedDetail ?? currentPatient.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide mb-1">
                Date Dispensed
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {currentPatient.dateDispensed ?? "-"}
              </p>
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        {/* --- Review Medication Form --- */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Review Medication
            </h2>
            <p className="text-sm text-gray-500">
              Confirm medication to be dispensed
            </p>
          </div>

          <div className="space-y-5">
            {/* Drug Name - Pre-filled from mock data */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Drug Name
              </label>
              <Input
                key={currentPatient.appointmentId} // Force re-render on patient change
                defaultValue={
                  tab === "approved"
                    ? primaryPrescription?.drug ?? currentPatient.drugs
                    : currentPatient.drugs
                }
                className="!h-10 !rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Refill
                </label>
                <Input
                  defaultValue={
                    tab === "approved"
                      ? currentPatient.refill ??
                        primaryPrescription?.refillNumber ??
                        "2"
                      : "2"
                  }
                  className="!h-10 !rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Days of Supply
                </label>
                <Input
                  defaultValue={
                    tab === "approved"
                      ? currentPatient.daysOfSupply ?? "2"
                      : "2"
                  }
                  className="!h-10 !rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Medication Type
                </label>
                <Select
                  defaultValue="Oral"
                  className="w-full !h-10"
                  options={[{ value: "Oral", label: "Oral" }]}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Days of Supply
                </label>
                <Input defaultValue="2" className="!h-10 !rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Quantity Written
                </label>
                <Input
                  defaultValue={
                    tab === "approved"
                      ? currentPatient.quantity ??
                        primaryPrescription?.quantity ??
                        "2"
                      : "2"
                  }
                  className="!h-10 !rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Quantity Dispensed
                </label>
                <Input
                  defaultValue={
                    tab === "approved"
                      ? currentPatient.quantity ??
                        primaryPrescription?.quantity ??
                        "2"
                      : "2"
                  }
                  className="!h-10 !rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Allow Substitute
                </label>
                <Select
                  defaultValue={
                    tab === "approved"
                      ? currentPatient.allowSubstitute ??
                        (primaryPrescription?.allowSubstitute ? "Yes" : "No")
                      : ""
                  }
                  className="w-full !h-10"
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Directions
              </label>
              <Input.TextArea
                rows={3}
                className="!rounded-md"
                defaultValue={
                  tab === "approved"
                    ? currentPatient.directions ??
                      primaryPrescription?.directions ??
                      "Conduct an interview to gather the patient's medical history, including past illnesses, surgeries, allergies, medications, and family medical history."
                    : "Conduct an interview to gather the patient's medical history, including past illnesses, surgeries, allergies, medications, and family medical history."
                }
              />
            </div>
          </div>
        </div>

        {/* --- Uploaded Prescription --- */}
        <div>
          <h3 className="font-bold text-base text-gray-700 mb-4">
            Uploaded Prescription
          </h3>

          <div className="grid grid-cols-12 text-sm text-gray-500 mb-2 px-2">
            <div className="col-span-6">File Name</div>
            <div className="col-span-3">Size</div>
            <div className="col-span-3">Uploaded Date</div>
          </div>

          <div className="space-y-3">
            {/* Dynamic File Rendering */}
            {currentPatient.files &&
              currentPatient.files.map((file, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 items-center text-sm text-gray-800 font-medium px-2"
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <FilePdfOutlined className="text-lg text-gray-700" />
                    <span>{file.name}</span>
                  </div>
                  <div className="col-span-3">{file.size}</div>
                  <div className="col-span-3">{file.date}</div>
                </div>
              ))}

            {/* Fallback if no files in mock */}
            {(!currentPatient.files || currentPatient.files.length === 0) && (
              <div className="text-gray-400 text-sm px-2">
                No files uploaded.
              </div>
            )}
          </div>
        </div>

        {/* --- Pharmacist Information --- */}
        <div className="bg-[#F5F5F5] p-6 rounded-md mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Pharmacist Information
          </h3>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide mb-1">
              Prescriber
            </p>
            <p className="text-lg font-bold text-gray-800">
              {currentPatient.doctor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyFormDetails;
