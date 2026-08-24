import { Rule } from "antd/es/form";

export interface IOptions {
  label: string;
  value: string | number;
}

export type TFieldType =
  | "email"
  | "text"
  | "password"
  | "selection"
  | "multiSelection"
  | "submitButton"
  | "date"
  | "number"
  | "textArea"
  | "checkbox"
  | "checkboxGroup"
  | "upload"
  | "radioGroup"
  | "time"
  | "phone"
  | "otp"
  | "custom"
  | "radio"
  | "switch"
  | "url";

interface AddonOption {
  label: string;
  value: string;
}

export interface VisibleWhen<TValues> {
  field: keyof TValues;
  equals?: TValues[keyof TValues];
  notEquals?: TValues[keyof TValues];
  in?: Array<TValues[keyof TValues]>;
}

export interface ISchema<TValues = Record<string, unknown>> {
  name: string;
  label: string;
  textAreaRow?: number;
  placeholder?: string;
  type: TFieldType;
  required: boolean;
  options?: IOptions[];
  helpText?: string;
  dependencies?: string;
  fieldClass?: string;
  disabled?: boolean;
  selectionLoading?: boolean;
  handleCustomAction?: () => void;
  visibleWhen?: VisibleWhen<TValues>;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onSelect?: () => void;

  rules?: Rule[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  addonType?: "prefix" | "suffix";
  addonInputType?: "prefix" | "suffix";
  addonName?: string;
  addonWidth?: number;
  addonOptions?: AddonOption[];
  addonDefaultValue?: string;
  allowFutureDate?: boolean;
}

export interface INestedSchema {
  name: string;
  label: string;
  placeholder?: string;
  type: TFieldType;
  required: boolean;
  options?: IOptions[];
}

export interface IFormGroup {
  name: string;
  label: string;
  placeholder?: string;
  type: TFieldType;
  required: boolean;
  options?: IOptions[];
  textAreaRow?: number;
  canViewButton: boolean;
  helpText?: string;
  dependencies?: string;
  fieldClass?: string;
  validate?: (value: string) => void;
  disabled?: boolean;
  selectionLoading?: boolean;
  handleCustomAction?: () => void;
  btnLoading?: boolean;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onSelect?: () => void;
  rules?: Rule[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  min?: number;
  max?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  addonType?: "prefix" | "suffix";
  addonInputType?: "prefix" | "suffix";
  addonName?: string;
  addonWidth?: number;
  addonOptions?: AddonOption[];
  addonDefaultValue?: string;
  allowFutureDate?: boolean;
}

export interface IValid {
  number: boolean;
  uppercase: boolean;
  specialChars: boolean;
  length: boolean;
}

export interface IFieldData {
  name: (string | number)[];
  value?: string | number;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}
