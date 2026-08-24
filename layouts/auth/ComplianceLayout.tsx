"use client";

import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Form, Input, Radio, Select } from "antd";

import ProgressVariant from "@/components/Progress";
import { useAuthRegStep } from "@/stores/configFormStore";
import { customizeRequiredMark } from "@/components/CustomizedRequiredMark";
import {
  FormInputContainer,
  FormInputDropdownContainer,
} from "@/components/FormElements/styles";
import { filterOption } from "@/components/FormElements/utils";
// import Loader from "@/components/Loader";
import FormInputButton from "@/components/FormElements/FormInputButton";

interface IFields {
  email: string;
}

const availableSpecialistOptions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

const departmentOptions = [
  {
    label: "Engineering",
    value: "Engineering",
  },
  {
    label: "Finance",
    value: "Finance",
  },
  {
    label: "Design",
    value: "Design",
  },
];

const ComplianceLayout = () => {
  const [form] = Form.useForm();
  const { currentStep } = useAuthRegStep();
  const [departmentList, setDepartmentList] = React.useState<string[]>([]);

  const handleDepartmentChange = (values: string[]) => {
    setDepartmentList(values);
    form.setFieldsValue({ hospitalDepartment_reg: values });
  };

  const handleSubmit = (values: IFields) => {
    console.log("values", values);
  };

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white h-full px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <div className="mb-10">
        <h1 className="text-xl lg:text-2xl text-[#101010] font-semibold leading-tight">
          Add Staffing and Compliance
        </h1>
        <p className="text-sm md:text-base text-[#212121]/80 font-medium mb-2">
          Please provide us with some details about your business.
        </p>

        <div>
          {/* <ProgressVariant
            percent={100}
            strokeColor="#1175C0"
            showInfo={false}
          /> */}
          <ProgressVariant
            currentStep={1}
            totalSteps={1}
            strokeColor="#1175C0"
            showInfo={false}
            />
          <p className="text-sm text-[#101010]">Step {currentStep} of 4</p>
        </div>
      </div>

      <Form
        form={form}
        name="compliance-form"
        layout="vertical"
        requiredMark={customizeRequiredMark}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="specialistAvailable_reg"
          label="Are your specialist available 24/7"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            {availableSpecialistOptions?.map(({ label, value }) => (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <div>
          <div className="mb-4">
            <h5 className="text-base text-[#101010] font-semibold">
              Select Departments
            </h5>
            <p className="text-xs text-[#101010]/70 font-normal">
              Choose all department that are part of your organization
            </p>
          </div>

          <FormInputDropdownContainer>
            <Form.Item
              className="w-full max-w-full"
              name="hospitalDepartment_reg"
              label="Department"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                optionFilterProp="children"
                onChange={handleDepartmentChange}
                value={departmentList}
                filterOption={filterOption}
                placeholder={"Select department"}
                options={
                  departmentOptions?.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </FormInputDropdownContainer>
        </div>

        {departmentList.length > 0 && (
          <div>
            <div className="mb-4">
              <h5 className="text-base text-[#101010] font-semibold">
                Staff Counts
              </h5>
              <p className="text-xs text-[#101010]/70 font-normal">
                Specify the number of staff members in each department
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {departmentList.map((dept, idx) => (
                <div
                  className="relative bg-[#F9F9F9] rounded-md p-2 pb-3"
                  key={`${dept}-${idx}`}
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className=""
                      onClick={() => {
                        const updatedList = departmentList.filter(
                          (d) => d !== dept
                        );
                        setDepartmentList(updatedList);
                        form.setFieldsValue({
                          hospitalDepartment_reg: updatedList,
                        });
                      }}
                    >
                      <IoCloseOutline style={{ fontSize: 18 }} />
                    </button>
                  </div>

                  <FormInputContainer $height="48px" className="">
                    <Form.Item
                      name={dept}
                      label={dept}
                      rules={[{ required: true }]}
                      className="!mb-0"
                    >
                      <Input
                        placeholder="Enter total number"
                        onInput={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value;
                          event.target.value = value.replace(/[^0-9]/g, "");
                        }}
                        onPaste={(
                          event: React.ClipboardEvent<HTMLInputElement>
                        ) => {
                          const paste = event.clipboardData.getData("text");
                          if (paste) {
                            const pasteToNumber = paste.replace(/[^0-9]/g, "");
                            event.clipboardData.setData("text", pasteToNumber);
                          }
                        }}
                      />
                    </Form.Item>
                  </FormInputContainer>
                </div>
              ))}
            </div>

            {/* <FormInputDropdownContainer>
            <Form.Item
              className="w-full max-w-full"
              name="hospitalDepartment_reg"
              label="Department"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder={"Select department"}
                options={
                  departmentOptions?.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  }) ?? []
                }
              />
            </Form.Item>
          </FormInputDropdownContainer> */}
          </div>
        )}

        {departmentList.length > 0 && (
          <div className="border border-[#1010101A] bg-[#F9F9F9] rounded-lg p-2 mt-6">
            <p className="text-base text-[#101010] font-semibold mb-2">
              Summary
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#101010]">Departments Selected</p>
                <p className="text-base text-[#101010] font-semibold">
                  {departmentList.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#101010]">Total Staffs</p>
                <p className="text-base text-[#101010] font-semibold">
                  {"---"}
                </p>
              </div>
            </div>
          </div>
        )}

        <Form.Item label={null}>
          <div className="mt-5">
            <FormInputButton>
              {/* {btnLoading ? <Loader color="#fff" /> : label} */}
              Next
            </FormInputButton>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ComplianceLayout;
