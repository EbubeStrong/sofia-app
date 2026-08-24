"use client";

import React, { useEffect, useState } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import {
  useCreateInsuranceInfo,
} from "@/services/checkins";
import FormConfig from "../../FormElements/FormConfig";
import FormInputButton from "../../FormElements/FormInputButton";
import Loader from "../../Loader";
import { PrescriberInfoSchema, PrescriptionInfoSchema } from "@/layouts/pharmacy/schema";
import { useCreatePharmacyNewPrescripton, useFetchPrescriptionDataByIds, useUpdatePharmacyPrescription } from "@/services/pharmacy";
// import { PharmacyFormProgressStepper } from "../PharmacyProgressStepper";
import ProgressVariant from "../../Progress";
import { useSearchParams } from "next/navigation";
import ComponentLoader from "@/components/Loader/ComponentLoader";

type NewPrescriptionFormProps = {
  patientId?: string;
  patientConsultationId?: number;
  mode?: "new" | "rejected";
};


type TPrescriptionInfoFields = {
  patientName: string;
  dateOfBirth: string;
  patientDrug: string;
  form: string;
  quantity: string;
  refillNumber: string;
  allowSubstitute: string;
  attachment: string;
  directionsForUse: string;
};

type TPrescriberInfoFields = {
  prescriberName: string;
  prescriberLicenseNumber: string;
  prescriberPhoneNumber: string;
  dateOfPrescription: string;
};

type TFormData = {
  prescriptionInfo?: TPrescriptionInfoFields;
  prescriberInfo?: TPrescriberInfoFields;
};

const renderFormHeader = (
  step: number,
) => {
  const TOTAL_STEPS = 3;
  return (
    <div>
      <ProgressVariant
        currentStep={step}
        totalSteps={TOTAL_STEPS}
       />
    </div>
  );
};

const NewPrescriptionForm: React.FC<NewPrescriptionFormProps> = ({patientId, patientConsultationId}) => {
  const searchParams = useSearchParams();
  // const patientId = searchParams.get("patientId") ?? undefined;
  const statusFromUrl = searchParams.get("q") 
  const [form] = Form.useForm();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<TFormData>({
    prescriptionInfo: undefined,
    prescriberInfo: undefined,
  });
  const status =
  statusFromUrl === "prescription" ||
  statusFromUrl === "approved" ||
  statusFromUrl === "reject" ||
  statusFromUrl === "completed" ||
  statusFromUrl === "archived"
    ? statusFromUrl
    : undefined;

  useEffect(() => {
    if (patientId) {
      // todo patient data or set form value
      form.setFieldsValue({ patientId, patientConsultationId });
    }
  }, [patientId, form, patientConsultationId]);


  const {
    mutate: createNewPrescription,
    isPending: isCreatingNewPrescription,
  } = useCreatePharmacyNewPrescripton();

  const { isPending: isCreatingInsurance } =
    useCreateInsuranceInfo(patientId as string);


const { data: rejectedPrescription, isFetching: isFetchingRejected  } = useFetchPrescriptionDataByIds(
  status ?? "",
  patientConsultationId,
  patientId,
);

const {
    mutate: updatePrescription,
    isPending: isUpdatingPrescription,
  } = useUpdatePharmacyPrescription(status ?? "", patientConsultationId, patientId, rejectedPrescription?.medication.id ?? 0);


  useEffect(() => {
  if (!rejectedPrescription) return;

  const prescriptionInfo: TPrescriptionInfoFields = {
    patientName: rejectedPrescription.patient.firstName + " " + rejectedPrescription.patient.lastName,
    dateOfBirth: dayjs(rejectedPrescription.patient.dob).toISOString(),
    patientDrug: rejectedPrescription.medication.drug,
    form: rejectedPrescription.medication.form,
    quantity: String(rejectedPrescription.medication.totalQuantity),
    refillNumber: String(rejectedPrescription.medication.refillNumber),
    allowSubstitute: rejectedPrescription.medication.allowSubstitute === "Yes" ? "Yes" : "No",
    attachment: rejectedPrescription.medication.uploadedFileUrl ?? "",
    directionsForUse: rejectedPrescription.medication.directions,
  };

  const prescriberInfo: TPrescriberInfoFields = {
    prescriberName: rejectedPrescription.doctor.firstName + " " + rejectedPrescription.doctor.lastName,
    prescriberLicenseNumber: rejectedPrescription.doctor.registrationNumber,
    prescriberPhoneNumber: rejectedPrescription.doctor.phoneNumber,
    dateOfPrescription: rejectedPrescription.medication.startDate,
  };

  form.setFieldsValue({
    ...prescriptionInfo,
    ...prescriberInfo,
  });

  setFormData({
    prescriptionInfo,
    prescriberInfo,
  });

  // optional – jump straight to edit flow
  setStep(1);
}, [rejectedPrescription, form]);



  

  const handlePrescriptionInfo = (values: TPrescriptionInfoFields) => {
    setFormData((prev) => ({
      ...prev,
      prescriptionInfo: values,
    }));

    const payload = {
      patientName: values.patientName,
      dateOfBirth: dayjs(values?.dateOfBirth).format("D-MM-YYYY"),
      patientDrug: values.patientDrug,
      form: values.form,
      quantity: Number(values.quantity),
      refillNumber: Number(values.refillNumber),
      allowSubstitution: values.allowSubstitute === "Yes",
      attachment: values.attachment,
      directionsForUse: values.directionsForUse,
    };

    console.log("payload", payload);
    setStep(2);
  };

  const handlePrescriberInfo = (values: TPrescriberInfoFields) => {
    setFormData((prev) => ({
      ...prev,
      prescriberInfo: values,
    }));
    setStep(3);
  };

  
const handleUpdateFormSubmit = () => {
  if (!formData.prescriptionInfo || !formData.prescriberInfo) {
    toast.error("Please complete all steps before submitting");
    return;
  }

  const payload = {
    patientName: formData.prescriptionInfo.patientName,
    dateOfBirth: dayjs(
      formData.prescriptionInfo.dateOfBirth
    ).format("D-MM-YYYY"),
    patientDrug: formData.prescriptionInfo.patientDrug,
    form: formData.prescriptionInfo.form,
    quantity: Number(formData.prescriptionInfo.quantity),
    refillNumber: Number(formData.prescriptionInfo.refillNumber),
    allowSubstitute:
      formData.prescriptionInfo.allowSubstitute === "Yes",
    attachment: formData.prescriptionInfo.attachment,
    directionsForUse:
      formData.prescriptionInfo.directionsForUse,

    prescriberName: formData.prescriberInfo.prescriberName,
    prescriberLicenseNumber:
      formData.prescriberInfo.prescriberLicenseNumber,
    prescriberPhoneNumber:
      formData.prescriberInfo.prescriberPhoneNumber,
    dateOfPrescription:
      formData.prescriberInfo.dateOfPrescription,
  };

  updatePrescription(
    { body: payload },
    {
      onSuccess: () => {
        toast.success("Prescription updated successfully");
      },
      onError: () => {
        toast.error("Failed to update prescription");
      },
    }
  );
};


  const handleFinalSubmit = () => {
    if (!formData.prescriptionInfo || !formData.prescriberInfo) {
      toast.error("Please complete all steps before submitting");
      return;
    }

     if (rejectedPrescription) {
    handleUpdateFormSubmit();
    return;
  }

    const payload: {
      patientName: string;
      dateOfBirth: string;
      patientDrug: string;
      form: string;
      quantity: number;
      refillNumber: number;
      allowSubstitute: boolean;
      attachment?: string;
      directionsForUse: string;
      prescriberName: string;
      prescriberLicenseNumber: string;
      prescriberPhoneNumber: string;
      dateOfPrescription: string;
    } = {
      patientName: formData.prescriptionInfo.patientName,
      dateOfBirth: dayjs(formData.prescriptionInfo.dateOfBirth).format(
        "D-MM-YYYY"
      ),
      patientDrug: formData.prescriptionInfo.patientDrug,
      form: formData.prescriptionInfo.form,
      quantity: Number(formData.prescriptionInfo.quantity),
      refillNumber: Number(formData.prescriptionInfo.refillNumber),
      allowSubstitute: formData.prescriptionInfo.allowSubstitute === "Yes" ? true : false,
      attachment: formData.prescriptionInfo.attachment,
      directionsForUse: formData.prescriptionInfo.directionsForUse,
      prescriberName: formData.prescriberInfo.prescriberName,
      prescriberLicenseNumber: formData.prescriberInfo.prescriberLicenseNumber,
      prescriberPhoneNumber: formData.prescriberInfo.prescriberPhoneNumber,
      dateOfPrescription: formData.prescriberInfo.dateOfPrescription,
    };

    createNewPrescription(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Prescription submitted successfully");
          form.resetFields();
          setStep(1);
          setFormData({
            prescriptionInfo: undefined,
            prescriberInfo: undefined,
          });
        },
        onError: (error) => {
          toast.error("Failed to submit prescription");
          console.error("Submission error:", error);
        },
      }
    );
  };

  if (isFetchingRejected) {
    return <ComponentLoader label="Loading prescription info..." />;
  }


  return (
    <div>
      <section className="mb-6">
        <p className="text-base font-semibold flex-1">
          Step {step}: {step === 1 && "Prescription"}{" "}
          {step === 2 && "Prescriber"}{" "}
          {step === 3 && "Review"}
        </p>
        {renderFormHeader(step)}
        </section>

      {step === 1 && (
        <FormConfig
          form={form}
          schema={PrescriptionInfoSchema()}
          onSubmit={handlePrescriptionInfo}
          btnLoading={isCreatingNewPrescription}
        />
      )}

      {step === 2 && (
        <FormConfig
          form={form}
          schema={PrescriberInfoSchema()}
          onSubmit={handlePrescriberInfo}
          afterBtn={
            <div className="flex flex-col w-full max-w-full gap-2 mt-10">
              <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingInsurance ? <Loader color="white" /> : "Next"}
                </FormInputButton>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                }}
                className="text-base border border-solid border-[#1175C0] text-[#1175C0] font-semibold bg-white rounded-lg w-full max-w-[100%] h-[56px]"
              >
                Back
              </button>
            </div>
          }
        />
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-[#101828]">
              Review Prescription
            </h4>
            <p className="text-sm text-[#667085]">
              Please review the information below before confirming the
              prescription
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#667085]">Patient Name</p>
              <p className="font-medium text-[#101828]">
                {formData.prescriptionInfo?.patientName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#667085]">Patient Date of Birth</p>
                <p className="font-medium text-[#101828]">
                  {dayjs(formData.prescriptionInfo?.dateOfBirth).format(
                    "DD MMM YYYY"
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#667085]">Patient Phone Number</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriberInfo?.prescriberPhoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-5 space-y-4">
            <h3 className="font-semibold text-[#101828]">
              Prescription Details
            </h3>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#667085]">Patient Drug</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriptionInfo?.patientDrug}
                </p>
              </div>

              <div>
                <p className="text-[#667085]">Form</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriptionInfo?.form}
                </p>
              </div>

              <div>
                <p className="text-[#667085]">Total Quantity</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriptionInfo?.quantity}
                </p>
              </div>

              <div>
                <p className="text-[#667085]">Refill Number</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriptionInfo?.refillNumber}
                </p>
              </div>

              <div>
                <p className="text-[#667085]">Allow Substitute</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriptionInfo?.allowSubstitute === "Yes"
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-[#667085] mb-1">Directions</p>
            <div className="border rounded-lg p-4 text-sm text-[#101828]">
              {formData.prescriptionInfo?.directionsForUse}
            </div>
          </div>

          <div>
            <p className="text-sm text-[#667085] mb-1">Pharmacy Comments</p>
            <textarea
              placeholder="Write Comments here"
              className="w-full h-[120px] border rounded-lg p-3 text-sm outline-none focus:ring-1 focus:ring-[#1175C0]"
            />
          </div>

          <div className="bg-gray-100 rounded-lg p-5 space-y-4">
            <div>
              <p className="text-sm text-[#667085]">Prescribers Name</p>
              <p className="font-medium text-[#101828]">
                {formData.prescriberInfo?.prescriberName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[#667085]">Prescribers Phone Number</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriberInfo?.prescriberPhoneNumber}
                </p>
              </div>

              <div>
                <p className="text-[#667085]">Prescribers License</p>
                <p className="font-medium text-[#101828]">
                  {formData.prescriberInfo?.prescriberLicenseNumber}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#667085]">Date Prescribed</p>
              <p className="font-medium text-[#101828]">
                {dayjs(formData.prescriberInfo?.dateOfPrescription).format(
                  "DD MMM YYYY"
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* <FormInputButton onHandleAction={handleFinalSubmit}>
              {isCreatingNewPrescription ? (
                <Loader color="white" />
              ) : (
                "Confirm for Submission"
              )}
            </FormInputButton> */}
            <FormInputButton onHandleAction={handleFinalSubmit}>
  {rejectedPrescription
    ? isUpdatingPrescription
      ? <Loader color="white" />
      : "Update Prescription"
    : isCreatingNewPrescription
      ? <Loader color="white" />
      : "Confirm for Submission"}
</FormInputButton>
            <button
              type="button"
              onClick={() => setStep(2)}
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

export default NewPrescriptionForm;