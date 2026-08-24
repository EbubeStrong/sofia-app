"use client";

import React, { useEffect } from "react";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import FormConfig from "@/components/FormElements/FormConfig";
import { NewCheckinSchema } from "@/layouts/checkin/schema";
import FormInputButton from "@/components/FormElements/FormInputButton";
import { usePatientSingleRecord } from "@/services/patients";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import { useCreateCheckin } from "@/services/checkins";
import Loader from "@/components/Loader";
import { invalidateQuery } from "@/config/query-client";

type RegisterFormProps = {
  patientId: string;
};

type TCheckinFields = {
  patientName: string;
  activity: string;
  eventType: string;
  forwardTo: string;
  additionalInfo: string;
  priority: string;
};

const RegisterPatientForm: React.FC<RegisterFormProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const {
    data: patientRecord,
    isFetching: isFetchingPatientRecord,
    isSuccess: isPatientRecordSuccess,
  } = usePatientSingleRecord(patientId);

  const { mutate, isPending } = useCreateCheckin();

  useEffect(() => {
    if (isPatientRecordSuccess && patientRecord) {
      form.setFieldsValue({
        patientName: patientRecord?.fullName,
      });
    }
  }, [isPatientRecordSuccess, patientRecord, form]);

  const handleRegisterCheckin = (values: TCheckinFields) => {
    const payload = {
      emergencyPatientName: values.patientName,
      activity: values.activity,
      eventType: values.eventType,
      priority: values.priority,
      forwardTo: values.forwardTo,
      additionalInformation: values.additionalInfo,
      patientId: patientId,
    };
    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Patient check-in registered successfully");
          form.resetFields();
          router.push(`/check-in`);
          invalidateQuery(["checkins"]);
          return;
        },
      }
    );
  };

  if (isFetchingPatientRecord) {
    return <ComponentLoader label="Loading checkin form..." />;
  }

  return (
    <div className="flex flex-col gap-7">
      <BackButton>Back</BackButton>

      <section className="bg-[#F3F7F8] border border-solid border-dark/20 rounded-lg p-4 xl:p-6">
        <FormConfig
          form={form}
          schema={NewCheckinSchema()}
          onSubmit={handleRegisterCheckin}
          twClassStyle="grid grid-cols-1 md:grid-cols-2 gap-x-6"
          addTopBtn={
            <section className="mb-7 flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <h2 className="text-2xl text-[#101010] font-bold">
                  New Visit Details
                </h2>
                <p className="text-base text-[#101010]/70">
                  Search for existing patients or register new ones to begin
                  their visit
                </p>
              </div>
              <FormInputButton className="w-full max-w-[170px]">
                {isPending ? <Loader color="#fff" /> : "Check-in Patient"}
              </FormInputButton>
            </section>
          }
        />
      </section>
    </div>
  );
};

export default RegisterPatientForm;
