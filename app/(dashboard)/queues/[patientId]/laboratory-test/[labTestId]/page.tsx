import React from "react";
import tw from "tailwind-styled-components";

//components
import BackButton from "@/components/BackButton";

const Label = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal mb-1`;
const Value = tw.p`text-base text-[#101010] font-libre_franklin font-medium leading-tight`;
const OutlineButton = tw.button`text-sm text-[#1175C0] font-semibold border border-solid border-[#1175C0] px-6 py-2.5 rounded-lg`;
const DeleteButton = tw.button`text-sm text-white bg-[#D92D20] border border-solid border-[#D92D20] font-semibold px-6 py-2.5 rounded-lg`;

const LabTestDetails = () => {
  return (
    <main className="flex flex-col gap-6 mt-5 md:mt-0">
      <BackButton>Back</BackButton>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl md:text-2xl text-sofia_dark font-semibold font-libre_franklin">
          View Test Result
        </h1>

        <div className="flex flex-col gap-4 divide-y divide-[#101010]/5 border border-[#101010]/10 rounded-lg p-2 md:p-4 mb-2">
          <div className="flex items-center">
            <p className="text-xl text-sofia_dark font-semibold flex-1">Test</p>
            <div className="flex items-center gap-4">
              <OutlineButton>Edit</OutlineButton>
              <DeleteButton>Delete</DeleteButton>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>Test Request</Label>
              <Value>Complete Blood Count</Value>
            </div>
            <div>
              <Label>Date Ordered</Label>
              <Value>2 NOV 2024</Value>
            </div>
            <div>
              <Label>Ordered By</Label>
              <Value>Dr Mike Micheal</Value>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>specimen</Label>
              <Value>Blood</Value>
            </div>
            <div>
              <Label>service</Label>
              <Value>in-House Lab</Value>
            </div>
            <div>
              <Label>Type</Label>
              <Value>screening</Value>
            </div>
          </div>
          <div className="pt-3.5">
            <Label>Comments</Label>
            <Value>
              Conduct an interview to gather the patient&apos;s medical history,
              including past illnesses, surgeries, allergies, medications, and
              family medical history. The patient&apos;s chief complaint or
              reason for the current visit is documented.
            </Value>
          </div>
        </div>

        <div className="flex flex-col gap-4 divide-y divide-[#101010]/5 border border-[#101010]/10 rounded-lg p-2 md:p-4">
          <div className="flex items-center">
            <p className="text-xl text-sofia_dark font-semibold flex-1">
              Result
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>Haemoglobin</Label>
              <Value>Complete Blood Count</Value>
            </div>
            <div>
              <Label>hermatocrit</Label>
              <Value>2 NOV 2024</Value>
            </div>
            <div>
              <Label>Ordered By</Label>
              <Value>Dr Mike Micheal</Value>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>specimen</Label>
              <Value>Blood</Value>
            </div>
            <div>
              <Label>service</Label>
              <Value>in-House Lab</Value>
            </div>
            <div>
              <Label>Type</Label>
              <Value>screening</Value>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>specimen</Label>
              <Value>Blood</Value>
            </div>
            <div>
              <Label>service</Label>
              <Value>in-House Lab</Value>
            </div>
            <div>
              <Label>Type</Label>
              <Value>screening</Value>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-2 md:gap-12 pt-3.5">
            <div>
              <Label>Neutrophils</Label>
              <Value>Blood</Value>
            </div>
            <div>
              <Label>Lymphocytes</Label>
              <Value>in-House Lab</Value>
            </div>
            <div>
              <Label>Monocytes</Label>
              <Value>screening</Value>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LabTestDetails;
