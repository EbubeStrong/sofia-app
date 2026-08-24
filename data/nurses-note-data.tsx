import type { TableProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

//components
import Chevron from "@/public/images/chevron-forward.svg";
import {
  UserIcon,
  PatientIcon,
  BedIcon,
  DischargedIcon,
  ClockIcon,
  DroppedCaseIcon,
} from "@/assets/dashboard-icons";
import { INursesItem, NursesStatsResp } from "@/interfaces/nurses";
import TagVariant from "@/components/TagVariant";
import { priorityStatus } from "@/utils/priority-format";

interface INursesNoteProps {
  date: Date;
  complaint: string;
  nursesNote: string;
  collectedBy: string;
  id: string;
  patientId: string;
}

export const NursesNoteTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<INursesNoteProps>["columns"] = [
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
      title: "NURSES NOTE",
      dataIndex: "nursesNote",
      key: "nursesNote",
      width: "320px",
      render: (nursesNote) => <p>{nursesNote}</p>,
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

export const NurseDashboardStats = (
  data: NursesStatsResp["data"],
  isLead: boolean
) => [
  ...(isLead
    ? [
        {
          title: "Total Unssigned Patients",
          amount: data?.totalUnassignedPatients ?? 0,
          icon: <UserIcon />,
          id: "totalPatients",
        },
      ]
    : []),
  {
    title: "Total Assigned Patients",
    amount: data?.totalAssignedPatients ?? 0,
    icon: <UserIcon />,
    id: isLead ? "totalAssigned" : "totalPatients",
  },
  {
    title: "Total Admitted Patients",
    amount: data?.totalAdmittedPatients ?? 0,
    icon: <BedIcon />,
    id: "totalCheckins",
  },
  {
    title: "Total Closed Patients",
    amount: data?.totalClosedPatients ?? 0,
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "Total Discharged Patients ",
    amount: data?.totalDischarge ?? 0,
    icon: <DischargedIcon />,
    id: "totalDischargedPatients",
  },
  {
    title: "Total Moderate/High Priority",
    amount: data?.totalHIghPriority ?? 0,
    icon: <ClockIcon />,
    id: "priorityCases",
  },
  {
    title: "Total Patients Dropped Off",
    amount: data?.totalDroffOffPatients ?? 0,
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const NurseQueueColumns = (isLead: boolean) => {
  const baseColumns: TableProps<INursesItem>["columns"] = [
    {
      title: "CHECK-IN",
      dataIndex: "checkin",
      key: "checkin",
      render: (checkin) => <span>{checkin}</span>,
    },
    {
      title: "PATIENT ID",
      dataIndex: "patientId",
      key: "patientId",
      render: (patientId) => <span>{patientId}</span>,
    },
    {
      title: "PATIENT NAME",
      dataIndex: "patientName",
      key: "patientName",
      render: (patientName) => <span>{patientName}</span>,
    },
    {
      title: "ACTIVITY",
      dataIndex: "activity",
      key: "activity",
      render: (activity) => <span>{activity}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <TagVariant
          label={priority}
          color={priorityStatus(priority)}
          className="!text-sm !font-libre_franklin"
        />
      ),
    },
    {
      title: "COMPLAINT",
      dataIndex: "complaint",
      key: "complaint",
      render: (complaint) => <p className="line-clamp-2">{complaint}</p>,
      width: 300,
    },
    {
      title: "ASSIGNED DOCTOR",
      dataIndex: "doctorAssigned",
      key: "doctorAssigned",
    },
  ];

  const assignColumns: TableProps<INursesItem>["columns"] = [
    {
      title: "ASSIGN TO",
      dataIndex: "assignTo",
      key: "assignTo",
      width: 250,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
    },
  ];

  const actionColumn: TableProps<INursesItem>["columns"] = [
    {
      title: "",
      dataIndex: "action1",
      key: "action1",
      width: 10,
    },
  ];

  const columns = isLead
    ? [...baseColumns, ...assignColumns, ...actionColumn]
    : [...baseColumns, ...actionColumn];

  return columns;
};
