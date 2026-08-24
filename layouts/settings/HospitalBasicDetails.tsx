"use client";

import { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import { toast } from "sonner";

import { generalFormSchema } from "@/app/(dashboard)/settings/general/general-form-schema";
import FormConfig from "@/components/FormElements/FormConfig";
import ChangePasswordForm from "./ChangePassword";
import { toTitleCase } from "@/utils/getInitials";
import { useCountries, useHospitals, useStates } from "@/services/general";
import {
  useHospitalProfile,
  useUpdateHospitalProfile,
} from "@/services/hospital";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import { invalidateQuery } from "@/config/query-client";

type IGeneralCredentials = {
  st_tradeName: string;
  st_phoneNumber: string;
  st_websiteUrl: string;
  st_address: string;
};

export default function HospitalBasicDetails() {
  const [form] = Form.useForm();
  const selectedCountryId = Form.useWatch("st_country", form);

  // states
  const [openPassword, setOpenPassword] = useState(false);
  const [hospitalLookup, setHospitalLookup] = useState("");

  const { data: countries, isFetching: isFetchingCountries } = useCountries();

  const { data: hospitals, isFetching: isFetchingHospitals } = useHospitals(
    selectedCountryId,
    hospitalLookup
  );

  const { data: states, isFetching: isFetchingStates } =
    useStates(selectedCountryId);

  const {
    data: hospitalProfile,
    isFetching: isFetchingHospitalProfile,
    isSuccess: isProfileSuccess,
  } = useHospitalProfile();

  const { mutate, isPending } = useUpdateHospitalProfile();

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
    if (isProfileSuccess && hospitalProfile) {
      form.setFieldsValue({
        st_country: hospitalProfile.countryId?.toString(),
        st_hospitalName: hospitalProfile.id?.toString(),
        st_tradeName: hospitalProfile?.alternativeTradeName,
        st_email: hospitalProfile?.hospitalEmail,
        st_phoneNumber: hospitalProfile?.phoneNumber,
        st_state: hospitalProfile?.state,
        st_address: hospitalProfile?.address,
        st_websiteUrl: hospitalProfile?.websiteUrl,
      });

      setHospitalLookup(hospitalProfile.hospitalName || "");
    }
  }, [isProfileSuccess, hospitalProfile, form]);

  const handleOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleProfileDetails = async (values: IGeneralCredentials) => {
    const payload = {
      alternativeTradeName: values.st_tradeName,
      phoneNumber: values.st_phoneNumber,
      websiteUrl: values.st_websiteUrl,
      address: values.st_address,
    };
    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          invalidateQuery(["hospital_profile"]);
          form.resetFields();
          return;
        },
      }
    );
  };

  if (isFetchingHospitalProfile) {
    return <ComponentLoader label="Loading basic info..." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold leading-relaxed">
          Basic Information
        </h1>
        <p className="text-[#101010B2] text-sm">Manage user information</p>
      </div>

      <div className="p-2 md:p-4 bg-white border rounded-md">
        <FormConfig
          form={form}
          schema={generalFormSchema({
            countryOptions: fetchCountries ?? [],
            countryLoading: isFetchingCountries,
            hospitalOptions: fetchHospitals ?? [],
            hospitalLoading: isFetchingHospitals,
            statesOptions: fetchStates ?? [],
            statesLoading: isFetchingStates,
            onCustomAction: handleOpenPassword,
            onHospitalSearch: (value: string) => setHospitalLookup(value),
            onHospitalClear: () => setHospitalLookup(""),
            onHospitalSelect: () => {
              setHospitalLookup("");
            },
          })}
          onSubmit={handleProfileDetails}
          twClassStyle="grid grid-cols-1 md:grid-cols-2 gap-x-4"
          btnLoading={isPending}
        />
      </div>

      <ChangePasswordForm
        openPassword={openPassword}
        setOpenPassword={setOpenPassword}
      />
    </div>
  );
}
