"use client";

import { useRouter } from "next/navigation";

//components
import FormConfig from "@/components/FormElements/FormConfig";
import { allergySchema } from "@/components/FormElements/schemas";
import PatientHeader from "@/components/Patients/PatientHeader";
import { Form } from "antd";

interface IAllergiesProps {
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

const AllergiesLayout: React.FC<IAllergiesProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleAllergies = (values: FieldType) => {
    console.log(values, patientId);
    router.push(`/queues/${patientId}/treatments`);
  };

  return (
    <div className="mt-6 xl:mt-0 flex flex-col gap-5">
      <PatientHeader
        headerName="Allergies"
        buttonLabel="View Allergies History"
      />

      <FormConfig
        form={form}
        schema={allergySchema}
        onSubmit={handleAllergies}
        twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
      />
    </div>
  );
};

export default AllergiesLayout;
