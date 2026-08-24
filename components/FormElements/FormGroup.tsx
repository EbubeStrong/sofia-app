import {
  ChangeEvent,
  useEffect,
  useState,
  memo,
  useMemo,
  useCallback,
} from "react";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TimePicker,
  Upload,
  Space,
} from "antd";
import { RiCalendar2Fill } from "react-icons/ri";
import { useDebouncedCallback } from "use-debounce";
import { UploadChangeParam } from "antd/es/upload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsInfoCircle } from "react-icons/bs";
import dayjs from "dayjs";

//components
import { IFormGroup } from "./types";
import {
  FormInputContainer,
  FormInputDatePickerContainer,
  FormInputDropdownContainer,
  FormInputOtpContainer,
  FormInputPasswordContainer,
  FormInputTextAreaContainer,
  FormInputUploadContainer,
} from "./styles";
import { filterOption, Injector } from "./utils";
import FormInputButton from "./FormInputButton";
import { usePasswordStore } from "@/stores/configFormStore";
import { passwordFieldNames } from "./FormConfig";
import Loader from "../Loader";
import { FileUploadIcon } from "@/assets/icons";

const HelpText = memo(({ text }: { text: string }) => (
  <span className="flex items-center gap-1 font-libre_franklin leading-tight mt-1.5">
    <BsInfoCircle /> {text}
  </span>
));
HelpText.displayName = "HelpText";

const FormGroup: React.FC<IFormGroup> = ({
  placeholder,
  type,
  textAreaRow = 3,
  label,
  name,
  required,
  options,
  canViewButton,
  helpText,
  dependencies,
  fieldClass,
  validate,
  disabled,
  selectionLoading,
  handleCustomAction,
  btnLoading,
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
  addonWidth,
  addonOptions,
  allowFutureDate,
}) => {
  const { TextArea } = Input;
  const { setPasswordValue } = usePasswordStore();

  // states
  const [country, setCountry] = useState("ng");

  const transformedOptions = useMemo(
    () =>
      options?.map((op) => ({
        label: op.label,
        value: op.value,
      })) ?? [],
    [options]
  );

  useEffect(() => {
    if (name === "phoneNumber_reg") {
      fetch("https://ipapi.co/json/") // free geolocation API
        .then((res) => res.json())
        .then((data) => {
          if (data?.country_code) {
            setCountry(data.country_code.toLowerCase()); // e.g. "ng"
          }
        })
        .catch(() => setCountry("ng")); // fallback if API fails
    }
  }, [name]);

  // Create simple memoized handlers:
  const handleSearchChange = useDebouncedCallback(
    useCallback(
      (value: string) => {
        onSearch?.(value);
      },
      [onSearch]
    ),
    1000
  );

  const handleClearClick = useCallback(() => {
    onClear?.();
  }, [onClear]);

  const handleSelectClick = useCallback(() => {
    setTimeout(() => {
      onSelect?.();
    }, 100);
  }, [onSelect]);

  const handlePasswordChange = useCallback(
    (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(fieldName, e.target.value);
      if (passwordFieldNames.includes(fieldName)) {
        validate?.(e.target.value);
      }
    },
    [setPasswordValue, validate]
  );

  const handleCustomActionMemoized = useCallback(() => {
    handleCustomAction?.();
  }, [handleCustomAction]);

  const normFile = useCallback((e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }, []);

  const suffixSelector = (
    <FormInputDropdownContainer>
      <Form.Item name={`${name}Suffix`} noStyle>
        <Select
          style={{ width: addonWidth }}
          className="[&_.ant-select-selector]:!h-12"
          options={addonOptions}
        />
      </Form.Item>
    </FormInputDropdownContainer>
  );

  let input;

  if (type === "email") {
    input = (
      <FormInputContainer $height="48px" className={fieldClass}>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required, type: "email" }]}
          className={fieldClass}
        >
          <Input placeholder={placeholder} disabled={disabled} />
        </Form.Item>
      </FormInputContainer>
    );
  }
  if (type === "text") {
    input = (
      <FormInputContainer
        {...(!suffix && { $height: "48px" })}
        className={fieldClass}
      >
        <Form.Item
          name={name}
          label={label}
          extra={helpText && <HelpText text={helpText} />}
          rules={[{ required: required }, ...rules]}
        >
          <Injector>
            {(props) => (
              <Space.Compact block>
                {addonType === "prefix" && suffixSelector}
                <Input
                  placeholder={placeholder}
                  disabled={disabled}
                  inputMode={inputMode}
                  suffix={suffix}
                  prefix={prefix}
                  min={min}
                  max={max}
                  type={addonInputType}
                  {...props}
                />
                {addonType === "suffix" && suffixSelector}
              </Space.Compact>
            )}
          </Injector>
        </Form.Item>
      </FormInputContainer>
    );
  } else if (type === "url") {
    input = (
      <FormInputContainer $height="48px" className={fieldClass}>
        <Form.Item
          name={name}
          label={label}
          extra={helpText && <HelpText text={helpText} />}
          rules={[{ required: required, type: "url" }]}
        >
          <Input placeholder={placeholder} disabled={disabled} />
        </Form.Item>
      </FormInputContainer>
    );
  } else if (type === "number") {
    input = (
      <FormInputContainer
        {...(!suffix && { $height: "48px" })}
        className={fieldClass}
      >
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required }, ...rules]}
          extra={helpText && <HelpText text={helpText} />}
        >
          <Injector>
            {(props) => (
              <Space.Compact block>
                {addonType === "prefix" && suffixSelector}
                <Input
                  placeholder={placeholder}
                  onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    event.target.value = value.replaceAll(/\D/g, "");
                  }}
                  onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
                    const paste = event.clipboardData.getData("text");
                    if (paste) {
                      const pasteToNumber = paste.replaceAll(/\D/g, "");
                      event.clipboardData.setData("text", pasteToNumber);
                    }
                  }}
                  disabled={disabled}
                  inputMode={inputMode}
                  suffix={suffix}
                  prefix={prefix}
                  min={min}
                  max={max}
                  {...props}
                />
                {addonType === "suffix" && suffixSelector}
              </Space.Compact>
            )}
          </Injector>
        </Form.Item>
      </FormInputContainer>
    );
  } else if (type === "phone") {
    input = (
      <FormInputContainer $height="48px" className={fieldClass}>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required, min: 11 }]}
          getValueFromEvent={(value) => value}
        >
          <PhoneInput
            placeholder="Enter phone number"
            country={country}
            enableSearch={true}
            countryCodeEditable={false}
            inputStyle={{
              height: "48px",
              width: "100%",
              border: "1px solid #d0d5dd",
              borderRadius: "8px",
              fontSize: 16,
              fontFamily: "var(--font-libre-franklin)",
            }}
            buttonStyle={{
              border: "1px solid #d0d5dd",
              borderRadius: "8px 0 0 8px",
            }}
            inputProps={{ maxLength: 18 }}
          />
        </Form.Item>
      </FormInputContainer>
    );
  } else if (type === "password") {
    const isConfirmPassword =
      name === "resetConfirmPassword" || name === "confirmPassword_settings";
    input = (
      <Form.Item
        name={name}
        label={label}
        dependencies={isConfirmPassword ? [dependencies] : undefined}
        rules={[
          { required: required },
          ...(isConfirmPassword
            ? [
                ({
                  getFieldValue,
                }: {
                  getFieldValue: (name: string) => unknown;
                }) => ({
                  validator(_: unknown, value: unknown) {
                    if (!value || getFieldValue(dependencies!) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered does not match"
                      )
                    );
                  },
                }),
              ]
            : []),
        ]}
        className={fieldClass}
      >
        <FormInputPasswordContainer>
          <Input.Password
            placeholder={placeholder}
            onChange={handlePasswordChange(name)}
          />
        </FormInputPasswordContainer>
      </Form.Item>
    );
  } else if (type === "textArea") {
    input = (
      <FormInputTextAreaContainer className={fieldClass}>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required }]}
          extra={helpText && <HelpText text={helpText} />}
        >
          <TextArea rows={textAreaRow} placeholder={placeholder} />
        </Form.Item>
      </FormInputTextAreaContainer>
    );
  } else if (type === "checkbox") {
    input = (
      <Form.Item
        name={name}
        valuePropName="checked"
        label={null}
        rules={[{ required: required }]}
        className={fieldClass}
      >
        <Checkbox>{label}</Checkbox>
      </Form.Item>
    );
  } else if (type === "checkboxGroup") {
    input = (
      <Form.Item
        name={name}
        label={label}
        rules={[{ required: required }]}
        className={fieldClass}
      >
        <Checkbox.Group className="w-full flex flex-col gap-2">
          {options?.map(({ label, value }) => (
            <Checkbox key={value} value={value} disabled={disabled}>
              {label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    );
  } else if (type === "radioGroup") {
    input = (
      <Form.Item
        name={name}
        label={label}
        rules={[{ required: required }]}
        className={fieldClass}
      >
        <Radio.Group>
          {options?.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  } else if (type === "selection" && options) {
    input = (
      <FormInputDropdownContainer className={fieldClass}>
        <Form.Item
          className="w-full max-w-full [&_.ant-select-selector]:!h-12"
          name={name}
          label={label}
          rules={[{ required: required }]}
          extra={helpText && <HelpText text={helpText} />}
        >
          <Select
            showSearch
            allowClear
            optionFilterProp="label"
            onSearch={handleSearchChange}
            onSelect={handleSelectClick}
            filterOption={onSearch ? false : filterOption}
            onClear={handleClearClick}
            placeholder={placeholder}
            loading={selectionLoading}
            virtual={true}
            options={transformedOptions}
            disabled={disabled}
          />
        </Form.Item>
      </FormInputDropdownContainer>
    );
  } else if (type === "multiSelection" && options) {
    input = (
      <FormInputDropdownContainer className={fieldClass}>
        <Form.Item
          className="w-full max-w-full"
          name={name}
          label={label}
          rules={[{ required: required }]}
          extra={helpText && <HelpText text={helpText} />}
        >
          <Select
            mode="multiple"
            showSearch
            allowClear
            optionFilterProp="children"
            onSearch={handleSearchChange}
            filterOption={onSearch ? false : filterOption}
            onClear={handleClearClick}
            placeholder={placeholder}
            loading={selectionLoading}
            options={transformedOptions}
            disabled={disabled}
            onSelect={handleSelectClick}
            virtual={true}
          />
        </Form.Item>
      </FormInputDropdownContainer>
    );
  } else if (type === "date") {
    input = (
      <FormInputDatePickerContainer className={fieldClass}>
        <Form.Item name={name} label={label} rules={[{ required: required }]}>
          <DatePicker
            placeholder={placeholder}
            suffixIcon={<RiCalendar2Fill className="text-xl" />}
            // disabledDate={(current) => current && current > dayjs()}
            disabledDate={(current) => {
               if (!current) return false;

                if (allowFutureDate) return false;

                return current > dayjs();
              }}
             />
        </Form.Item>
      </FormInputDatePickerContainer>
    );
  } else if (type === "time") {
    input = (
      <FormInputDatePickerContainer>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required }]}
          className={fieldClass}
        >
          <TimePicker placeholder={placeholder} />
        </Form.Item>
      </FormInputDatePickerContainer>
    );
  } else if (type === "otp") {
    input = (
      <FormInputOtpContainer>
        <Form.Item
          name={name}
          label={label}
          rules={[{ required: required }]}
          className={fieldClass}
        >
          <Input.OTP />
        </Form.Item>
      </FormInputOtpContainer>
    );
  } else if (type === "upload") {
    input = (
      <FormInputUploadContainer className={fieldClass} $backgroundColor="#fff">
        <Form.Item label={label} required={required}>
          <Form.Item
            name={name}
            rules={[{ required: required }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" maxCount={1}>
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
        </Form.Item>
      </FormInputUploadContainer>
    );
  } else if (type === "submitButton" && canViewButton) {
    input = (
      <Form.Item label={null} className={fieldClass}>
        <div className="mt-5">
          <FormInputButton className={fieldClass}>
            {btnLoading ? <Loader color="#fff" /> : label}
          </FormInputButton>
        </div>
      </Form.Item>
    );
  } else if (type === "custom") {
    if (name === "custom-password-action") {
      input = (
        <div className={`w-full ${fieldClass}`}>
          <p className="pb-2 text-[#212121cc] font-medium">{label}</p>
          <button
            type="button"
            id={`${name}-id`}
            className="border border-[#d0d5dd] w-full max-w-full h-12 rounded-lg font-semibold text-sm text-[#101010]/70"
            onClick={handleCustomActionMemoized}
          >
            {placeholder}
          </button>
        </div>
      );
    }
  }

  return input;
};

const arePropsEqual = (prevProps: IFormGroup, nextProps: IFormGroup) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.type === nextProps.type &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.selectionLoading === nextProps.selectionLoading &&
    prevProps.btnLoading === nextProps.btnLoading &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.label === nextProps.label &&
    prevProps.required === nextProps.required &&
    prevProps.helpText === nextProps.helpText &&
    JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
  );
};

export default memo(FormGroup, arePropsEqual);
