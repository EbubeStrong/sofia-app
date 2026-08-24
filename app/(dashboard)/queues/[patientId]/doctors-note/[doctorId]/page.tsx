"use client";

import React, { useState } from "react";
import tw from "tailwind-styled-components";

//components
import BackButton from "@/components/BackButton";
import PatientSummaryCard from "@/components/Patients/PatientSummaryCard";

const Value = tw.p`text-base text-[#101010] font-libre_franklin font-normal leading-tight`;
const OutlineButton = tw.button`text-base text-[#000]/30 font-semibold underline px-6 py-2.5 rounded-lg`;

const consultArr = [
  {
    label: "General Appearance",
    value: "General Appearance",
  },
  {
    label: "Vital Signs",
    value: "Vital Signs",
  },
  {
    label: "Diagnosis",
    value: "Diagnosis",
  },
  {
    label: "Tests",
    value: "Tests",
  },
  {
    label: "Imaging",
    value: "Imaging",
  },
  {
    label: "Allergies",
    value: "Allergies",
  },
];

const treatmentArr = [
  {
    label: "Treatment",
    value: "Treatment",
  },
  {
    label: "Nurses Note",
    value: "Nurses Note",
  },
  {
    label: "Surgeries",
    value: "Surgeries",
  },
  {
    label: "Immunization and Vaccination",
    value: "Immunization and Vaccination",
  },
];

const DoctorDetailsModule = () => {
  const [consultVal, setConsultVal] = useState<string>("");
  const [treatmentVal, setTreatmentVal] = useState<string>("");

  return (
    <main className="flex flex-col gap-6 mt-5 md:mt-0">
      <BackButton>Back to treatment</BackButton>

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl md:text-2xl text-sofia_dark font-semibold font-libre_franklin leading-relaxed">
            Doctors Note
          </h1>
          <p className="text-base text-sofia_dark font-normal">
            Provider: Dr Omar Chaturanga
          </p>
        </div>

        <PatientSummaryCard type="doctors" />

        <div className="flex flex-col gap-5 border border-[#101010]/10 rounded-lg p-2 md:p-4 md:pb-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-xl text-sofia_dark font-semibold">
                  Patient Complaint
                </p>
                <p className="text-xs text-[#101010] font-normal">
                  Reason for visit in patients own words
                </p>
              </div>
              <OutlineButton>Edit</OutlineButton>
            </div>
            <div className="flex flex-col gap-2">
              <Value>
                Patient Diagnoses: A bar chart can be used to show the number of
                patients diagnosed with each chronic condition (e.g., diabetes,
                hypertension, asthma). Each bar represents a different chronic
                condition, with the height of the bar indicating the number of
                patients affected.
              </Value>
              <Value>
                Patient Diagnoses: A bar chart can be used to show the number of
                patients diagnosed with each chronic condition (e.g., diabetes,
                hypertension, asthma). Each bar represents a different chronic
                condition, with the height of the bar indicating the number of
                patients affected.
              </Value>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xl text-sofia_dark font-semibold">
              Doctors Note
            </p>
            <div className="flex flex-col gap-2 border border-solid border-[#4D4D4D]/40 rounded-lg p-2 md:p-4">
              <Value>
                Patient Diagnoses: A bar chart can be used to show the number of
                patients diagnosed with each chronic condition (e.g., diabetes,
                hypertension, asthma). Each bar represents a different chronic
                condition, with the height of the bar indicating the number of
                patients affected.
              </Value>
              <Value>
                Patient Diagnoses: A bar chart can be used to show the number of
                patients diagnosed with each chronic condition (e.g., diabetes,
                hypertension, asthma). Each bar represents a different chronic
                condition, with the height of the bar indicating the number of
                patients affected.
              </Value>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xl text-sofia_dark font-semibold">
                Consultation
              </p>
              <p className="text-xs text-[#101010] font-normal">
                View all the activity under this complaint
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {consultArr.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setConsultVal(item.value)}
                  className={`${
                    consultVal === item.value
                      ? "bg-[#212121] text-white font-medium"
                      : "bg-[#F4F4F4] text-sofia_dark"
                  } text-base font-normal h-12 px-4`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xl text-sofia_dark font-semibold">Treatment</p>
              <p className="text-xs text-[#101010] font-normal">
                Select an exam to add findings
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {treatmentArr.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTreatmentVal(item.value)}
                  className={`${
                    treatmentVal === item.value
                      ? "bg-[#212121] text-white font-medium"
                      : "bg-[#F4F4F4] text-sofia_dark"
                  } text-base font-normal h-12 px-4`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorDetailsModule;
