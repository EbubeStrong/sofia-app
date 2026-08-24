import React from "react";
import { Input } from "antd";

type TFormInputPassword = {
  placeholder?: string;
};

const FormInputPassword: React.FC<TFormInputPassword> = ({ placeholder }) => {
  return <Input.Password placeholder={placeholder} />;
};

export default FormInputPassword;
