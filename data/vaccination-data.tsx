import type { TableProps } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

//components
import Chevron from "@/public/images/chevron-forward.svg";

interface ISurgeryProps {
  date: Date;
  diagnosis: string;
  vaccine: string;
  consent: string;
  doses: string;
  unit: string;
  note: string;
  id: string;
  patientId: string;
}

export const VaccinationTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<ISurgeryProps>["columns"] = [
    {
      title: "DATE ADMINISTERED",
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
      title: "VACCINE",
      dataIndex: "vaccine",
      key: "vaccine",
      render: (vaccine) => <span>{vaccine}</span>,
    },
    {
      title: "CONSENT",
      dataIndex: "consent",
      key: "consent",
      render: (consent) => <span>{consent}</span>,
    },
    {
      title: "DOSES",
      dataIndex: "doses",
      key: "doses",
      render: (doses) => <span>{doses}</span>,
    },
    {
      title: "UNIT",
      dataIndex: "unit",
      key: "unit",
      render: (unit) => <span>{unit}</span>,
    },
    {
      title: "NOTE",
      dataIndex: "note",
      key: "note",
      render: (note) => <span>{note}</span>,
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
