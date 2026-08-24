"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";

import ProgressVariant from "./Progress";
import FormConfig from "./FormElements/FormConfig";
import {
  EmergencyContactSchema,
  InsuranceSchema,
  PersonalInfoSchema,
} from "@/layouts/checkin/schema";
import { useCountries, useInsurance, useStates } from "@/services/general";
import { toTitleCase } from "@/utils/getInitials";
import FormInputButton from "./FormElements/FormInputButton";
import {
  useCreateEmergencyInfo,
  useCreateInsuranceInfo,
  useCreatePatientInfo,
} from "@/services/checkins";

import Loader from "./Loader";
import storage from "@/config/storage";
import { invalidateQuery } from "@/config/query-client";

type PatientFormProps = {
  setOpenNewCheckin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCheckinSuccess: React.Dispatch<React.SetStateAction<boolean>>;
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

const renderFormHeader = (
  step: number,
  setStep: (v: number) => void,
  patientId: string,
  fullName: string
) => {
  const TOTAL_STEPS = 3;
  return (
    <div>
      <div className="flex items-center">
        <p className="text-base font-semibold flex-1">
          Step {step}: {step === 1 && "Personal Information"}{" "}
          {step === 2 && "Insurance Information"}{" "}
          {step === 3 && "Emergency Contact"}
        </p>
        {step === 2 && (
          <button
            onClick={() => {
              storage.setCheckin({
                patientId,
                step: 3,
                fullName,
              });
              setStep(3);
            }}
            type="button"
            className="font-medium text-sm text-[#1175C0]"
          >
            Skip
          </button>
        )}
      </div>
      {/* <ProgressVariant percent={20} showInfo={false} /> */}
      <ProgressVariant
              currentStep={step}
              totalSteps={TOTAL_STEPS}
             />
    </div>
  );
};

const NewPatientForm: React.FC<PatientFormProps> = ({
  setOpenNewCheckin,
  setOpenCheckinSuccess,
}) => {
  const [form] = Form.useForm();
  const selectedCountryId = Form.useWatch("country", form);
  const [step, setStep] = useState(1);
  const [insuranceLookup, setInsuranceLookup] = useState("");
  const [patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");

  const { data: insuranceData, isFetching: isFetchingInsurance } =
    useInsurance(insuranceLookup);

  const { data: countries, isFetching: isFetchingCountries } = useCountries();

  const { data: states, isFetching: isFetchingStates } =
    useStates(selectedCountryId);

  const { mutate: createPatient, isPending: isCreatingPatient } =
    useCreatePatientInfo();

  const { mutate: createInsurance, isPending: isCreatingInsurance } =
    useCreateInsuranceInfo(patientId);

  const { mutate: createEmergency, isPending: isCreatingEmergency } =
    useCreateEmergencyInfo(patientId);

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

  useEffect(() => {
    const data = storage.getCheckin();
    if (data) {
      setPatientId(data?.patientId);
      setStep(data?.step as number);
      setFullName(data?.fullName as string);
    }
  }, []);

  const handlePatientInfo = (values: TPatientInfoFields) => {
    const payload = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      dateOfBirth: dayjs(values?.dateOfBirth).format("D-MM-YYYY"),
      address: values.address,
      countryId: Number(values.country),
      stateId: Number(values.state),
      occupation: values.occupation,
    };
    createPatient(
      { body: payload },
      {
        onSuccess: (response) => {
          toast.success("Personal info created successfully");
          setPatientId(response?.patientId);
          setFullName(response?.fullName);
          storage.setCheckin({
            patientId: response?.patientId,
            fullName: response?.fullName,
            step: 2,
          });
          invalidateQuery(["existing_patients"]);
          setStep(2);
          form.resetFields();
          return;
        },
      }
    );
  };

  const handleInsuranceInfo = (values: TInsuranceInfoFields) => {
    const payload = {
      insuranceId: values.insuranceProvider,
      policyNumber: values.enroleeId,
      patientId: patientId,
    };
    createInsurance(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Insurance info created successfully");
          storage.setCheckin({
            patientId,
            step: 3,
            fullName,
          });
          setStep(3);
          form.resetFields();
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
      patientId: patientId,
    };
    createEmergency(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Emergency contact created successfully");
          storage.setCheckin({
            patientId,
            step: 3,
            fullName,
          });
          setOpenNewCheckin(false);
          form.resetFields();
          setOpenCheckinSuccess(true);
          invalidateQuery(["existing_patients"]);
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
  };

  const insuranceProps = {
    insuranceOptions: fetchInsurance ?? [],
    insuranceLoading: isFetchingInsurance,
    onInsuranceSearch: (value: string) => setInsuranceLookup(value),
    onInsuranceClear: () => setInsuranceLookup(""),
    onInsuranceSelect: () => setInsuranceLookup(""),
  };

  return (
    <div>
      <section className="mb-6">
        {renderFormHeader(step, setStep, patientId, fullName)}
      </section>

      {step === 1 && (
        <FormConfig
          form={form}
          schema={PersonalInfoSchema({
            ...personalInfoProps,
          })}
          onSubmit={handlePatientInfo}
          btnLoading={isCreatingPatient}
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
              <button
                type="button"
                onClick={() => {
                  storage.setCheckin({
                    patientId,
                    step: 1,
                    fullName,
                  });
                  setStep(1);
                }}
                className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full max-w-[50%] h-[56px]"
              >
                Back
              </button>
              <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingInsurance ? <Loader color="white" /> : "Next"}
                </FormInputButton>
              </div>
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
              <button
                type="button"
                onClick={() => {
                  storage.setCheckin({
                    patientId,
                    step: 2,
                    fullName,
                  });
                  setStep(2);
                }}
                className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full max-w-[50%] h-[56px]"
              >
                Back
              </button>
              <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingEmergency ? <Loader color="white" /> : "Next"}
                </FormInputButton>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default NewPatientForm;
