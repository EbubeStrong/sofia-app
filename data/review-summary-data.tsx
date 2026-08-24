import type { TableProps } from "antd";

type IReviewSummaryProps = {
  key: string | number;
  indexNo: number;
  newTreatment: string;
  note: string;
  fileAttached: string;
  action: string;
};

export const ReviewSummaryColumns = () => {
  const columns: TableProps<IReviewSummaryProps>["columns"] = [
    {
      title: "NO",
      dataIndex: "indexNo",
      key: "indexNo",
      render: (indexNo) => <span>{indexNo}</span>,
    },
    {
      title: "NEW TREATMENT",
      dataIndex: "newTreatment",
      key: "newTreatment",
      render: (newTreatment) => <span>{newTreatment}</span>,
    },
    {
      title: "NOTE",
      dataIndex: "note",
      key: "note",
      render: (note) => <span>{note}</span>,
      width: 250,
    },
    {
      title: "FILES ATTACHED",
      dataIndex: "fileAttached",
      key: "fileAttached",
      render: () => <button className="underline">xray-biometric.pdf</button>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: () => <button className="text-[#1175C0]">Edit</button>,
    },
  ];

  return columns;
};
