"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form } from "antd";import dayjs from "dayjs";
import { toast } from "sonner";


import {
  VaccinationSchema,
} from "@/layouts/checkin/schema";
import {
  useCreateEmergencyInfo,
} from "@/services/checkins";
import storage from "@/config/storage";
import { invalidateQuery } from "@/config/query-client";
import FormConfig from "@/components/FormElements/FormConfig";
import FormInputButton from "@/components/FormElements/FormInputButton";
import Loader from "@/components/Loader";
import { TAllergyType, TDrugCondition, TSeverity } from "@/data/checkin-data";

type VaccinationFormProps = {
  patientId?: string;
  onClose: () => void;
};


type TAllergyFields = {
  allergiesType: TAllergyType[];     
  severity: TSeverity;               
  drugCondition: TDrugCondition[];   
  agent: string;
  reactions: string;
  patientInstructions: string;
};

type TVaccinationFields = {
  vaccine: TAllergyType[];  
  diagnosis: string;   
  doses: TDrugCondition[];               
  unit: TDrugCondition[];   
  administeredDate: string;
  scheduledDate: string;
  patientInstructions: string;
};



type TFormData = {
  allergyInfo?: TAllergyFields;
};


const PatientVaccinationForm: React.FC<VaccinationFormProps> = ({
  patientId,
  onClose
}) => {
  const [form] = Form.useForm();
//   const [,patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState<TFormData>({
      allergyInfo: undefined,
    });
  
const { mutate: createVaccination, isPending: isCreatingVaccination } =
    useCreateEmergencyInfo(patientId as string);


  useEffect(() => {
    const data = storage.getCheckin();
    if (data) {
    //   setPatientId(data?.patientId);
      setFullName(data?.fullName as string);
    }
  }, []);


  const handleVaccinationInfo = (values: TAllergyFields) => {
    setFormData((prev) => ({
      ...prev,
      allergyInfo: values,
    }));
    onClose
    // const payload = {
    //   contactName: values.contactName,
    //   relationship: values.relationship,
    //   contactPhone: values.phoneNumber,
    //   patientId: patientId,
    // };
    // createAllergy(
    //   { body: payload },
    //   {
    //     onSuccess: () => {
    //       toast.success("New Allergy created successfully");
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

  



  return (
    <div>
        <FormConfig
          form={form}
          schema={VaccinationSchema()}
          onSubmit={handleVaccinationInfo}
           twClassStyle="grid grid-cols-2 gap-4"
          afterBtn={
            <div className="flex flex-col w-full max-w-full gap-2 mt-10">
                <div className="w-full max-w-full">
                <FormInputButton>
                  {isCreatingVaccination ? <Loader color="white" /> : "Save"}
                </FormInputButton>
              </div>
            </div>
          }
        />
    </div>
  );
};

export default PatientVaccinationForm;