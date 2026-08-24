"use client";

import React from "react";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { licensingSchema } from "@/components/FormElements/schemas";
import FormConfig from "@/components/FormElements/FormConfig";
import ProgressVariant from "@/components/Progress";
import { useAuthRegStep } from "@/stores/configFormStore";
import { useLicenseOnboarding } from "@/services/authenticate";
import { ROUTE_PATH } from "@/utils/constants";

type FieldType = {
  accreditation_reg: string;
  licenseNumber_reg: string;
  emergency_reg: string;
  telemedicine_reg: string;
  numberOfBeds_reg: string;
  patientCapacity_reg: string;
  phoneNumber_reg: string;
  hospitalWebsiteUrl_reg: string;
};

const LicensingLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { currentStep } = useAuthRegStep();

  const { mutate, isPending } = useLicenseOnboarding();

  const handleLicenseOnboarding = (values: FieldType) => {
    const {
      emergency_reg,
      licenseNumber_reg,
      accreditation_reg,
      telemedicine_reg,
      numberOfBeds_reg,
      patientCapacity_reg,
      phoneNumber_reg,
      hospitalWebsiteUrl_reg,
    } = values;

    const payload = {
      hasEmergencyServices: emergency_reg === "yes",
      hasTelemedicineServices: telemedicine_reg === "yes",
      bedsCapacity: Number(numberOfBeds_reg),
      patientCapacityPerDay: Number(patientCapacity_reg),
      licenseType: accreditation_reg,
      licenseNumber: licenseNumber_reg,
      hospitalPhoneNumber: phoneNumber_reg,
      websiteUrl: hospitalWebsiteUrl_reg,
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success(
            "License and operator information submitted successfully."
          );
          router.push(ROUTE_PATH.TECHNOLOGY);
          form.resetFields();
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <div className="mb-10">
        <h1 className="text-xl lg:text-2xl text-[#101010] font-semibold leading-tight">
          Add License and Operation Information
        </h1>
        <p className="text-sm md:text-base text-[#212121]/80 font-medium mb-2">
          Please provide us with some details about your business.
        </p>

        <div>
          {/* <ProgressVariant
            percent={25}
            strokeColor="#1175C0"
            showInfo={false}
          /> */}
          <ProgressVariant
            currentStep={currentStep}
            totalSteps={2}
            strokeColor="#1175C0"
            showInfo={false}
            />
          <p className="text-sm text-[#101010]">Step {currentStep} of 2</p>
        </div>
      </div>

      <FormConfig
        form={form}
        schema={licensingSchema()}
        onSubmit={handleLicenseOnboarding}
        btnText="Next"
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
        btnLoading={isPending}
        formName="licensing-form"
      />
    </div>
  );
};

export default LicensingLayout;
