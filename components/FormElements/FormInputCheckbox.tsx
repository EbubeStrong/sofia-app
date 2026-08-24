import React from "react";
import { Checkbox, CheckboxChangeEvent, CheckboxProps } from "antd";

type TFormInputCheckboxProps = {
  onChange?: (e: CheckboxChangeEvent) => void;
  disabled?: boolean;
  label?: string | React.ReactNode;
  checked?: CheckboxProps["checked"];
  value?: CheckboxProps["value"];
};

const FormInputCheckbox: React.FC<TFormInputCheckboxProps> = ({
  onChange,
  disabled,
  label,
  checked,
  value,
}) => {
  return (
    <Checkbox
      onChange={onChange}
      disabled={disabled}
      checked={checked}
      value={value}
    >
      {label}
    </Checkbox>
  );
};

export default FormInputCheckbox;
