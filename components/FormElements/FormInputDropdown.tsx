"use client";

import React from "react";
import { Select, SelectProps } from "antd";

//components
import { FormInputDropdownContainer } from "./styles";

interface IFormDropdownProps {
  options: SelectProps["options"];
  placeholder?: string;
  label?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: SelectProps["filterOption"];
  onChange?: SelectProps["onChange"];
  value?: SelectProps["value"];
  className?: string;
  disabled?: boolean;
  defaultValue?: SelectProps["defaultValue"];
  style?: React.CSSProperties;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  size?: "large" | "middle" | "small";
  bordered?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  id?: string;
  tabIndex?: number;
  onSearch?: SelectProps["onSearch"];
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  open?: boolean;
  mode?: "multiple" | "tags" | "default";
  maxTagCount?: number;
  maxTagPlaceholder?: (omittedValues: string[]) => React.ReactNode;
  maxTagTextLength?: number;
  optionFilterProp?: string;
  optionLabelProp?: string;
  showArrow?: boolean;
  dropdownMatchSelectWidth?: boolean;
  onSelect?: SelectProps["onSelect"];
}

const FormInputDropdown: React.FC<IFormDropdownProps> = ({
  options,
  placeholder,
  label,
  allowClear,
  showSearch,
  onChange,
  value,
  disabled,
  defaultValue,
  dropdownStyle,
  className,
  filterOption,
  onSearch,
  loading,
  onSelect,
}) => {
  return (
    <FormInputDropdownContainer>
      {label && (
        <p className="text-base text-[#101010] font-medium mb-1.5">{label}</p>
      )}
      <Select
        className={`w-full [&_.ant-select-selector]:!h-12 ${className}`}
        showSearch={showSearch}
        allowClear={allowClear}
        optionFilterProp="children"
        onChange={onChange}
        defaultValue={defaultValue}
        filterOption={filterOption}
        placeholder={placeholder}
        options={options?.map((item) => {
          return {
            label: item.label,
            value: item.value,
          };
        })}
        value={value}
        disabled={disabled}
        dropdownStyle={dropdownStyle}
        onSearch={onSearch}
        loading={loading}
        onSelect={onSelect}
      />
    </FormInputDropdownContainer>
  );
};

export default FormInputDropdown;
