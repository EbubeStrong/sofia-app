import type { TableProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//components
import Chevron from "@/public/images/chevron-forward.svg";

interface IAllergyData {
  date: Date;
  type: string;
  agent: string;
  condition: string;
  severity: string;
  reaction: string;
  id: string;
  patientId: string;
}

export const AllergyTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<IAllergyData>["columns"] = [
    {
      title: "DATE",
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
      title: "AGENT",
      dataIndex: "agent",
      key: "agent",
      render: (agent) => <span>{agent}</span>,
    },
    {
      title: "CONDITION",
      dataIndex: "condition",
      key: "condition",
      render: (condition) => <span>{condition}</span>,
    },
    {
      title: "SEVERITY",
      dataIndex: "severity",
      key: "severity",
      render: (severity) => (
        <div className="flex items-center justify-center px-2 py-0.5 text-sm font-libre_franklin font-medium rounded-full capitalize bg-[#077D55] text-white">
          {severity}
        </div>
      ),
    },
    {
      title: "REACTION",
      dataIndex: "reaction",
      key: "reaction",
      render: (reaction) => <span>{reaction}</span>,
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
