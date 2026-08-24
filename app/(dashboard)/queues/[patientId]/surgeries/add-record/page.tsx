"use client";

import React from "react";

//components
import FormInputButton from "@/components/FormElements/FormInputButton";
import { surgerySchema } from "@/components/FormElements/schemas";
import FormConfig from "@/components/FormElements/FormConfig";
import { Form } from "antd";
import BackButton from "@/components/BackButton";

type FieldType = {
  type?: string;
  agent?: string;
  condition?: string;
  severity?: string;
  reaction?: string;
  dateRecorded?: string;
};

const AddSurgerySection = () => {
  const [form] = Form.useForm();

  const handleSurgery = (values: FieldType) => {
    console.log(values);
  };

  return (
    <main className="mt-6 xl:mt-0 flex flex-col gap-4">
      <BackButton>Back</BackButton>

      <FormConfig
        form={form}
        addTopBtn={
          <header className="flex items-center justify-between mb-5">
            <h1 className="text-xl md:text-2xl text-[#212121] font-semibold font-libre_franklin">
              Examination for John Doe
            </h1>
            <Form.Item className="!mb-0" label={null}>
              <div className="">
                <FormInputButton cssProps={{ $height: "48px" }}>
                  Save Record & Continue
                </FormInputButton>
              </div>
            </Form.Item>
          </header>
        }
        schema={surgerySchema}
        onSubmit={handleSurgery}
        twClassStyle="w-full md:max-w-[75%]"
      />
    </main>
  );
};

export default AddSurgerySection;
