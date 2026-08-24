"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";


import {
  EmergencyContactSchema,
  PersonalInfoSchema,
  AllergiesSchema,
} from "@/layouts/checkin/schema";
import { useCountries, useInsurance, useStates } from "@/services/general";
import { toTitleCase } from "@/utils/getInitials";
import {
  useCreateEmergencyInfo,
  useCreateInsuranceInfo,
  useCreatePatientInfo,
} from "@/services/checkins";


import storage from "@/config/storage";
import { invalidateQuery } from "@/config/query-client";
import ProgressVariant from "@/components/Progress";
import FormConfig from "@/components/FormElements/FormConfig";
import FormInputButton from "@/components/FormElements/FormInputButton";
import Loader from "@/components/Loader";
import { TAllergyType, TDrugCondition, TSeverity } from "@/data/checkin-data";
import { PreviewItem, renderList } from "../check-in/PreviewItems";

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



type TEmergencyInfoFields = {
  contactName: string;
  relationship: string;
  phoneNumber: string;
};

type TAllergyFields = {
  allergiesType: TAllergyType[];     
  severity: TSeverity;               
  drugCondition: TDrugCondition[];   
  agent: string;
  reactions: string;
  patientInstructions: string;
};


type TFormData = {
  patientInfo?: TPatientInfoFields;
  emergencyInfo?: TEmergencyInfoFields;
  allergyInfo?: TAllergyFields;
};

const renderFormHeader = (
  step: number,
  setStep: (v: number) => void,
  patientId: string,
  fullName: string
) => {
  const TOTAL_STEPS = 3;

  const handleSkip = () => {
    const nextStep = step === 2 ? 3 : step === 3 ? 4 : step;

    // storage.setCheckin({
    //   patientId,
    //   step: nextStep,
    //   fullName,
    // });
    console.log("step", step)
    setStep(nextStep);
  };

  return (
    <div>
      <div className="flex items-center">
        <p className="text-base font-semibold flex-1">
           {step !== 4 && <>Step {step}: </>}
          {step === 1 && "Personal Information"}
          {step === 2 && "Next of kin and Emergency Contact Information"}
          {step === 3 && "Allergies"}
          {step === 4 && "Preview"}
        </p>

        {(step === 2 || step === 3) && (
          <button
            onClick={handleSkip}
            type="button"
            className="font-medium text-sm text-[#1175C0]"
          >
            {step === 3 ? "Skip to Preview" : "Skip"}
          </button>
        )}
      </div>
    
      {step !== 4 && 
      <ProgressVariant
        currentStep={step}
        totalSteps={TOTAL_STEPS}
      />
      }
    </div>
  );
};

const PharmacyNewPatientForm: React.FC<PatientFormProps> = ({
  setOpenNewCheckin,
  setOpenCheckinSuccess,
}) => {
  const [form] = Form.useForm();
  const selectedCountryId = Form.useWatch("country", form);
  const [step, setStep] = useState(1);
  console.log("step", step)
  const [patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState<TFormData>({
      patientInfo: undefined,
      emergencyInfo: undefined,
      allergyInfo: undefined,
    });
  

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
    setFormData((prev) => ({
      ...prev,
      patientInfo: values,
    }));
    setStep(2);
    // const payload = {
    //   firstName: values.firstName,
    //   middleName: values.middleName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   phoneNumber: values.phoneNumber,
    //   gender: values.gender,
    //   maritalStatus: values.maritalStatus,
    //   dateOfBirth: dayjs(values?.dateOfBirth).format("D-MM-YYYY"),
    //   address: values.address,
    //   countryId: Number(values.country),
    //   stateId: Number(values.state),
    //   occupation: values.occupation,
    // };
    // createPatient(
    //   { body: payload },
    //   {
    //     onSuccess: (response) => {
    //       toast.success("Personal info created successfully");
    //       setPatientId(response?.patientId);
    //       setFullName(response?.fullName);
    //       storage.setCheckin({
    //         patientId: response?.patientId,
    //         fullName: response?.fullName,
    //         step: 2,
    //       });
    //       invalidateQuery(["existing_patients"]);
    //       setStep(2);
    //       form.resetFields();
    //       return;
    //     },
    //   }
    // );
  };

  

  const handleEmergencyInfo = (values: TEmergencyInfoFields) => {
    setFormData((prev) => ({
      ...prev,
      emergencyInfo: values,
    }));
    setStep(3);
    // const payload = {
    //   contactName: values.contactName,
    //   relationship: values.relationship,
    //   contactPhone: values.phoneNumber,
    //   patientId: patientId,
    // };
    // createEmergency(
    //   { body: payload },
    //   {
    //     onSuccess: () => {
    //       toast.success("Emergency contact created successfully");
    //       storage.setCheckin({
    //         patientId,
    //         step: 3,
    //         fullName,
    //       });
    //       setOpenNewCheckin(false);
    //       form.resetFields();
    //       setOpenCheckinSuccess(true);
    //       invalidateQuery(["existing_patients"]);
    //       return;
    //     },
    //   }
    // );
  };

  const handleAllergyInfo = (values: TAllergyFields) => {
    setFormData((prev) => ({
      ...prev,
      allergyInfo: values,
    }));
    setStep(4);
    // const payload = {
    //   contactName: values.contactName,
    //   relationship: values.relationship,
    //   contactPhone: values.phoneNumber,
    //   patientId: patientId,
    // };
    // createEmergency(
    //   { body: payload },
    //   {
    //     onSuccess: () => {
    //       toast.success("Emergency contact created successfully");
    //       storage.setCheckin({
    //         patientId,
    //         step: 3,
    //         fullName,
    //       });
    //       setOpenNewCheckin(false);
    //       form.resetFields();
    //       setOpenCheckinSuccess(true);
    //       invalidateQuery(["existing_patients"]);
    //       return;
    //     },
    //   }
    // );
  };

  const handleFinalSubmit = () => {
      if (!formData.patientInfo || !formData.emergencyInfo || !formData.allergyInfo) {
        toast.error("Please complete all steps before submitting");
        return;
      }
  setOpenCheckinSuccess(true)
  setOpenNewCheckin(false)
    //   const payload: {
    //     patientName: string;
    //     dateOfBirth: string;
    //     patientDrug: string;
    //     form: string;
    //     quantity: number;
    //     refillNumber: number;
    //     allowSubstitute: boolean;
    //     attachment?: string;
    //     directionsForUse: string;
    //     prescriberName: string;
    //     prescriberLicenseNumber: string;
    //     prescriberPhoneNumber: string;
    //     dateOfPrescription: string;
    //   } = {
    //     patientName: formData.prescriptionInfo.patientName,
    //     dateOfBirth: dayjs(formData.prescriptionInfo.dateOfBirth).format(
    //       "D-MM-YYYY"
    //     ),
    //     patientDrug: formData.prescriptionInfo.patientDrug,
    //     form: formData.prescriptionInfo.form,
    //     quantity: Number(formData.prescriptionInfo.quantity),
    //     refillNumber: Number(formData.prescriptionInfo.refillNumber),
    //     allowSubstitute: formData.prescriptionInfo.allowSubstitute === "Yes" ? true : false,
    //     attachment: formData.prescriptionInfo.attachment,
    //     directionsForUse: formData.prescriptionInfo.directionsForUse,
    //     prescriberName: formData.prescriberInfo.prescriberName,
    //     prescriberLicenseNumber: formData.prescriberInfo.prescriberLicenseNumber,
    //     prescriberPhoneNumber: formData.prescriberInfo.prescriberPhoneNumber,
    //     dateOfPrescription: formData.prescriberInfo.dateOfPrescription,
    //   };
  

    //   createNewPrescription(
    //     { body: payload },
    //     {
    //       onSuccess: () => {
    //         toast.success("Prescription submitted successfully");
    //         form.resetFields();
    //         setStep(1);
    //         setFormData({
    //           patientInfo: undefined,
    //           emergencyInfo: undefined,
    //           allergyInfo: undefined,
    //         });
    //       },
    //       onError: (error) => {
    //         toast.error("Failed to submit prescription");
    //         console.error("Submission error:", error);
    //       },
    //     }
    //   );
    };

  const personalInfoProps = {
    countryOptions: fetchCountries ?? [],
    countryLoading: isFetchingCountries,
    statesOptions: fetchStates ?? [],
    statesLoading: isFetchingStates,
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
          schema={EmergencyContactSchema()}
          onSubmit={handleEmergencyInfo}
          afterBtn={
            <div className="flex flex-col w-full max-w-full gap-2 mt-10">
              <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingEmergency ? <Loader color="white" /> : "Next"}
                </FormInputButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  // storage.setCheckin({
                  //   patientId,
                  //   step: 1,
                  //   fullName,
                  // });
                  setStep(1);
                }}
                className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full h-[56px]"
              >
                Back
              </button>
            </div>
          }
        />
      )}

      {step === 3 && (
        <FormConfig
          form={form}
          schema={AllergiesSchema()}
          onSubmit={handleAllergyInfo}
          afterBtn={
            <div className="flex flex-col w-full max-w-full gap-2 mt-10">
                <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingEmergency ? <Loader color="white" /> : "Preview"}
                </FormInputButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  // storage.setCheckin({
                  //   patientId,
                  //   step: 2,
                  //   fullName,
                  // });
                  setStep(2);
                }}
                className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full h-[56px]"
              >
                Back
              </button>


              
            </div>
          }
        />
      )}

      {step === 4 && formData.patientInfo && (
  <div className="space-y-8">


    {/* Patient Info */}
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      <PreviewItem
        label="Patient First Name"
        value={formData.patientInfo.firstName}
      />
      <PreviewItem
        label="Patient Last Name"
        value={formData.patientInfo.lastName}
      />
      <PreviewItem
        label="Patient Date of Birth"
        value={dayjs(formData.patientInfo.dateOfBirth).format("DD/MM/YYYY")}
      />
      <PreviewItem
        label="Gender"
        value={formData.patientInfo.gender}
      />
      <PreviewItem
        label="Patient Phone Number"
        value={formData.patientInfo.phoneNumber}
      />
      <PreviewItem
        label="Email"
        value={formData.patientInfo.email}
      />
      <PreviewItem
        label="Patient Marital Status"
        value={formData.patientInfo.maritalStatus}
      />
      <PreviewItem
        label="Patient Home Address"
        value={formData.patientInfo.address}
      />
    </div>

    {/* Emergency Contact */}
    {formData.emergencyInfo && (
      <>
        <h3 className="text-base font-semibold">Emergency Contact</h3>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <PreviewItem
            label="Full Name"
            value={formData.emergencyInfo.contactName}
          />
          <PreviewItem
            label="Relationship"
            value={formData.emergencyInfo.relationship}
          />
          <PreviewItem
            label="Phone Number"
            value={formData.emergencyInfo.phoneNumber}
          />
        </div>
      </>
    )}

    {/* Allergy */}
    {formData.allergyInfo && (
      <>
        <h3 className="text-base font-semibold">Allergy</h3>

        <div className="space-y-4">
          <PreviewItem
            label="Allergy Type"
            value={renderList(formData.allergyInfo.allergiesType)}
          />
          <PreviewItem
            label="Severity"
            value={formData.allergyInfo.severity}
          />
          <PreviewItem
            label="Condition"
            value={renderList(formData.allergyInfo.drugCondition)}
          />
          <PreviewItem
            label="Agent"
            value={formData.allergyInfo.agent}
          />
          <PreviewItem
            label="Reactions"
            value={
              <div className="rounded-lg border p-4 text-sm text-gray-700">
                {formData.allergyInfo.reactions}
              </div>
            }
          />
          <PreviewItem
            label="Patient Instructions"
            value={
              <div className="rounded-lg border p-4 text-sm text-gray-700">
                {formData.allergyInfo.patientInstructions}
              </div>
            }
          />
        </div>
      </>
    )}

    {/* Buttons */}
    <div className="space-y-3">
      <FormInputButton onHandleAction={handleFinalSubmit}>
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

export default PharmacyNewPatientForm;