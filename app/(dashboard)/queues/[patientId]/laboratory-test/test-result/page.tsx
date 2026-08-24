"use client";

import React from "react";

//components
import BackButton from "@/components/BackButton";
import PatientSummaryCard from "@/components/Patients/PatientSummaryCard";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import FormConfig from "@/components/FormElements/FormConfig";
import { labTestResultSchema } from "@/components/FormElements/schemas";
import { Form } from "antd";

interface FieldType {
  orderBy: string;
}

const testOptions = [
  {
    label: "Complete Blood Count",
    value: "Complete Blood Count",
  },
  {
    label: "Urinalysis",
    value: "Urinalysis",
  },
  {
    label: "Wyder test",
    value: "Wyder test",
  },
];

const AddTestResults = () => {
  const [form] = Form.useForm();

  const handleSubmitTestResult = (values: FieldType) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col gap-6 mt-5 md:mt-0">
      <BackButton>Back</BackButton>

      <div className="flex flex-col gap-5">
        <h1 className="text-xl md:text-2xl text-sofia_dark font-semibold font-libre_franklin">
          Add Test Result
        </h1>

        <PatientSummaryCard type="profile" />
        <div className="w-full md:max-w-[50%]">
          <FormInputDropdown
            label="Test Request"
            placeholder="Select test results"
            options={testOptions}
          />
        </div>

        <div className="flex flex-col gap-4 p-2 md:p-4 border border-solid border-[#d0d5dd] rounded-lg">
          <p className="text-base text-sofia_dark font-medium">
            Complete Blood Count (CBC)
          </p>
          <FormConfig
            form={form}
            schema={labTestResultSchema}
            onSubmit={handleSubmitTestResult}
            btnText="Save Test Result"
            twClassStyle="grid grid-cols-1 md:grid-cols-2 md:gap-x-4"
          />
        </div>
      </div>
    </main>
  );
};

export default AddTestResults;
