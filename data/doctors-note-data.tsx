import type { TableProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

//components
import Chevron from "@/public/images/chevron-forward.svg";

interface IDoctorsNoteProps {
  date: Date;
  complaint: string;
  doctorsNote: string;
  collectedBy: string;
  id: string;
  patientId: string;
}

export const DoctorsNoteTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<IDoctorsNoteProps>["columns"] = [
    {
      title: "DATE RECORDED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "COMPLAINT",
      dataIndex: "complaint",
      key: "complaint",
      render: (complaint) => <span>{complaint}</span>,
    },
    {
      title: "DOCTORS NOTE",
      dataIndex: "doctorsNote",
      key: "doctorsNote",
      width: "320px",
      render: (doctorsNote) => <p>{doctorsNote}</p>,
    },
    {
      title: "COLLECTED BY",
      dataIndex: "collectedBy",
      key: "collectedBy",
      render: (collectedBy) => <span>{collectedBy}</span>,
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
