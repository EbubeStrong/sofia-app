import React from "react";
import tw from "tailwind-styled-components";

//components
import BackButton from "@/components/BackButton";

const Label = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal mb-1`;
const Value = tw.p`text-base text-[#101010] font-libre_franklin font-medium leading-tight`;

const SurgeryDetails = () => {
  return (
    <main className="flex flex-col gap-6 mt-5 md:mt-0">
      <BackButton>Back</BackButton>

      <div className="space-y-4">
        <h1 className="text-xl md:text-2xl text-sofia_dark font-semibold font-libre_franklin">
          Daniel&apos;s Surgery
        </h1>

        <div className="flex flex-col gap-4 divide-y divide-[#101010]/5 border border-[#101010]/10 rounded-lg p-2 md:p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12">
            <div>
              <Label>SURGERY</Label>
              <Value>Medicine</Value>
            </div>
            <div>
              <Label>Lead surgeon name</Label>
              <Value>Penicillin Johnson</Value>
            </div>
            <div>
              <Label>Lead surgeon contact</Label>
              <Value>+1234567890</Value>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>Date Performed</Label>
              <Value>2 NOV 2024</Value>
            </div>
            <div>
              <Label>time performed</Label>
              <Value>2 NOV 2024</Value>
            </div>
            <div>
              <Label>Date Recorded</Label>
              <Value>2 NOV 2024</Value>
            </div>
          </div>
          <div className="pt-3.5">
            <Label>Surgical Team</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>Procedure</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>PRE surgery Diagnosis</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>POST surgery Diagnosis</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>Device Details</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>Brand name</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>Company name</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>version or model number</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
          <div className="pt-3.5">
            <Label>Device status</Label>
            <Value>New</Value>
          </div>
          <div className="pt-3.5">
            <Label>Post operation Information</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SurgeryDetails;
