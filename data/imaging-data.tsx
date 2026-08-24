import type { TableProps } from "antd";

//components
import { IImagingProps } from "@/interfaces/tableDataTypes";
import { DownloadIcon } from "@/assets/icons";
import DeleteButton from "@/components/Buttons/DeleteButton";

export const ImagingTableColumns = () => {
  const columns: TableProps<IImagingProps>["columns"] = [
    {
      title: "FILE NAME",
      dataIndex: "fileName",
      key: "fileName",
      render: (fileName) => <span>{fileName}</span>,
    },
    {
      title: "FILE SIZE",
      dataIndex: "fileSize",
      key: "fileSize",
      render: (fileSize) => <span>{fileSize}</span>,
    },
    {
      title: "DATE UPLOADED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "UPLOADED BY",
      dataIndex: "uploadedBy",
      key: "uploadedBy",
      render: (uploadedBy) => <span>{uploadedBy}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <div className="flex items-center gap-4">
            <button>
              <DownloadIcon color="black" />
            </button>
            <DeleteButton onSubmitAction={() => {}} />
          </div>
        );
      },
    },
  ];

  return columns;
};
