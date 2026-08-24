import React from "react";
import tw from "tailwind-styled-components";
import { RiCalendar2Fill } from "react-icons/ri";
import FormInput from "@/components/FormElements/FormInput";

const Title = tw.p`text-sofia_dark/80 text-sm font-medium leading-snug`;
const Desc = tw.p`text-[#101010] text-base font-normal`;

const TreatmentDetails = () => {
  return (
    <section className="flex flex-col gap-4 mt-3">
      <div>
        <Title>Diagnosis</Title>
        <Desc>Sore throat, likely caused by viral or bacterial infection.</Desc>
      </div>
      <div>
        <Title>Prescription</Title>
        <ul>
          <li className="text-[#101010] text-base font-normal">
            Pain Relief and Anti-inflammatory
          </li>
          <li className="text-[#101010] text-base font-normal">
            Ibuprofen (Advil, Motrin)
          </li>
        </ul>
      </div>
      <div>
        <Title>Instruction</Title>
        <Desc>Dosage: 200-400 mg every 4-6 hours as needed.</Desc>
      </div>
      <div>
        <Title>Health Care Provider</Title>
        <Desc>Oak Hospital</Desc>
      </div>
      <div>
        <Title>Type</Title>
        <Desc>Telemedicine</Desc>
      </div>
      <div>
        <Title>Nursing Note</Title>
        <Desc>Dosage: 200-400 mg every 4-6 hours as needed.</Desc>
      </div>
      <FormInput defaultValue="Dr Mike Micheal, MD" disabled />
      <div>
        <Title>Date Recorded</Title>
        <Desc className="flex items-center gap-2">
          <RiCalendar2Fill className="text-xl" /> 05/01/2024
        </Desc>
      </div>
    </section>
  );
};

export default TreatmentDetails;
