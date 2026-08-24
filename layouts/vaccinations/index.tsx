"use client";

import { useState } from "react";

//components
import VaccinationTableSection from "@/layouts/vaccinations/VaccinationTableSection";
import FormConfig from "@/components/FormElements/FormConfig";
import { vaccinesSchema } from "@/components/FormElements/schemas";
import PatientHeader from "@/components/Patients/PatientHeader";
import SofiaDrawers from "@/components/Drawers";
import { Form } from "antd";

interface VaccinesProps {
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

const VaccinationsLayout: React.FC<VaccinesProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const [openVaccineModal, setOpenVaccineModal] = useState<boolean>(false);

  const handleVaccines = (values: FieldType) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-5">
      <PatientHeader
        headerName="Vaccinations"
        buttonLabel="View Vaccination History"
        addActionLabel="Add New Vaccination"
        onHandleAction={() => setOpenVaccineModal(true)}
      />

      <VaccinationTableSection patientId={patientId} />

      <SofiaDrawers
        title={<span className="text-xl">Record Patient Vaccination</span>}
        placement="right"
        open={openVaccineModal}
        onClose={() => setOpenVaccineModal(false)}
        width={600}
        maskClosable={true}
        zIndex={9999}
      >
        <FormConfig
          form={form}
          schema={vaccinesSchema}
          onSubmit={handleVaccines}
        />
      </SofiaDrawers>
    </div>
  );
};

export default VaccinationsLayout;
