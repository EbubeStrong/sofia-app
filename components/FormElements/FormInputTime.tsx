import React from "react";
import { TimePicker } from "antd";
import { FormInputDatePickerContainer } from "./styles";

interface IFormTimeProps {
  placeholder?: string;
}

const FormInputTime: React.FC<IFormTimeProps> = ({ placeholder }) => {
  return (
    <FormInputDatePickerContainer>
      <TimePicker placeholder={placeholder} />
    </FormInputDatePickerContainer>
  );
};

export default FormInputTime;
