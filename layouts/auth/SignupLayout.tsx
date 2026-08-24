"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import storage from "@/config/storage";
import { RegisterSchema } from "@/components/FormElements/schemas";
import FormConfig from "@/components/FormElements/FormConfig";
import { ROUTE_PATH } from "@/utils/constants";
import { useCountries, useHospitals, useStates } from "@/services/general";
import { toTitleCase } from "@/utils/getInitials";
import { AuthPolicyContent } from "@/components/AuthPolicyText";
import AuthRegisterAction from "../dashboard/AuthRegisterAction";
import { useSignUp } from "@/services/authenticate";
import cleanupObject from "@/utils/cleanupObj";

type FieldType = {
  hospitalName_reg: string;
  newHospitalName_reg: string;
  alternativeTradeName_reg: string;
  hospitalEmail_reg: string;
  doctorAddress_reg: string;
  doctorPassword: string;
  hospitalState_reg: string;
  hospitalCountry_reg: string;
};

const SignupLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const countryId = Form.useWatch("hospitalCountry_reg", form);

  const [hospitalLookup, setHospitalLookup] = useState("");

  const { data: countries, isFetching: isFetchingCountries } = useCountries();

  const { data: hospitals, isFetching: isFetchingHospitals } = useHospitals(
    countryId,
    hospitalLookup
  );

  const { data: states, isFetching: isFetchingStates } = useStates(countryId);

  const { mutate: registerUser, isPending: isRegisteringUser } = useSignUp();

  const fetchCountries = useMemo(
    () =>
      countries?.map((country) => ({
        label: toTitleCase(country?.name),
        value: String(country?.id),
      })),
    [countries]
  );

  const fetchHospitals = useMemo(
    () =>
      hospitals?.data?.map((hospital) => ({
        label: toTitleCase(hospital?.hospitalName),
        value: hospital?.id.toString(),
      })),
    [hospitals]
  );

  const fetchStates = useMemo(
    () =>
      states?.map((state) => ({
        label: state?.name,
        value: String(state?.id),
      })),
    [states]
  );

  useEffect(() => {
    const country = fetchCountries?.find((o) => o.value === "166");
    if (country) {
      form.setFieldsValue({
        hospitalCountry_reg: country?.value,
      });
    }
  }, [fetchCountries, form]);

  const handleRegister = (values: FieldType) => {
    const data = {
      hospitalId: values.hospitalName_reg
        ? Number(values.hospitalName_reg)
        : undefined,
      hospitalName: values.newHospitalName_reg ?? undefined,
      alternativeTradeName: values.alternativeTradeName_reg,
      hospitalEmail: values.hospitalEmail_reg,
      address: values.doctorAddress_reg,
      stateId: Number(values.hospitalState_reg),
      countryId: Number(values.hospitalCountry_reg),
      password: values.doctorPassword,
      confirmPassword: values.doctorPassword,
    };
    cleanupObject(data);

    registerUser(
      { body: data },
      {
        onSuccess: (response) => {
          toast.success("Profile created successfully");
          Cookies.set("token", response?.token);
          storage.setUser(response?.user);
          router.push(ROUTE_PATH.VERIFY_OTP);
          form.resetFields();
          return;
        },
      }
    );
  };

  const props = {
    countryOptions: fetchCountries ?? [],
    countryLoading: isFetchingCountries,
    hospitalOptions: fetchHospitals ?? [],
    hospitalLoading: isFetchingHospitals,
    statesOptions: fetchStates ?? [],
    statesLoading: isFetchingStates,
    onHospitalSearch: (value: string) => setHospitalLookup(value),
    onHospitalClear: () => setHospitalLookup(""),
    onHospitalSelect: () => setHospitalLookup(""),
  };

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-48px)] h-auto px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <h1 className="text-xl lg:text-2xl text-[#101010] font-semibold mb-2">
        Welcome to Sofiamatics
      </h1>
      <div className="w-full max-w-full mb-10">
        <p className="text-sm md:text-base text-[#212121]/80 font-medium">
          <span className="text-red-600">*</span> Enter the basic information to
          create your records.
        </p>
        <p className="text-sm md:text-base text-[#212121]/80 font-medium">
          <span className="text-red-600">*</span> All fields are required unless
          noted otherwise.
        </p>
      </div>

      <FormConfig
        form={form}
        schema={RegisterSchema({
          ...props,
        })}
        onSubmit={handleRegister}
        btnText="Continue"
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
        btnLoading={isRegisteringUser}
        formName="register-form"
        beforeBtn={<AuthPolicyContent text="continue" />}
        afterBtn={
          <AuthRegisterAction
            description={"Already have an account?"}
            path={"/"}
            label={"Sign in"}
          />
        }
      />
    </div>
  );
};

export default SignupLayout;
