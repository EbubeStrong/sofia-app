"use client";

import React, { useEffect, useState } from "react";
import FormConfig from "@/components/FormElements/FormConfig";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import Cookies from "js-cookie";
import { toast } from "sonner";

import { IFieldData } from "@/components/FormElements/types";
import { toTitleCase } from "@/utils/getInitials";
import {
  useFetchCountry,
  useFetchHospitals,
  useFetchPracticeTypes,
  useCompleteProfile,
  useFetchDoctorSpeciality,
} from "@/hooks/use-client-fetchers";
import { completeProfileSchema } from "@/components/FormElements/schemas";
import { ROUTE_PATH } from "@/utils/constants";

type FieldType = {
  doctorCountry: string;
  doctorState: string;
  doctorHospitalName: string;
  doctorPracticeType: string;
  doctorSpeciality: string;
  doctorBio: string;
  doctorUpload: any; // or UploadFile[] if using Ant Design's Upload component
};

const CompleteProfileLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const doctorId = Cookies.get("doctorId") as string;

  const [fields, setFields] = useState<IFieldData[]>([]);

  const { mutate: completeProfile, isPending: isCompletingProfile } =
    useCompleteProfile(doctorId);

  // const { data: hospitals, isFetching: loadingHospitals } = useFetchHospitals();

  const { data: hospitals, isFetching: loadingHospitals } = useFetchHospitals({
    query: "",
  });

  const { data: countries, isFetching: loadingCountries } = useFetchCountry();
  const { data: practiceTypes, isFetching: loadingPracticeTypes } =
    useFetchPracticeTypes();
  const { data: specialities, isFetching: loadingSpecialities } =
    useFetchDoctorSpeciality();

  const hospitalId = fields.find(
    (field) =>
      Array.isArray(field.name) && field.name.includes("doctorHospitalName")
  )?.value as string;

  const countryId = hospitals?.data?.find(
    (h) => h.id.toString() === hospitalId
  )?.countryId;

  const filteredCountries = countries?.map((c) => ({
    label: toTitleCase(c.name),
    value: c.id.toString(),
  }));

  const filteredHospitals = hospitals?.data?.map((c) => ({
    label: toTitleCase(c.hospitalName),
    value: c.id.toString(),
  }));

  const filteredPracticeTypes = practiceTypes?.map((p) => ({
    label: toTitleCase(p.type),
    value: p.id.toString(),
  }));

  const filteredSpecialities = specialities?.map((s) => ({
    label: toTitleCase(s.speciality),
    value: s.id.toString(),
  }));

  useEffect(() => {
    form.setFieldsValue({
      doctorCountry: countryId?.toString(),
    });
  }, [countryId, form]);

  const schemaProps = {
    countryOptions: filteredCountries ?? [],
    countryLoading: loadingCountries,
    hospitalOptions: filteredHospitals ?? [],
    hospitalLoading: loadingHospitals,
    practiceTypeOptions: filteredPracticeTypes ?? [],
    practiceTypeLoading: loadingPracticeTypes,
    specialityOptions: filteredSpecialities ?? [],
    specialityLoading: loadingSpecialities,
    stateOptions: [],
    stateLoading: false,
  };

  const handleCompleteProfile = (values: FieldType) => {
    const formData = new FormData();

    // Append normal fields
    formData.append("hospitalId", String(values.doctorHospitalName));
    formData.append("countryId", String(values.doctorCountry));
    formData.append("practiceTypeId", String(values.doctorPracticeType));
    formData.append("doctorSpecialityId", String(values.doctorSpeciality));
    formData.append("bio", values.doctorBio ?? "");

    // Append file if available
    if (values.doctorUpload && values.doctorUpload[0]) {
      formData.append("filesUpload", values.doctorUpload[0].originFileObj);
    }

    // // Call API with FormData
    completeProfile(formData, {
      onSuccess: () => {
        toast.success("User profile updated successfully");
        router.push(ROUTE_PATH.DOCTORS);
        form.resetFields();
      },
    });
  };

  return (
    <div className="flex flex-col xl:justify-center w-full xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-24">
      <h1 className="text-2xl lg:text-3xl text-[#101010] font-semibold mb-2">
        Complete your registration
      </h1>
      <p className="text-base text-[#212121]/80 font-medium w-full max-w-full mb-6">
        Enter the Patient ID to request access to their medical records.
      </p>

      <FormConfig
        form={form}
        schema={completeProfileSchema(schemaProps)}
        onSubmit={handleCompleteProfile}
        btnText="Register"
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
        btnLoading={isCompletingProfile}
        formName="complete-profile"
        onFieldChange={(newFields) => {
          setFields(newFields);
        }}
      />
    </div>
  );
};

export default CompleteProfileLayout;
