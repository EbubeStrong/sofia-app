"use client";

import React, { useState } from "react";
import { Form } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { technologySchema } from "@/components/FormElements/schemas";
import FormConfig from "@/components/FormElements/FormConfig";
import ProgressVariant from "@/components/Progress";
import { useAuthRegStep } from "@/stores/configFormStore";
import { useInsurance } from "@/services/general";
import { useTechnologyOnboarding } from "@/services/authenticate";
import { ROUTE_PATH } from "@/utils/constants";

type FieldProps = {
  existingEmr_reg: string;
  supportServices_reg: string;
  hasInHousePharmacy: string;
  existingSolution_reg: string;
  insuranceProvider_reg: string[];
};

const TechnologyLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { currentStep } = useAuthRegStep();

  const [insuranceLookup, setInsuranceLookup] = useState("");

  const { data: insuranceData, isFetching: isFetchingInsurance } =
    useInsurance(insuranceLookup);

  const { mutate, isPending } = useTechnologyOnboarding();

  const fetchInsurance = insuranceData?.data?.map((insurance) => ({
    label: insurance.insuranceName,
    value: insurance?.id,
  }));

  const handleTechOnboarding = (values: FieldProps) => {
    const { existingEmr_reg, insuranceProvider_reg, existingSolution_reg } =
      values;

    const payload = {
      usesExistingEmr: existingEmr_reg === "Yes",
      existingEmrName: existingSolution_reg,
      insuranceProviders: insuranceProvider_reg,
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success(
            "Insurance and technology information submitted successfully."
          );
          router.push(`${ROUTE_PATH.ONBOARDING_COMPLETION}`);
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
          Add Insurance and Technology
        </h1>
        <p className="text-sm md:text-base text-[#212121]/80 font-medium mb-2">
          Please provide us with some details about your business.
        </p>

        <div>
          {/* <ProgressVariant
            percent={75}
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
        schema={technologySchema({
          insuranceOptions: fetchInsurance ?? [],
          insuranceLoading: isFetchingInsurance,
          onInsuranceSearch: (value: string) => setInsuranceLookup(value),
          onInsuranceClear: () => setInsuranceLookup(""),
          onInsuranceSelect: () => setInsuranceLookup(""),
        })}
        onSubmit={handleTechOnboarding}
        btnText="Next"
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
        btnLoading={isPending}
        formName="licensing-form"
      />
    </div>
  );
};

export default TechnologyLayout;
