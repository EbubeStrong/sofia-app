"use client";

import React, { useState, useCallback, useMemo } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  Card,
  Form,
  FormInstance,
  Input,
  Select,
  Typography,
  Switch,
  Checkbox,
} from "antd";

//components
import {
  FormInputContainer,
  FormInputDropdownContainer,
  FormInputSwitchContainer,
  FormInputTextAreaContainer,
  FormNestedCardContainer,
} from "./styles";
import { INestedSchema, ISchema } from "./types";
import FormInputButton from "./FormInputButton";
import Loader from "../Loader";
import { defaultValidateMessages } from "./utils";

interface IField {
  name: number;
  key: number;
}

interface IFormInputNestedProps<T> {
  schema: INestedSchema[];
  formLabel: string;
  btnLabel: string;
  dataLogged?: boolean;
  canEdit?: boolean;
  onSubmit?: (value: T) => void;
  submitBtnLoading?: boolean;
  submitBtnText?: string;
  submitBtnClassName?: string;
  form: FormInstance;
}

// Move TextArea outside to prevent recreation
const { TextArea } = Input;

// Memoized field renderer component
const FormField = React.memo<{
  field: IField;
  schema: ISchema;
  canEdit?: boolean;
  enableField: { [key: string]: boolean };
}>(({ field, schema, canEdit, enableField }) => {
  const { name, label, type, placeholder, options, required } = schema;
  const fieldKey = `${field.key}-${name}`;
  const isDisabled = !canEdit ? false : !enableField[field.name];

  // Memoize number input handlers
  const handleNumberInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = value.replace(/[^0-9]/g, "");
    },
    []
  );

  const handleNumberPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const paste = event.clipboardData.getData("text");
      if (paste) {
        const pasteToNumber = paste.replace(/[^0-9]/g, "");
        event.clipboardData.setData("text", pasteToNumber);
      }
    },
    []
  );

  switch (type) {
    case "text":
      return (
        <FormInputContainer key={fieldKey} $height="48px">
          <Form.Item
            label={label}
            name={[field.name, name]}
            rules={[{ required }]}
            className="!mb-0"
          >
            <Input placeholder={placeholder} disabled={isDisabled} />
          </Form.Item>
        </FormInputContainer>
      );

    case "email":
      return (
        <FormInputContainer key={fieldKey} $height="48px">
          <Form.Item
            label={label}
            name={[field.name, name]}
            rules={[{ required, type: "email" }]}
            className="!mb-0"
          >
            <Input placeholder={placeholder} disabled={isDisabled} />
          </Form.Item>
        </FormInputContainer>
      );

    case "number":
      return (
        <FormInputContainer key={fieldKey} $height="48px">
          <Form.Item
            name={[field.name, name]}
            label={label}
            rules={[{ required }]}
            className="!mb-0"
          >
            <Input
              placeholder={placeholder}
              onInput={handleNumberInput}
              onPaste={handleNumberPaste}
              disabled={isDisabled}
            />
          </Form.Item>
        </FormInputContainer>
      );

    case "selection":
      return (
        <FormInputDropdownContainer key={fieldKey}>
          <Form.Item
            className="w-full max-w-full !mb-0"
            label={label}
            name={[field.name, name]}
            rules={[{ required }]}
          >
            <Select
              allowClear
              optionFilterProp="children"
              filterOption={false}
              placeholder={placeholder}
              options={options?.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              disabled={isDisabled}
            />
          </Form.Item>
        </FormInputDropdownContainer>
      );

    case "textArea":
      return (
        <FormInputTextAreaContainer key={fieldKey}>
          <Form.Item
            name={[field.name, name]}
            label={label}
            className="!mb-0"
            rules={[{ required }]}
          >
            <TextArea rows={4} disabled={!enableField[field.name]} />
          </Form.Item>
        </FormInputTextAreaContainer>
      );

    case "switch":
      return (
        <FormInputSwitchContainer key={fieldKey}>
          <Form.Item
            name={[field.name, name]}
            label={label}
            className="!mb-0"
            rules={[{ required }]}
          >
            <Switch />
          </Form.Item>
        </FormInputSwitchContainer>
      );

    case "checkbox":
      return (
        <Form.Item
          name={[field.name, name]}
          valuePropName="checked"
          label={null}
          rules={[{ required: required }]}
        >
          <Checkbox className="font-medium !text-[#212121cc]">{label}</Checkbox>
        </Form.Item>
      );

    default:
      return null;
  }
});

FormField.displayName = "FormField";

const FormInputNested = <T,>({
  schema,
  form,
  formLabel,
  btnLabel,
  dataLogged,
  canEdit,
  onSubmit,
  submitBtnLoading,
  submitBtnText,
  submitBtnClassName,
}: IFormInputNestedProps<T>) => {
  const [enableField, setEnableField] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleEnableField = useCallback((name: number) => {
    setEnableField((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  // Memoize form initial values
  const initialValues = useMemo(() => ({ items: [{}] }), []);

  const renderFormConfig = useCallback(
    (field: IField) => (
      <div
        key={field.key}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-4 gap-y-6"
      >
        {schema.map((schemaItem) => (
          <FormField
            key={`${field.key}-${schemaItem.name}`}
            field={field}
            schema={schemaItem}
            canEdit={canEdit}
            enableField={enableField}
          />
        ))}
      </div>
    ),
    [schema, canEdit, enableField]
  );

  return (
    <Form
      form={form}
      name="dynamic_nested_form_complex"
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      onFinish={onSubmit}
      validateMessages={defaultValidateMessages}
      className="relative w-full h-full"
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div className="flex flex-col gap-6">
            {fields.map((field) => (
              <FormNestedCardContainer key={field.key}>
                <Card
                  size="default"
                  title={
                    <p className="text-base md:text-lg font-medium text-[#212121]">
                      {formLabel} {field.name + 1}
                    </p>
                  }
                  extra={
                    <div className="flex items-center gap-4">
                      {canEdit && (
                        <button
                          onClick={() => handleEnableField(field.name)}
                          className="text-sm text-[#101010] font-medium border border-solid border-[#101010] w-fit px-4 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      )}

                      <RiDeleteBin5Line
                        onClick={() => remove(field.name)}
                        className="text-[#D91F11] cursor-pointer text-xl"
                      />
                    </div>
                  }
                >
                  {renderFormConfig(field)}
                </Card>
              </FormNestedCardContainer>
            ))}

            {fields.length < 4 && (
              <button
                type="button"
                className="text-base font-medium text-[#1175C0] border border-solid border-[#1175C0] w-fit px-4 py-1 h-11 rounded-md"
                onClick={() => add()}
              >
                {btnLabel}
              </button>
            )}
          </div>
        )}
      </Form.List>

      {dataLogged && (
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      )}

      <Form.Item label={null}>
        <div className={`mt-24 ${submitBtnClassName}`}>
          <FormInputButton>
            {submitBtnLoading ? <Loader color="#fff" /> : submitBtnText}
          </FormInputButton>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FormInputNested;
