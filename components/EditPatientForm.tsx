"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";

import FormConfig from "./FormElements/FormConfig";
import {
  EmergencyContactSchema,
  InsuranceSchema,
  PersonalInfoSchema,
} from "@/layouts/checkin/schema";
import { useCountries, useInsurance, useStates } from "@/services/general";
import { toTitleCase } from "@/utils/getInitials";
import FormInputButton from "./FormElements/FormInputButton";

import Loader from "./Loader";
import { invalidateQuery } from "@/config/query-client";
import {
  usePatientSingleRecord,
  useUpdateEmergencyInfo,
  useUpdateInsuranceInfo,
  useUpdatePatientInfo,
} from "@/services/patients";
import ComponentLoader from "./Loader/ComponentLoader";
import { TPatientRecordsById } from "@/interfaces/patients";

type PatientFormProps = {
  step: number;
  getPatientId: string;
  setOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>;
};

type TPatientInfoFields = {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  country: string;
  state: string;
  address: string;
  dateOfBirth: string;
};

type TInsuranceInfoFields = {
  insuranceProvider: string;
  enroleeId: string;
};

type TEmergencyInfoFields = {
  contactName: string;
  relationship: string;
  phoneNumber: string;
};

const renderFormHeader = (step: number) => {
  return (
    <div>
      <div className="flex items-center">
        <p className="text-base font-semibold flex-1">
          {step === 1 && "Personal Information"}{" "}
          {step === 2 && "Insurance Information"}{" "}
          {step === 3 && "Emergency Contact"}
        </p>
      </div>
    </div>
  );
};

const EditPatientForm: React.FC<PatientFormProps> = ({
  setOpenEditForm,
  step,
  getPatientId,
}) => {
  const [form] = Form.useForm();
  const selectedCountryId = Form.useWatch("country", form);

  const [insuranceLookup, setInsuranceLookup] = useState("");

  const { data: insuranceData, isFetching: isFetchingInsurance } =
    useInsurance(insuranceLookup);

  const { data: countries, isFetching: isFetchingCountries } = useCountries();

  const { data: states, isFetching: isFetchingStates } =
    useStates(selectedCountryId);

  const {
    data: patientRecord,
    isFetching: isFetchingPatientRecord,
    isSuccess: isPatientRecordSuccess,
  } = usePatientSingleRecord(getPatientId);

  const { mutate: updatePatient, isPending: isUpdatingPatient } =
    useUpdatePatientInfo(getPatientId);

  const { mutate: updateInsurance, isPending: isUpdatingInsurance } =
    useUpdateInsuranceInfo(getPatientId);

  const { mutate: updateEmergency, isPending: isUpdatingEmergency } =
    useUpdateEmergencyInfo(getPatientId);

  const fetchCountries = useMemo(
    () =>
      countries?.map((country) => ({
        label: toTitleCase(country?.name),
        value: String(country?.id),
      })),
    [countries]
  );

  const fetchInsurance = useMemo(
    () =>
      insuranceData?.data?.map((insurance) => ({
        label: insurance.insuranceName,
        value: insurance?.id,
      })),
    [insuranceData?.data]
  );

  const fetchStates = useMemo(
    () =>
      states?.map((state) => ({
        label: state?.name,
        value: String(state?.id),
      })),
    [states]
  );

  const getFieldValuesByStep = useCallback(
    (step: number, patientRecord: TPatientRecordsById["data"]) => {
      const isEmergency = patientRecord.email?.includes("emergency_");

      switch (step) {
        case 1:
          return {
            firstName: !isEmergency ? patientRecord.firstName : "",
            lastName: !isEmergency ? patientRecord.lastName : "",
            middleName: patientRecord.middleName ?? "",
            email: !isEmergency ? patientRecord.email ?? "" : "",
            phoneNumber: patientRecord.phoneNumber ?? "",
            gender: patientRecord.gender || undefined,
            maritalStatus: patientRecord.maritalStatus || undefined,
            dateOfBirth: patientRecord.dob
              ? dayjs(patientRecord.dob, "DD-MM-YYYY")
              : null,
            address: patientRecord.homeAddress ?? "",
            country: patientRecord.countryId?.toString() || undefined,
            state: patientRecord.stateId?.toString() || undefined,
            occupation: patientRecord.occupation || undefined,
          };
        case 2:
          return {
            enroleeId: patientRecord.policyNumber ?? "",
            insuranceProvider:
              patientRecord.insuranceId?.toString() || undefined,
          };
        case 3:
          return {
            contactName: patientRecord.emergencyContactName ?? "",
            relationship:
              patientRecord.emergencyContactRelationship || undefined,
            phoneNumber: patientRecord.emergencyContactPhoneNumber || "",
          };
        default:
          return null;
      }
    },
    []
  );

  useEffect(() => {
    if (!isPatientRecordSuccess || !patientRecord) return;

    const fieldsToSet = getFieldValuesByStep(step, patientRecord);
    if (fieldsToSet) {
      form.setFieldsValue(fieldsToSet);
    }
  }, [form, isPatientRecordSuccess, patientRecord, step, getFieldValuesByStep]);

  const handlePatientInfo = (values: TPatientInfoFields) => {
    const payload = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      dateOfBirth: dayjs(values?.dateOfBirth).format("DD-MM-YYYY"),
      address: values.address,
      countryId: Number(values.country),
      stateId: Number(values.state),
      occupation: values.occupation,
    };
    updatePatient(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Personal info updated successfully");
          invalidateQuery(["existing_patients"]);
          invalidateQuery(["patients"]);
          invalidateQuery(["patient_single_record"]);
          form.resetFields();
          setOpenEditForm(false);
          return;
        },
      }
    );
  };

  const handleInsuranceInfo = (values: TInsuranceInfoFields) => {
    const payload = {
      insuranceId: values.insuranceProvider,
      policyNumber: values.enroleeId,
      patientId: getPatientId,
    };
    updateInsurance(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Insurance info updated successfully");
          invalidateQuery(["patients"]);
          invalidateQuery(["patient_single_record"]);
          form.resetFields();
          setOpenEditForm(false);
          return;
        },
      }
    );
  };

  const handleEmergencyInfo = (values: TEmergencyInfoFields) => {
    const payload = {
      contactName: values.contactName,
      relationship: values.relationship,
      contactPhone: values.phoneNumber,
      patientId: getPatientId,
    };
    updateEmergency(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Emergency contact updated successfully");
          form.resetFields();
          invalidateQuery(["patients"]);
          invalidateQuery(["patient_single_record"]);
          setOpenEditForm(false);
          return;
        },
      }
    );
  };

  const personalInfoProps = {
    countryOptions: fetchCountries ?? [],
    countryLoading: isFetchingCountries,
    statesOptions: fetchStates ?? [],
    statesLoading: isFetchingStates,
    type: "update",
  };

  const insuranceProps = {
    insuranceOptions: fetchInsurance ?? [],
    insuranceLoading: isFetchingInsurance,
    onInsuranceSearch: (value: string) => setInsuranceLookup(value),
    onInsuranceClear: () => setInsuranceLookup(""),
    onInsuranceSelect: () => setInsuranceLookup(""),
  };

  if (isFetchingPatientRecord) {
    return <ComponentLoader label="Loading patient info..." />;
  }

  return (
    <div>
      <section className="mb-6">{renderFormHeader(step)}</section>

      {step === 1 && (
        <FormConfig
          form={form}
          schema={PersonalInfoSchema({
            ...personalInfoProps,
          })}
          onSubmit={handlePatientInfo}
          btnLoading={isUpdatingPatient}
        />
      )}

      {step === 2 && (
        <FormConfig
          form={form}
          schema={InsuranceSchema({
            ...insuranceProps,
          })}
          onSubmit={handleInsuranceInfo}
          afterBtn={
            <div className="flex w-full max-w-full gap-2 mt-10">
              <FormInputButton className="w-full max-w-full">
                {isUpdatingInsurance ? <Loader color="white" /> : "Save"}
              </FormInputButton>
            </div>
          }
        />
      )}

      {step === 3 && (
        <FormConfig
          form={form}
          schema={EmergencyContactSchema()}
          onSubmit={handleEmergencyInfo}
          afterBtn={
            <div className="flex w-full max-w-full gap-2 mt-10">
              <FormInputButton className="w-full max-w-full">
                {isUpdatingEmergency ? <Loader color="white" /> : "Save"}
              </FormInputButton>
            </div>
          }
        />
      )}
    </div>
  );
};

export default EditPatientForm;
