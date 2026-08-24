import { useState, useEffect, useCallback, useMemo } from "react";
import { Form, FormInstance } from "antd";

//components
import FormGroup from "./FormGroup";
import { IFieldData, ISchema, IValid } from "./types";
import { checkVisibility, defaultValidateMessages } from "./utils";
import FormInputButton from "./FormInputButton";
import { CustomCheckIcon } from "@/assets/icons";
import { usePasswordStore } from "@/stores/configFormStore";
import Loader from "../Loader";
import { customizeRequiredMark } from "../CustomizedRequiredMark";

type TFormConfigProps<T> = {
  schema: ISchema[];
  onSubmit: (value: T) => void;
  beforeBtn?: React.ReactNode;
  afterBtn?: React.ReactNode;
  btnText?: string;
  addTopBtn?: React.ReactNode;
  twClassStyle?: string;
  form: FormInstance;
  onFieldChange?: (fields: IFieldData[]) => void;
  btnLoading?: boolean;
  formName?: string;
  initialValues?: object;
  btnClassName?: string;
  textAreaRow?: number;
};

export const passwordFieldNames = [
  "loginPassword",
  "doctorPassword",
  "resetNewPassword",
  "newPassword_settings",
  "invitePassword",
];

const FormConfig = <T,>({
  schema,
  onSubmit,
  beforeBtn,
  afterBtn,
  btnText,
  btnLoading,
  addTopBtn,
  twClassStyle,
  onFieldChange,
  form,
  formName,
  initialValues,
  btnClassName,
}: TFormConfigProps<T>): React.ReactElement => {
  const { passwordValue } = usePasswordStore();

  const [valid, setValid] = useState<IValid>({
    number: false,
    uppercase: false,
    specialChars: false,
    length: false,
  });
  const [validated, setValidated] = useState(false);

  const passwordDisabled = !(passwordValue && validated);

  const validateLength = useCallback((e: string) => e.length >= 8, []);
  const validateNums = useCallback((e: string) => /\d/.test(e), []);
  const validateCaps = useCallback((e: string) => e.toLowerCase() != e, []);
  const validateSpecialChars = useCallback(
    (e: string) => /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e),
    []
  );

  const validate = useCallback(
    (e: string) => {
      setValid({
        length: validateLength(e),
        number: validateNums(e),
        uppercase: validateCaps(e),
        specialChars: validateSpecialChars(e),
      });
    },
    [validateLength, validateNums, validateCaps, validateSpecialChars]
  );

  useEffect(() => {
    setValidated(
      valid.uppercase === true &&
        valid.specialChars === true &&
        valid.number === true &&
        valid.length === true
    );
  }, [valid]);

  const hasPasswordVal = useMemo(
    () => schema.some((item) => passwordFieldNames.includes(item.name)),
    [schema]
  );

  // Collect all fields that have "visibleWhen"
  const dependencyFields = useMemo(() => {
    return schema
      .filter((f) => f.visibleWhen?.field)
      .map((f) => f.visibleWhen!.field);
  }, [schema]);

  // Watch them in real-time
  const watchedValues = Form.useWatch(dependencyFields, form);

  // Add after watchedValues:
  const combinedValues = useMemo(
    () => ({
      ...form.getFieldsValue(),
      ...watchedValues,
    }),
    [watchedValues, form]
  );

  // Add before return statement:
  const visibleFields = useMemo(
    () => schema.filter((field) => checkVisibility(field, combinedValues)),
    [schema, combinedValues]
  );

  return (
    <Form
      form={form}
      name={formName}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      validateMessages={defaultValidateMessages}
      autoComplete="off"
      requiredMark={customizeRequiredMark}
      onFieldsChange={useCallback(
        (_: unknown, allFields: IFieldData[]) => {
          if (onFieldChange) {
            requestIdleCallback(
              () => {
                onFieldChange(allFields);
              },
              { timeout: 100 }
            );
          }
        },
        [onFieldChange]
      )}
    >
      {addTopBtn}

      <div className={twClassStyle}>
        {visibleFields.map((field) => {
          const {
            name,
            label,
            type,
            placeholder,
            required,
            options,
            helpText,
            dependencies,
            fieldClass,
            disabled,
            selectionLoading,
            handleCustomAction,
            onSearch,
            onClear,
            onSelect,
            rules = [],
            suffix,
            prefix,
            min,
            max,
            inputMode,
            addonType,
            addonInputType,
            addonName,
            addonWidth = 70,
            addonOptions,
            addonDefaultValue,
            allowFutureDate,
          } = field;

          return (
            <FormGroup
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              required={required}
              options={options}
              helpText={helpText}
              canViewButton={type === "submitButton"}
              dependencies={dependencies}
              fieldClass={fieldClass}
              validate={validate}
              disabled={disabled}
              selectionLoading={selectionLoading}
              handleCustomAction={handleCustomAction}
              btnLoading={btnLoading}
              onSearch={onSearch}
              onClear={onClear}
              onSelect={onSelect}
              suffix={suffix}
              prefix={prefix}
              inputMode={inputMode}
              min={min}
              max={max}
              rules={rules}
              addonInputType={addonInputType}
              addonType={addonType}
              addonName={addonName}
              addonWidth={addonWidth}
              addonOptions={addonOptions}
              addonDefaultValue={addonDefaultValue}
              allowFutureDate={allowFutureDate}
            />
          );
        })}
      </div>

      {useMemo(
        () =>
          hasPasswordVal && (
            <ul className="flex flex-col gap-1.5 mb-6">
              <li className="">
                <div className="flex items-center gap-2">
                  <CustomCheckIcon
                    color={valid.length ? "#22c55e" : "#D0D5DD"}
                  />{" "}
                  <span
                    className={`text-sm font-libre_franklin ${
                      valid.length
                        ? "text-[#22c55e] font-medium"
                        : "text-[#475467]"
                    }`}
                  >
                    Must be at least 8 characters
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <CustomCheckIcon
                    color={valid.specialChars ? "#22c55e" : "#D0D5DD"}
                  />{" "}
                  <span
                    className={`text-sm font-libre_franklin ${
                      valid.specialChars
                        ? "text-[#22c55e] font-medium"
                        : "text-[#475467]"
                    }`}
                  >
                    Must contain one special character
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <CustomCheckIcon
                    color={valid.uppercase ? "#22c55e" : "#D0D5DD"}
                  />{" "}
                  <span
                    className={`text-sm font-libre_franklin ${
                      valid.uppercase
                        ? "text-[#22c55e] font-medium"
                        : "text-[#475467]"
                    }`}
                  >
                    Must contain one uppercase character
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <CustomCheckIcon
                    color={valid.number ? "#22c55e" : "#D0D5DD"}
                  />{" "}
                  <span
                    className={`text-sm font-libre_franklin ${
                      valid.number
                        ? "text-[#22c55e] font-medium"
                        : "text-[#475467]"
                    }`}
                  >
                    Must contain one or more numbers
                  </span>
                </div>
              </li>
            </ul>
          ),
        [hasPasswordVal, valid]
      )}

      {beforeBtn}

      {btnText && (
        <Form.Item label={null}>
          <div className={`mt-5 ${btnClassName}`}>
            <FormInputButton disabled={hasPasswordVal && passwordDisabled}>
              {btnLoading ? <Loader color="#fff" /> : btnText}
            </FormInputButton>
          </div>
        </Form.Item>
      )}

      {afterBtn}
    </Form>
  );
};

export default FormConfig;
