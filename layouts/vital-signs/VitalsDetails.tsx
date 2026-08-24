"use client";

import React from "react";
import tw from "tailwind-styled-components";

interface VitalsDetailsProps {
  vitalsId: string;
}

//components
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const Label = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal mb-1`;
const Value = tw.p`text-base text-[#101010] font-libre_franklin font-medium leading-tight`;

const VitalsDetails: React.FC<VitalsDetailsProps> = ({ vitalsId }) => {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-6 mt-5 md:mt-0">
      <BackButton>Back</BackButton>

      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl text-sofia_dark font-semibold font-libre_franklin">
          Daniel&apos;s Vitals and Biometrics
        </h1>

        <div className="flex flex-col gap-4 divide-y divide-[#101010]/5 border border-[#101010]/10 rounded-lg p-2 md:p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">
                Temperature
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/medical-records/${vitalsId}/vitals/record-vitals`
                  )
                }
                className="text-base bg-white text-[#1175C0] border border-solid border-[#1175C0] h-10 px-4 rounded-md"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-2">
              <div>
                <Label>Temperature reading</Label>
                <Value>98.6°F</Value>
              </div>
              <div>
                <Label>Source</Label>
                <Value>Oral</Value>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">
                Blood Pressure
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-3.5">
              <div>
                <Label>Blood pressure reading</Label>
                <Value>120/80 mmHg</Value>
              </div>
              <div>
                <Label>Position</Label>
                <Value>Sitting</Value>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">Pulse BPM</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-3.5">
              <div>
                <Label>Pulse one</Label>
                <Value>75 BPM</Value>
              </div>
              <div>
                <Label>Description </Label>
                <Value>Full</Value>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">Height</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-3.5">
              <div>
                <Label>Foot</Label>
                <Value>{"6’1"}</Value>
              </div>
              <div>
                <Label>inches</Label>
                <Value>50</Value>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">Weight</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-3.5">
              <div>
                <Label>LB</Label>
                <Value>{"6’1"}</Value>
              </div>
              <div>
                <Label>BMI</Label>
                <Value>50</Value>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-3">
            <div className="flex items-center justify-between">
              <p className="text-lg text-sofia_dark font-semibold">
                Head circumference
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-0 pt-3.5">
              <div>
                <Label>INches</Label>
                <Value>{"6’1"}</Value>
              </div>
              <div>
                <Label>Waist (INches) </Label>
                <Value>50</Value>
              </div>
            </div>
          </div>

          <div className="pt-3.5">
            <Label>Date Recorded</Label>
            <Value>05/01/2024</Value>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VitalsDetails;
