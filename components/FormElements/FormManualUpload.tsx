import React from "react";
import { Upload } from "antd";
import { toast } from "sonner";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";

type ManualUploadProps = {
  setFileObj: React.Dispatch<React.SetStateAction<RcFile | undefined>>;
  setFileUrl: React.Dispatch<React.SetStateAction<string>>;
};

const FormManualUpload: React.FC<ManualUploadProps> = ({
  setFileObj,
  setFileUrl,
}) => {
  const props: UploadProps = {
    name: "file",
    accept: "video/*",
    beforeUpload(file: RcFile) {
      const isVideo = file.type.startsWith("video/");
      if (!isVideo) {
        toast.error("You can only upload video files");
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        toast.error("Video must be smaller than 5MB");
        return Upload.LIST_IGNORE;
      }

      return true;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        if (info.file.originFileObj) {
          const file = info.file.originFileObj;
          setFileObj(file);

          const preview = URL.createObjectURL(file);
          setFileUrl(preview);
        }
      }
      if (info.file.status === "done") {
        toast.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "removed") {
        setFileObj(undefined);
        setFileUrl("");
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setFileObj(undefined);
    },
  };

  return (
    <Upload {...props}>
      <button
        type="button"
        className="flex items-center gap-2 border border-[#1175C0] bg-white text-[#1175C0] text-base font-medium px-4 py-2 rounded-md"
      >
        Upload new video
      </button>
    </Upload>
  );
};

export default FormManualUpload;
