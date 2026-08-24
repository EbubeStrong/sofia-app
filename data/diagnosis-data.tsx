import type { TableProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";

//components
import SofiaDropdown from "@/components/Dropdowns";

interface IDiagnosisData {
  date: Date;
  title: string;
  history: string;
  collectedBy: string;
  payment: string;
  id: string;
  patientId: string;
}

export const DiagnosisTableColumns = () => {
  const columns: TableProps<IDiagnosisData>["columns"] = [
    {
      title: "DATE RECORDED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      render: (title) => <span>{title}</span>,
    },
    {
      title: "COLLECTED BY",
      dataIndex: "collectedBy",
      key: "collectedBy",
      render: (collectedBy) => <span>{collectedBy}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "viewAction",
      key: "viewAction",
      render: () => <button className="underline">View</button>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <SofiaDropdown
            items={[
              {
                label: (
                  <button className="text-[#D9222A] font-semibold">
                    Delete
                  </button>
                ),
                key: 1,
              },
            ]}
            label={
              <button>
                <BsThreeDotsVertical />
              </button>
            }
          />
        );
      },
    },
  ];

  return columns;
};
