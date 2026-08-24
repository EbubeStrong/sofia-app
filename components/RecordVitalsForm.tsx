import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import FormConfig from "./FormElements/FormConfig";
import { vitalSignsSchema } from "./FormElements/schemas";
import { TNurseQueueData } from "@/interfaces/nurses";
import { useFetchDoctors } from "@/services/hospital";
import { toTitleCase } from "@/utils/getInitials";
import { toast } from "sonner";
import { useCreateVitals } from "@/services/nurses";
import { calculateBMI } from "@/utils/calculate-bmi";
import { invalidateQuery } from "@/config/query-client";

interface VitalsFormProps {
  nurseData: TNurseQueueData;
  setOpenVitalsForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FieldType {
  temperature: string;
  temperatureSuffix: string;
  temp_source: string;
  bloodPressure: string;
  bloodPressure_source: string;
  pulse: string;
  weight: string;
  weightSuffix: string;
  height: string;
  heightSuffix: string;
  bmi: string;
  headCircumference?: string;
  waistSize?: string;
  nursesNote: string;
  reasonForVisit: string;
  forwardTo: string;
  priorityLevel: string;
}

const TakeVitalsRecordForm: React.FC<VitalsFormProps> = ({
  nurseData,
  setOpenVitalsForm,
}) => {
  const [form] = Form.useForm();
  const weightValue = Form.useWatch("weight", form);
  const heightValue = Form.useWatch("height", form);

  const [searchValue, setSearchValue] = useState("");

  const { data: doctors, isFetching: isFetchingDoctors } =
    useFetchDoctors(searchValue);

  const { mutateAsync, isPending } = useCreateVitals(
    nurseData?.patient?.patientId
  );

  const fetchDoctors = useMemo(
    () =>
      doctors?.data?.map((doctor) => ({
        label: toTitleCase(`${doctor?.firstName} ${doctor?.lastName}`),
        value: doctor?.id.toString(),
      })),
    [doctors?.data]
  );

  useEffect(() => {
    const weight = Number(weightValue);
    const height = Number(heightValue);

    if (weight > 0 && height > 0) {
      const bmiResult = calculateBMI(weight, height);
      form.setFieldsValue({
        bmi: bmiResult?.bmi ?? null,
      });
    } else {
      form.setFieldsValue({
        bmi: null,
      });
    }
  }, [weightValue, heightValue, form]);

  useEffect(() => {
    const consultation = nurseData?.patientConsultation;
    if (consultation) {
      form.setFieldsValue({
        priorityLevel: consultation?.priority,
        reasonForVisit: consultation?.reasonForVisit,
      });
    }
  }, [nurseData?.patientConsultation, form]);

  const handleVitalSigns = (values: FieldType) => {
    const payload = {
      patientConsultationId: nurseData?.patientConsultation?.idEncrypt,
      doctorId: values.forwardTo,
      bloodPressure: values.bloodPressure ? values.bloodPressure + "mm/Hg" : "",
      bodyTemperature: values.temperature
        ? `${values.temperature}${values.temperatureSuffix}`
        : "",
      height: values.height ? `${values.height}${values.heightSuffix}` : "",
      weight: values.weight ? `${values.weight}${values.weightSuffix}` : "",
      bmi: values.bmi,
      headCircumference: values.headCircumference
        ? values.headCircumference + "cm"
        : "",
      waistSize: values.waistSize ? values.waistSize + "cm" : "",
      pulse: values.pulse ? values.pulse + "bpm" : "",
      nurseNotes: values.nursesNote,
      reasonForVisit: values.reasonForVisit,
      priority: values.priorityLevel,
      bloodPressureSource: values.bloodPressure_source,
      bodyTemperatureSource: values.temp_source,
    };

    mutateAsync(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Vitals submitted successfully");
          form.resetFields();
          setOpenVitalsForm(false);
          invalidateQuery(["nurses_queue"]);
        },
      }
    );
  };

  return (
    <FormConfig
      form={form}
      schema={vitalSignsSchema({
        doctorOptions: fetchDoctors ?? [],
        doctorLoading: isFetchingDoctors,
        onDoctorSearch: (value: string) => setSearchValue(value),
        onDoctorClear: () => setSearchValue(""),
        onDoctorSelect: () => {
          setSearchValue("");
        },
      })}
      initialValues={{
        heightSuffix: "cm",
        weightSuffix: "kg",
        temperatureSuffix: "°C",
      }}
      onSubmit={handleVitalSigns}
      btnLoading={isPending}
      btnText="Save and Forward to Doctor"
      twClassStyle="grid grid-cols-1 md:grid-cols-2 md:gap-x-4"
    />
  );
};

export default TakeVitalsRecordForm;
