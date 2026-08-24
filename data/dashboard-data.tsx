import type { MenuProps, TableProps } from "antd";
import Link from "next/link";
import SofiaDropdown from "@/components/Dropdowns";
import { DotsVertical } from "@/assets/icons";
import {
  CheckInIcon,
  UserIcon,
  PatientIcon,
  EmergencyIcon,
  BedIcon,
  DischargedIcon,
  ClockIcon,
  DroppedCaseIcon,
} from "@/assets/dashboard-icons";

interface IAccountData {
  date: Date;
  type: string;
  business: string;
  size: string;
  companySize: string;
  paymentOption: string;
  status: string;
  plan: string;
  id: string;
}

const items = (id: string): MenuProps["items"] => [
  {
    label: (
      <Link href={`dashboard/${id}`} className="!w-[250px]">
        View
      </Link>
    ),
    key: 1,
  },
];

export const AccountsTableColumns: TableProps<IAccountData>["columns"] = [
  {
    title: "DATE JOINED",
    dataIndex: "date",
    key: "date",
    render: (date) => <span>{date}</span>,
  },
  {
    title: "ACCOUNT TYPE",
    dataIndex: "accountType",
    key: "accountType",
    render: (accountType) => <span>{accountType}</span>,
  },
  {
    title: "BUSINESS",
    dataIndex: "business",
    key: "business",
    render: (business) => <span>{business}</span>,
  },
  {
    title: "SIZE",
    key: "size",
    dataIndex: "size",
    render: (size) => <span>{size}</span>,
  },
  {
    title: "COMPANY SIZE",
    dataIndex: "companySize",
    key: "companySize",
    render: (companySize) => <span>{companySize}</span>,
  },

  {
    title: "PAYMENT OPTION",
    dataIndex: "paymentOption",
    key: "paymentOption",
    render: (paymentOption) => <span>{paymentOption}</span>,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <div className="flex items-center justify-center px-2 py-0.5 text-sm font-libre_franklin font-medium rounded-full capitalize bg-[#077D55]/5 border border-solid border-[#077D55]/50 text-[#077D55]">
        {status}
      </div>
    ),
  },
  {
    title: "PLAN",
    dataIndex: "plan",
    key: "plan",
    render: (plan) => <span>{plan}</span>,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    render: (id) => {
      return (
        <SofiaDropdown
          label={
            <button>
              <DotsVertical />
            </button>
          }
          items={items(id)}
        />
      );
    },
  },
];

export const DashboardStats = [
  {
    title: "Total Patients Registered",
    amount: "0",
    icon: <UserIcon />,
    id: "totalPatients",
  },
  {
    title: "Total Check-Ins",
    amount: "0",
    icon: <CheckInIcon />,
    id: "totalCheckins",
  },
  {
    title: "Total Active Patients",
    amount: "0",
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "Total Emergency Cases",
    amount: "0",
    icon: <EmergencyIcon />,
    id: "totalEmergency",
  },
  {
    title: "Admitted Patients",
    amount: "0",
    icon: <BedIcon />,
    id: "admittedPatients",
  },
  {
    title: "Total Discharged Patients ",
    amount: "0",
    icon: <DischargedIcon />,
    id: "totalDischargedPatients",
  },
  {
    title: "High/Moderate Priority",
    amount: "0",
    icon: <ClockIcon />,
    id: "priorityCases",
  },
  {
    title: "Dropped Cases",
    amount: "0",
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const TREATMENT_DATA = [
  { month: "Jan", value: 800 },
  { month: "Feb", value: 600 },
  { month: "Mar", value: 950 },
  { month: "Apr", value: 700 },
  { month: "May", value: 800 },
  { month: "Jun", value: 400 },
  { month: "Jul", value: 750 },
  { month: "Aug", value: 850 },
  { month: "Sep", value: 700 },
  { month: "Oct", value: 550 },
  { month: "Nov", value: 620 },
  { month: "Dec", value: 500 },
];

export const DISEASE_DATA = [
  { month: "Jan", malaria: 400, typhoid: 300 },
  { month: "Feb", malaria: 600, typhoid: 400 },
  { month: "Mar", malaria: 800, typhoid: 500 },
  { month: "Apr", malaria: 700, typhoid: 600 },
  { month: "May", malaria: 900, typhoid: 700 },
  { month: "Jun", malaria: 600, typhoid: 500 },
  { month: "Jul", malaria: 800, typhoid: 400 },
  { month: "Aug", malaria: 700, typhoid: 600 },
  { month: "Sep", malaria: 900, typhoid: 800 },
  { month: "Oct", malaria: 800, typhoid: 700 },
  { month: "Nov", malaria: 600, typhoid: 500 },
  { month: "Dec", malaria: 900, typhoid: 600 },
];
