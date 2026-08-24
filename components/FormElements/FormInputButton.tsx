"use client";

import { Button, ButtonProps } from "antd";
import React from "react";
import { FormInputButtonContainer } from "./styles";

interface ICssProps {
  $height?: string;
  $padding?: string;
  $fontSize?: string;
}

interface IFormInputBtnProps {
  children: React.ReactNode;
  cssProps?: ICssProps;
  onHandleAction?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: ButtonProps["htmlType"];
}

const FormInputButton: React.FC<IFormInputBtnProps> = ({
  children,
  cssProps,
  onHandleAction,
  className,
  disabled,
  loading,
  htmlType,
}) => {
  return (
    <FormInputButtonContainer
      $height={cssProps?.$height}
      $padding={cssProps?.$padding}
      $fontSize={cssProps?.$fontSize}
      className={className}
    >
      <Button
        onClick={onHandleAction}
        className="w-full max-w-full"
        type="primary"
        htmlType={htmlType ?? "submit"}
        disabled={disabled}
        loading={loading}
      >
        {children}
      </Button>
    </FormInputButtonContainer>
  );
};

export default FormInputButton;
