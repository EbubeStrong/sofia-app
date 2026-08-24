"use client";

import React, { useEffect } from "react";
import { Form } from "antd";
import { toast } from "sonner";

import { professionalDetailSchema } from "@/app/(dashboard)/settings/general/general-form-schema";
import FormConfig from "@/components/FormElements/FormConfig";
import { IDoctorResponse } from "@/interfaces/doctors";
import { invalidateQuery } from "@/config/query-client";
import { queryKeys } from "@/utils/queryKeys";
import {
  useFetchCountry,
  useFetchHospitals,
  useFetchPracticeTypes,
  useCompleteProfile,
  useFetchDoctorSpeciality,
  useFetchDoctorProfile,
} from "@/hooks/use-client-fetchers";
import { toTitleCase } from "@/utils/getInitials";
import { useConfigFormStore } from "@/stores/configFormStore";

type TProps = {
  doctorProfile: IDoctorResponse["data"];
  doctorId: string;
};

type TFields = {
  hospitalName: string;
  countryOfPractice: string;
  stateOfPractice: string;
  doctorPracticeType: string;
  doctorSpeciality: string;
};

const ProfessionalDetails: React.FC<TProps> = ({ doctorProfile, doctorId }) => {
  const [form] = Form.useForm();
  const { selectionLookup, setSelectionLookup } = useConfigFormStore();
  const hospitalId = Form.useWatch("hospitalName", form);

  const { data: fetchDoctorProfile } = useFetchDoctorProfile(
    doctorId,
    doctorProfile
  );

  // All mutations
  const { mutate: completeProfile, isPending: isCompletingProfile } =
    useCompleteProfile(doctorId);

  // All queries
  const { data: hospitals, isFetching: loadingHospitals } = useFetchHospitals({
    query: selectionLookup ?? "",
  });

  const { data: countries, isFetching: loadingCountries } = useFetchCountry();

  const { data: practiceTypes, isFetching: loadingPracticeTypes } =
    useFetchPracticeTypes();

  const { data: specialities, isFetching: loadingSpecialities } =
    useFetchDoctorSpeciality();

  const filteredCountries = countries?.map((c) => ({
    label: toTitleCase(c.name),
    value: c.id.toString(),
  }));

  const filteredHospitals = hospitals?.data?.map((c) => ({
    label: toTitleCase(c.hospitalName),
    value: c.id.toString(),
  }));

  const filteredPracticeTypes = practiceTypes?.map((p) => ({
    label: p.name,
    value: p.id.toString(),
  }));

  const filteredSpecialities = specialities?.map((s) => ({
    label: toTitleCase(s.speciality),
    value: s.id.toString(),
  }));

  const doctorPracticeId = filteredPracticeTypes?.find(
    (p) => String(p.label) === fetchDoctorProfile?.practiceType
  )?.value;

  const doctorSpecialityId = filteredSpecialities?.find(
    (p) => String(p.label) === fetchDoctorProfile?.doctorSpeciality
  )?.value;

  useEffect(() => {
    const hospitalName = fetchDoctorProfile?.hospital?.hospitalName;
    if (hospitalName) {
      setSelectionLookup(hospitalName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDoctorProfile?.hospital?.hospitalName]);

  useEffect(() => {
    if (fetchDoctorProfile) {
      form.setFieldsValue({
        hospitalName: String(fetchDoctorProfile?.hospital?.id),
        doctorPracticeType: doctorPracticeId,
        doctorSpeciality: doctorSpecialityId,
      });
    }
  }, [doctorPracticeId, doctorSpecialityId, fetchDoctorProfile, form]);

  useEffect(() => {
    if (!hospitalId) {
      form.setFieldsValue({
        countryOfPractice: undefined,
        stateOfPractice: undefined,
      });
      return;
    }

    const hospital = hospitals?.data?.find((h) => String(h.id) === hospitalId);

    form.setFieldsValue({
      countryOfPractice: hospital?.countryId,
      stateOfPractice: hospital?.state,
    });
  }, [hospitalId, hospitals, form]);

  const schemaProps = {
    countryOptions: filteredCountries ?? [],
    countryLoading: loadingCountries,
    hospitalOptions: filteredHospitals ?? [],
    hospitalLoading: loadingHospitals,
    practiceTypeOptions: filteredPracticeTypes ?? [],
    practiceTypeLoading: loadingPracticeTypes,
    specialityOptions: filteredSpecialities ?? [],
    specialityLoading: loadingSpecialities,
  };

  const schema = professionalDetailSchema(schemaProps);

  const submitForm = async (values: TFields) => {
    const formData = new FormData();

    formData.append("hospitalId", String(values.hospitalName));
    formData.append("countryId", String(values.countryOfPractice));

    if (values.doctorPracticeType) {
      formData.append("practiceTypeId", String(values.doctorPracticeType));
    }

    if (values.doctorSpeciality) {
      formData.append("doctorSpecialityId", String(values.doctorSpeciality));
    }

    completeProfile(formData, {
      onSuccess: () => {
        toast.success("User profile updated successfully");
        invalidateQuery(queryKeys.doctors.profile);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-title text-lg md:text-2xl font-semibold leading-relaxed">
          Professional Details
        </h1>
        <p className="text-[#101010B2] text-sm">Manage user information</p>
      </div>

      <FormConfig
        form={form}
        schema={schema}
        btnText="Save Changes"
        onSubmit={submitForm}
        twClassStyle="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        btnLoading={isCompletingProfile}
        formName="professional-details"
        btnClassName="w-full max-w-full md:max-w-[50%]"
      />
    </div>
  );
};

export default ProfessionalDetails;
