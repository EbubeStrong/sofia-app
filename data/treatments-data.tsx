import type { TableProps } from "antd";
import Image from "next/image";

//components
import Chevron from "@/public/images/chevron-forward.svg";
import useTreatmentModalStore from "@/stores/treatmentsModalStore";

interface ITreatmentProps {
  date: Date;
  diagnosis: string;
  prescription: string;
  instructions: string;
  type: string;
  id: string;
  patientId: string;
}

export const TreatmentsTableColumns = () => {
  const { handleOpenTreatmentModal } = useTreatmentModalStore();

  const columns: TableProps<ITreatmentProps>["columns"] = [
    {
      title: "DATE RECORDED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "DIAGNOSIS",
      dataIndex: "diagnosis",
      key: "diagnosis",
      render: (diagnosis) => <span>{diagnosis}</span>,
    },
    {
      title: "PRESCRIPTION",
      dataIndex: "prescription",
      key: "prescription",
      render: (prescription) => <span>{prescription}</span>,
    },
    {
      title: "INSTRUCTIONS",
      dataIndex: "instructions",
      key: "instructions",
      render: (instructions) => <span>{instructions}</span>,
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      render: (type) => <span>{type}</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <button onClick={handleOpenTreatmentModal}>
            <Image src={Chevron} alt="Chevron Forward" priority />
          </button>
        );
      },
    },
  ];

  return columns;
};
