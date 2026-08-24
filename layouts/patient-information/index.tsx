"use client";

import { Form } from "antd";

//components
import FormConfig from "@/components/FormElements/FormConfig";
import { patientInformationSchema } from "@/components/FormElements/schemas";
import FormInputButton from "@/components/FormElements/FormInputButton";

type FieldType = {
  patientFirstName?: string;
  patientLastName?: string;
  patientDateOfBirth?: string;
  guardianFullName?: string;
  guardianPhoneNumber?: string;
  patientGender?: string;
  maritalStatus?: string;
  patientPhoneNumber?: string;
  identificationNumber?: string;
  patientEmailAddress?: string;
  patientHomeAddress?: string;
};

const PatientInformationLayout = () => {
  const [form] = Form.useForm();
  const handlePatientInformation = (values: FieldType) => {
    console.log(values);
  };

  return (
    <main className="mt-6 xl:mt-0 flex flex-col gap-5">
      <FormConfig
        form={form}
        schema={patientInformationSchema}
        onSubmit={handlePatientInformation}
        addTopBtn={
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl md:text-2xl text-[#212121] font-semibold font-libre_franklin">
              Daniel&apos;s Information
            </h1>
            <Form.Item className="!mb-0" label={null}>
              <div className="">
                <FormInputButton cssProps={{ $height: "48px" }}>
                  Save Changes
                </FormInputButton>
              </div>
            </Form.Item>
          </div>
        }
      />
    </main>
  );
};

export default PatientInformationLayout;
