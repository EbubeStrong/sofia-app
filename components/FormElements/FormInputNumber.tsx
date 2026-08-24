import React from "react";
import { FormInputContainer } from "./styles";
import { Input } from "antd";
import type { InputProps } from "antd";

interface ICssProps {
  $backgroundColor?: string;
  $borderColor?: string;
  $height?: string;
}

type TFormInput = {
  placeholder?: string;
  onChange?: InputProps["onChange"];
  allowClear?: boolean;
  cssProps?: ICssProps;
  prefix?: React.ReactNode;
  disabled?: boolean;
  label?: React.ReactNode;
  value?: InputProps["value"];
};

const FormInputNumber: React.FC<TFormInput> = ({
  placeholder,
  onChange,
  allowClear,
  cssProps,
  prefix,
  disabled,
  label,
  value,
}) => {
  return (
    <FormInputContainer
      $backgroundColor={cssProps?.$backgroundColor}
      $borderColor={cssProps?.$borderColor}
      $height={cssProps?.$height}
    >
      {label && (
        <p className="text-sofia_dark/80 text-sm font-medium font-libre_franklin mb-1">
          {label}
        </p>
      )}

      <Input
        placeholder={placeholder}
        onChange={onChange}
        allowClear={allowClear}
        prefix={prefix ?? <span />}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          event.target.value = value.replace(/[^0-9]/g, "");
        }}
        onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => {
          const paste = event.clipboardData.getData("text");
          if (paste) {
            const pasteToNumber = paste.replace(/[^0-9]/g, "");
            event.clipboardData.setData("text", pasteToNumber);
          }
        }}
        disabled={disabled}
        value={value}
      />
    </FormInputContainer>
  );
};

export default FormInputNumber;
