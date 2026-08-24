"use client";

import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { IoInformationCircle } from "react-icons/io5";
import { Form, Select, Typography, Upload } from "antd";

//components
import {
  FormInputDropdownContainer,
  FormInputUploadContainer,
} from "@/components/FormElements/styles";
import FormInput from "@/components/FormElements/FormInput";
import { filterOption } from "@/components/FormElements/utils";
import FormInputNumber from "@/components/FormElements/FormInputNumber";

import { FileUploadIcon } from "@/assets/icons";
import {
  breathingPatternOptions,
  heightOptions,
  positionOptions,
  pulseOptions,
  sourceOptions,
} from "@/data/general-data";
import { useRouter } from "next/navigation";

interface IRecordVitalsFormProps {
  patientId: string;
}

const RecordVitalsForm: React.FC<IRecordVitalsFormProps> = ({ patientId }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  return (
    <main className="flex flex-col gap-5">
      <Form
        form={form}
        layout="vertical"
        name="patient_vitals_record"
        className="w-full max-w-full flex flex-col gap-7"
        autoComplete="off"
        initialValues={{
          patientsTemperature: [{}],
          patientsPressure: [{}],
          patientsPulse: [{}],
        }}
      >
        <Form.List name="patientsTemperature">
          {(fields, { add, remove }) => (
            <div className="flex flex-col gap-4 p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 flex-wrap md:flex-nowrap w-full">
                    <Form.Item
                      label={`Temperature ${field.name + 1} (°F)`}
                      name={[field.name, "temperature"]}
                      className="w-full !mb-0"
                    >
                      <FormInputNumber placeholder="Enter temperature" />
                    </Form.Item>
                    <FormInputDropdownContainer className="w-full max-w-full">
                      <Form.Item
                        className="w-full max-w-full !mb-0"
                        label="Source"
                        name={[field.name, "source"]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          filterOption={filterOption}
                          placeholder="Select temperature source"
                          options={sourceOptions?.map((item) => {
                            return {
                              label: item.label,
                              value: item.value,
                            };
                          })}
                        />
                      </Form.Item>
                    </FormInputDropdownContainer>
                    <button className="mt-6">
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={() => add()}
                  type="button"
                  className="flex items-center gap-1"
                >
                  Add New{" "}
                  <IoInformationCircle className="text-xl text-[#ccc]" />
                </button>
              </div>
            </div>
          )}
        </Form.List>

        <Form.List name="patientsPressure">
          {(fields, { add, remove }) => (
            <div className="flex flex-col gap-4 p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
              <p className="text-base text-sofia_dark font-semibold">{`Blood Pressure`}</p>
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap">
                    <Form.Item
                      label={`Blood Pressure ${field.name + 1} (°F)`}
                      name={[field.name, "bloodPressure"]}
                      className="w-full !mb-0"
                    >
                      <FormInputNumber placeholder="Enter blood pressure reading" />
                    </Form.Item>
                    <FormInputDropdownContainer className="w-full max-w-full">
                      <Form.Item
                        className="w-full max-w-full !mb-0"
                        label="Position"
                        name={[field.name, "position"]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          filterOption={filterOption}
                          placeholder="Select body position"
                          options={positionOptions?.map((item) => {
                            return {
                              label: item.label,
                              value: item.value,
                            };
                          })}
                        />
                      </Form.Item>
                    </FormInputDropdownContainer>
                    <button className="mt-6">
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={() => add()}
                  type="button"
                  className="flex items-center gap-1"
                >
                  Add New{" "}
                  <IoInformationCircle className="text-xl text-[#ccc]" />
                </button>
              </div>
            </div>
          )}
        </Form.List>

        <Form.List name="patientsPulse">
          {(fields, { add, remove }) => (
            <div className="flex flex-col gap-4 p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
              <p className="text-base text-sofia_dark font-semibold">{`Pulse (BPM)`}</p>
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap">
                    <Form.Item
                      label={`Pulse ${field.name + 1} (°F)`}
                      name={[field.name, "pulse"]}
                      className="w-full !mb-0"
                    >
                      <FormInputNumber placeholder="Enter pulse reading" />
                    </Form.Item>
                    <FormInputDropdownContainer className="w-full max-w-full">
                      <Form.Item
                        className="w-full max-w-full !mb-0"
                        label="Description"
                        name={[field.name, "description"]}
                      >
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          filterOption={filterOption}
                          placeholder="Select description"
                          options={pulseOptions?.map((item) => {
                            return {
                              label: item.label,
                              value: item.value,
                            };
                          })}
                        />
                      </Form.Item>
                    </FormInputDropdownContainer>
                    <button className="mt-6">
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={() => add()}
                  type="button"
                  className="flex items-center gap-1"
                >
                  Add New{" "}
                  <IoInformationCircle className="text-xl text-[#ccc]" />
                </button>
              </div>
            </div>
          )}
        </Form.List>

        <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
          <Form.Item
            label="Respiratory (BPM)"
            name="respiratory"
            className="w-full !mb-0"
          >
            <FormInput placeholder="Enter respiratory reading" />
          </Form.Item>
          <FormInputDropdownContainer className="w-full max-w-full">
            <Form.Item
              className="w-full max-w-full !mb-0"
              label="Breathing Pattern"
              name="breathingPattern"
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Select breathing pattern"
                options={breathingPatternOptions?.map((item) => {
                  return {
                    label: item.label,
                    value: item.value,
                  };
                })}
              />
            </Form.Item>
          </FormInputDropdownContainer>
        </div>

        <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
          <Form.Item
            label="Height (FT)"
            name="heightFt"
            className="w-full !mb-0"
          >
            <FormInput placeholder="Enter height in ft" />
          </Form.Item>
          <FormInputDropdownContainer className="w-full max-w-full !mb-0">
            <Form.Item
              className="w-full max-w-full !mb-0"
              label="Height (IN)"
              name="heightIn"
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Select height in inches"
                options={heightOptions?.map((item) => {
                  return {
                    label: item.label,
                    value: item.value,
                  };
                })}
              />
            </Form.Item>
          </FormInputDropdownContainer>
        </div>

        <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
          <Form.Item label="Weight (LB)" name="weight" className="w-full !mb-0">
            <FormInputNumber placeholder="Enter weight in lb" />
          </Form.Item>
          <FormInputDropdownContainer className="w-full max-w-full">
            <Form.Item
              className="w-full max-w-full !mb-0"
              label="BMI"
              name="bmi"
            >
              <FormInputNumber placeholder="Enter BMI values" />
            </Form.Item>
          </FormInputDropdownContainer>
        </div>

        <div className="flex items-center gap-3 w-full flex-wrap md:flex-nowrap p-4 border border-solid border-[#101010]/10 bg-white rounded-lg">
          <Form.Item
            label="Head Circumference (IN)"
            name="headCircumference"
            className="w-full !mb-0"
          >
            <FormInputNumber placeholder="Enter head circumference" />
          </Form.Item>
          <FormInputDropdownContainer className="w-full max-w-full !mb-0">
            <Form.Item
              className="w-full max-w-full !mb-0"
              label="Waist Size (IN)"
              name="waistSize"
            >
              <FormInputNumber placeholder="Enter waist size" />
            </Form.Item>
          </FormInputDropdownContainer>
        </div>

        <FormInputUploadContainer $backgroundColor={"#fff"}>
          <Form.Item name={"uploadFile"} className="!mb-0">
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon flex justify-center !mb-2">
                <FileUploadIcon />
              </p>
              <p className="ant-upload-text !font-libre_franklin font-medium">
                <span className="font-semibold text-[#1175C0]">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="ant-upload-hint !font-libre_franklin">
                Supports PNG, JPG and PDF files. Max size 1MB.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </FormInputUploadContainer>

        <div className="hidden">
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </div>

        <div className="flex items-center justify-end mt-6">
          <button
            onClick={() => router.push(`/queues/${patientId}/diagnosis`)}
            className="w-full max-w-[30%] h-[50px] text-white font-semibold text-base bg-[#1175C0] rounded-lg"
          >
            Save Record & Continue
          </button>
        </div>
      </Form>
    </main>
  );
};

export default RecordVitalsForm;
