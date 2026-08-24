"use client";

import React from "react";
import { Checkbox } from "antd";
import type { CheckboxOptionType, GetProp } from "antd";
import FormInputCheckbox from "@/components/FormElements/FormInputCheckbox";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import FormInputButton from "@/components/FormElements/FormInputButton";

const serviceOptions: CheckboxOptionType<string>[] = [
  { label: "Ambulance Services", value: "Ambulance Services" },
  { label: "In-House Pharmacy", value: "In-House Pharmacy" },
  { label: "Attendant Accommodation", value: "Attendant Accommodation" },
];

const diagnosticsOptions: CheckboxOptionType<string>[] = [
  { label: "Radiology", value: "Radiology" },
  { label: "Lab", value: "Lab" },
  { label: "Pathology", value: "Pathology" },
];

const specialityOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const ServicesLayout = () => {
  const handleServiceChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checkedValues = ", checkedValues);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="px-3 py-4 bg-white border border-solid border-dark/20 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div>
            <p className="text-base md:text-lg text-[#212121] font-semibold">
              Services
            </p>
            <p className="text-sm text-[#212121]">
              Select which media codecs your project should allow.
            </p>
          </div>
          <Checkbox.Group onChange={handleServiceChange}>
            <div className="flex flex-col gap-2">
              {serviceOptions.map(({ label, value }) => (
                <FormInputCheckbox key={value} label={label} value={value} />
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </section>

      <section className="px-3 py-4 bg-white border border-solid border-dark/20 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div>
            <p className="text-base md:text-lg text-[#212121] font-semibold">
              Diagnostics
            </p>
            <p className="text-sm text-[#212121]">
              Select which media codecs your project should allow.
            </p>
          </div>
          <Checkbox.Group onChange={handleServiceChange}>
            <div className="flex flex-col gap-2">
              {diagnosticsOptions.map(({ label, value }) => (
                <FormInputCheckbox key={value} label={label} value={value} />
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </section>

      <section className="p-3 bg-white border border-solid border-dark/20 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div>
            <p className="text-base md:text-lg text-[#212121] font-semibold">
              Specialist availablity
            </p>
            <p className="text-sm text-[#212121]">
              Are your specialist available 24/7?
            </p>
          </div>
          <FormInputDropdown
            options={specialityOptions}
            placeholder="Select speciality option"
          />
        </div>
      </section>

      <div className="flex justify-end w-full mt-6">
        <FormInputButton className="w-full md:max-w-[25%]">
          Save
        </FormInputButton>
      </div>
    </div>
  );
};

export default ServicesLayout;
