"use client";

import React from "react";
import { Upload } from "antd";

//components
import { FileUploadIcon } from "@/assets/icons";
import { FormInputUploadContainer } from "./styles";

interface IFormInputUploadProps {
  cssStyle?: React.CSSProperties;
}

const FormInputUpload: React.FC<IFormInputUploadProps> = ({ cssStyle }) => {
  return (
    <FormInputUploadContainer $backgroundColor={cssStyle?.backgroundColor}>
      <Upload.Dragger name="files" action="/upload.do">
        <p className="ant-upload-drag-icon flex justify-center !mb-2">
          <FileUploadIcon />
        </p>
        <p className="ant-upload-text !font-libre_franklin font-medium">
          <span className="font-semibold text-[#1175C0]">Click to upload</span>{" "}
          or drag and drop
        </p>
        <p className="ant-upload-hint !font-libre_franklin">
          Supports PNG, JPG and PDF files. Max size 1MB.
        </p>
      </Upload.Dragger>
    </FormInputUploadContainer>
  );
};

export default FormInputUpload;
