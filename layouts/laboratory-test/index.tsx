"use client";

import { useState } from "react";

//components
import LaboratoryTestSection from "@/layouts/laboratory-test/LabTestTableSection";
import FormConfig from "@/components/FormElements/FormConfig";
import { labTestSchema } from "@/components/FormElements/schemas";
import PatientHeader from "@/components/Patients/PatientHeader";
import SofiaDrawers from "@/components/Drawers";
import { Form } from "antd";

interface FieldType {
  orderBy: string;
}

interface LabTestProps {
  patientId: string;
}

const LaboratoryTestsLayout: React.FC<LabTestProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const [openLabTest, setOpenLabTest] = useState(false);

  const handleSubmitLabTest = (values: FieldType) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-5">
      <PatientHeader
        headerName="Lab Tests"
        buttonLabel="View Lab Test History"
        addActionLabel="New Lab Test"
        onHandleAction={() => setOpenLabTest(true)}
      />

      <LaboratoryTestSection patientId={patientId} />

      <SofiaDrawers
        title={<span className="text-xl">Record Patient Lab Test</span>}
        placement="right"
        open={openLabTest}
        onClose={() => setOpenLabTest(false)}
        width={600}
        maskClosable={true}
        zIndex={9999}
      >
        <FormConfig
          form={form}
          schema={labTestSchema}
          onSubmit={handleSubmitLabTest}
        />
      </SofiaDrawers>
    </div>
  );
};

export default LaboratoryTestsLayout;
