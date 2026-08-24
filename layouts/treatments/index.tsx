"use client";

import { useState } from "react";

//components
import TreatmentsTableSection from "@/layouts/treatments/TreatmentsTableSection";
import FormConfig from "@/components/FormElements/FormConfig";
import { treatmentsSchema } from "@/components/FormElements/schemas";
import PatientHeader from "@/components/Patients/PatientHeader";
import SofiaDrawers from "@/components/Drawers";
import { Form } from "antd";

interface TreatmentProps {
  patientId: string;
}

type FieldType = {
  type?: string;
  agent?: string;
  condition?: string;
  severity?: string;
  reaction?: string;
  dateRecorded?: string;
};

const TreatmentsLayout: React.FC<TreatmentProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const [openNewTreatment, setOpenNewTreatment] = useState(false);

  const handleSubmitTreatments = (values: FieldType) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col gap-5">
      <PatientHeader
        headerName="Treatment"
        buttonLabel="View Treatment History"
        addActionLabel="Add New Treatment"
        onHandleAction={() => setOpenNewTreatment(true)}
      />

      <TreatmentsTableSection patientId={patientId} />

      <SofiaDrawers
        title={<span className="text-xl">Record Patient Treatment</span>}
        placement="right"
        open={openNewTreatment}
        onClose={() => setOpenNewTreatment(false)}
        width={600}
        maskClosable={true}
        zIndex={9999}
      >
        <FormConfig
          form={form}
          schema={treatmentsSchema}
          onSubmit={handleSubmitTreatments}
        />
      </SofiaDrawers>
    </main>
  );
};

export default TreatmentsLayout;
