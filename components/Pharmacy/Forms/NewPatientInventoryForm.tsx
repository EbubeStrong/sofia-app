"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";

import FormConfig from "@/components/FormElements/FormConfig";
import FormInputButton from "@/components/FormElements/FormInputButton";
import { PharmacyFormProgressStepper } from "../PharmacyProgressStepper";
import {
  MedicalHistorySchema,
  NextOfKinSchema,
  PatientRegistrationSchema,
} from "@/layouts/pharmacy/schema";
import { emergencyContactList } from "@/data/checkin-data";
import { ISchema } from "@/components/FormElements/types";

type TPatientRegistrationFields = {
  firstName: string;
  lastName: string;
  dob: string;
  guardianName?: string;
  guardianPhone?: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  nin?: string;
  email: string;
  address: string;
};

type TNextOfKinFields = {
  nokName: string;
  nokRelationship: string;
  nokPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyAddress: string;
};

type TMedicalHistoryFields = {
  allergies?: string;
  surgeries?: string;
  specialNotes?: string;
};

type TFormData = {
  patientRegistration?: TPatientRegistrationFields;
  nextOfKin?: TNextOfKinFields;
  medicalHistory?: TMedicalHistoryFields;
};

const patientSteps = [
  { id: 1, label: "Registration" },
  { id: 2, label: "Next of Kin" },
  { id: 3, label: "Medical History" },
  { id: 4, label: "Preview" },
];

const renderFormHeader = (step: number) => {
  return (
    <div>
      <PharmacyFormProgressStepper step={step} steps={patientSteps} />
    </div>
  );
};

const NewPatientInventoryForm: React.FC = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TFormData>({
    patientRegistration: undefined,
    nextOfKin: undefined,
    medicalHistory: undefined,
  });

  const genderOptions = useMemo(
    () => [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
    []
  );

  const maritalStatusOptions = useMemo(
    () => [
      { label: "Single", value: "Single" },
      { label: "Married", value: "Married" },
      { label: "Divorced", value: "Divorced" },
      { label: "Widowed", value: "Widowed" },
    ],
    []
  );

  useEffect(() => {
    if (step === 1) {
      if (formData.patientRegistration) {
        form.setFieldsValue(formData.patientRegistration);
      } else {
        form.resetFields();
      }
    }

    if (step === 2) {
      if (formData.nextOfKin) {
        form.setFieldsValue(formData.nextOfKin);
      } else {
        form.resetFields();
      }
    }

    if (step === 3) {
      if (formData.medicalHistory) {
        form.setFieldsValue(formData.medicalHistory);
      } else {
        form.resetFields();
      }
    }
  }, [form, formData, step]);

  const handlePatientRegistration = (values: TPatientRegistrationFields) => {
    setFormData((prev) => ({
      ...prev,
      patientRegistration: values,
    }));
    setStep(2);
  };

  const handleNextOfKin = (values: TNextOfKinFields) => {
    setFormData((prev) => ({
      ...prev,
      nextOfKin: values,
    }));
    setStep(3);
  };

  const handleMedicalHistory = (values: TMedicalHistoryFields) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: values,
    }));
    setStep(4);
  };

  const handleFinalSubmit = () => {
    if (!formData.patientRegistration || !formData.nextOfKin) {
      toast.error("Please complete all steps before submitting");
      return;
    }

    setIsSubmitting(true);
    toast.success("Patient registration submitted successfully");
    setIsSubmitting(false);
    form.resetFields();
    setStep(1);
    setFormData({
      patientRegistration: undefined,
      nextOfKin: undefined,
      medicalHistory: undefined,
    });
  };

  const patientInfo = formData.patientRegistration;
  const nextOfKinInfo = formData.nextOfKin;
  const medicalHistory = formData.medicalHistory;

  const formatValue = (value?: string) => value || "---";
  const formatDate = (value?: string) =>
    value ? dayjs(value).format("DD/MM/YYYY") : "---";

  return (
    <div>
      <section className="mb-6">{renderFormHeader(step)}</section>

      {step === 1 && (
        <FormConfig
          form={form}
          schema={
            PatientRegistrationSchema({
              genderOptions,
              genderLoading: false,
              maritalStatusOptions,
              maritalStatusLoading: false,
            }) as unknown as ISchema<Record<string, unknown>>[]
          }
          onSubmit={handlePatientRegistration}
          btnText="Next"
        />
      )}

      {step === 2 && (
        <FormConfig
          form={form}
          schema={
            NextOfKinSchema({
              relationshipOptions: emergencyContactList,
              relationshipLoading: false,
            }) as unknown as ISchema<Record<string, unknown>>[] 
          }
          onSubmit={handleNextOfKin}
          btnText="Next"
          afterBtn={
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full max-w-[100%] h-[56px] mt-2"
            >
              Back
            </button>
          }
        />
      )}

      {step === 3 && (
        <FormConfig
          form={form}
          schema={MedicalHistorySchema() as unknown as ISchema<Record<string, unknown>>[] }
          onSubmit={handleMedicalHistory}
          btnText="Preview"
          afterBtn={
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full max-w-[100%] h-[56px] mt-2"
            >
              Back
            </button>
          }
        />
      )}

      {step === 4 && (
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-[#101828]">Preview</h4>
            <p className="text-sm text-[#667085]">
              Complete this form to register a new patient
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#667085]">Patient First Name</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.firstName)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Patient Last Name</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.lastName)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Patient Date of Birth</p>
                <p className="font-medium text-[#101828]">
                  {formatDate(patientInfo?.dob)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Gender</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.gender)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Patient Phone Number</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.phone)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Email</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.email)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Patient Marital Status</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.maritalStatus)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">NIN</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(patientInfo?.nin)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#667085]">Patient Home Address</p>
              <p className="font-medium text-[#101828]">
                {formatValue(patientInfo?.address)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-base font-semibold text-[#101828]">Next of Kin</h5>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#667085]">Full Name (Next of Kin)</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.nokName)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Relationship</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.nokRelationship)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Phone Number (Next of Kin)</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.nokPhone)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-base font-semibold text-[#101828]">
              Emergency Contact
            </h5>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#667085]">Full Name</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.emergencyName)}
                </p>
              </div>
              <div>
                <p className="text-[#667085]">Phone Number</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.emergencyPhone)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[#667085]">Address</p>
                <p className="font-medium text-[#101828]">
                  {formatValue(nextOfKinInfo?.emergencyAddress)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-base font-semibold text-[#101828]">
              Patient Medical History
            </h5>

            <div>
              <p className="text-sm text-[#667085] mb-1">Allergies</p>
              <div className="border rounded-lg p-4 text-sm text-[#101828]">
                {formatValue(medicalHistory?.allergies)}
              </div>
            </div>

            <div>
              <p className="text-sm text-[#667085] mb-1">Previous Surgeries</p>
              <div className="border rounded-lg p-4 text-sm text-[#101828]">
                {formatValue(medicalHistory?.surgeries)}
              </div>
            </div>

            <div>
              <p className="text-sm text-[#667085] mb-1">Special Notes</p>
              <div className="border rounded-lg p-4 text-sm text-[#101828]">
                {formatValue(medicalHistory?.specialNotes)}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <FormInputButton
              onHandleAction={handleFinalSubmit}
              loading={isSubmitting}
            >
              Complete Registration
            </FormInputButton>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full h-[56px]"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPatientInventoryForm;