import type { TableProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//components
import Chevron from "@/public/images/chevron-forward.svg";

interface IComplaintsData {
  date: Date;
  temperature: string;
  bloodPressure: string;
  pulseRate: string;
  respiratoryRate: string;
  height: string;
  id: string;
  patientId: string;
}

export const VitalsTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<IComplaintsData>["columns"] = [
    {
      title: "DATE RECORDED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "TEMPERATURE",
      dataIndex: "temperature",
      key: "temperature",
      render: (temperature) => <span>{temperature}</span>,
    },
    {
      title: "BLOOD PRESSURE",
      dataIndex: "bloodPressure",
      key: "bloodPressure",
      render: (bloodPressure) => <span>{bloodPressure}</span>,
    },
    {
      title: "PULSE RATE",
      dataIndex: "pulseRate",
      key: "pulseRate",
      render: (pulseRate) => <span>{pulseRate}</span>,
    },
    {
      title: "RESPIRATORY RATE",
      dataIndex: "respiratoryRate",
      key: "respiratoryRate",
      render: (respiratoryRate) => <span>{respiratoryRate}</span>,
    },
    {
      title: "HEIGHT",
      dataIndex: "height",
      key: "height",
      render: (height) => <span>{height}</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <Link href={`${pathname}/${item.id}`}>
            <Image src={Chevron} alt="Chevron Forward" priority />
          </Link>
        );
      },
    },
  ];

  return columns;
};
