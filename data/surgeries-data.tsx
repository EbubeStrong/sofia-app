import type { TableProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//components
import Chevron from "@/public/images/chevron-forward.svg";

interface ISurgeryProps {
  date: Date;
  type: string;
  procedure: string;
  diagnosis: string;
  performedBy: string;
  id: string;
  patientId: string;
}

export const SurgeryTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<ISurgeryProps>["columns"] = [
    {
      title: "DATE PERFORMED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      render: (type) => <span>{type}</span>,
    },
    {
      title: "PROCEDURE",
      dataIndex: "procedure",
      key: "procedure",
      render: (procedure) => <span>{procedure}</span>,
    },
    {
      title: "PRE-SURGERY DIAGNOSIS",
      dataIndex: "diagnosis",
      key: "diagnosis",
      render: (diagnosis) => <span>{diagnosis}</span>,
    },
    {
      title: "PERFORMED BY",
      dataIndex: "performedBy",
      key: "performedBy",
      render: (performedBy) => <span>{performedBy}</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, el) => {
        return (
          <Link href={`${pathname}/${el.id}`}>
            <Image src={Chevron} alt="Chevron Forward" priority />
          </Link>
        );
      },
    },
  ];

  return columns;
};
