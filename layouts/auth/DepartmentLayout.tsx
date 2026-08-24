"use client";

import React from "react";
import { Form } from "antd";

import { departmentSchema } from "@/components/FormElements/schemas";
import FormConfig from "@/components/FormElements/FormConfig";
import ProgressVariant from "@/components/Progress";
import { useAuthRegStep } from "@/stores/configFormStore";

const DepartmentLayout = () => {
  const [form] = Form.useForm();
  const { currentStep } = useAuthRegStep();

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <div className="mb-10">
        <h1 className="text-xl lg:text-2xl text-[#101010] font-semibold leading-tight">
          Add Department and Services
        </h1>
        <p className="text-sm md:text-base text-[#212121]/80 font-medium mb-2">
          Please provide us with some details about your business.
        </p>

        <div>
          {/* <ProgressVariant
            percent={50}
            strokeColor="#1175C0"
            showInfo={false}
          /> */}
          <ProgressVariant
            currentStep={currentStep}
            totalSteps={4}
            strokeColor="#1175C0"
            showInfo={false}
            />
          <p className="text-sm text-[#101010]">Step {currentStep} of 4</p>
        </div>
      </div>

      <FormConfig
        form={form}
        schema={departmentSchema()}
        onSubmit={() => {}}
        btnText="Next"
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
        btnLoading={false}
        formName="department-form"
      />
    </div>
  );
};

export default DepartmentLayout;
