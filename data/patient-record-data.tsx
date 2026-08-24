import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { Button, type MenuProps, type TableProps } from "antd";
import SofiaDropdown from "@/components/Dropdowns";
import { DotsVertical } from "@/assets/icons";
import { patientsSummaryTableRowActions } from "@/components/Pharmacy/inventory/InventoryRowActions";
import { HighlightText } from "@/components/Pharmacy/utils/HighlightText";


//MenuProps["items"]

interface IColProps {
  setGetPatientId: (val: string) => void;
  setStep: (val: number) => void;
  setOpenEditForm: (val: boolean) => void;
  activeKey: string;
}

export interface IPatientRecords {
  patientId: string;
  patientName?: string;
  name?: string;
  gender: string;
  email: string;
  hospital: string;
  phoneNumber: string;
  priority: string;
  date: Date;
  lastVisit?: string;
  age?: number;
}

const patientItems = (
  id: string,
  setOpenEditForm: (val: boolean) => void,
  setGetPatientId: (val: string) => void,
  setStep: (val: number) => void
): MenuProps["items"] => [
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(1);
        }}
      >
        Edit basic info
      </button>
    ),
    key: 1,
  },
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(2);
        }}
      >
        Edit insurance info
      </button>
    ),
    key: 2,
  },
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(3);
        }}
      >
        Edit emergency contact
      </button>
    ),
    key: 3,
  },
];

export const PatientRecordsColumns = ({
  setOpenEditForm,
  setGetPatientId,
  setStep,
  activeKey
}: IColProps) => {
  const pathname = usePathname();

  const columns: TableProps<IPatientRecords>["columns"] = [
    {
      title: "PATIENT ID",
      dataIndex: "patientId",
      key: "patientId",
      render: (patientId) => (
        <p className="w-[170px] line-clamp-1">{patientId}</p>
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "AGE",
      dataIndex: "age",
      key: "age",
      render: (age) => <span>{age}</span>,
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => <span>{gender}</span>,
    },
    {
      title: "EMAIL",
      key: "email",
      dataIndex: "email",
      render: (email) => <span>{email}</span>,
    },
    {
      title: "LAST VISIT",
      dataIndex: "lastVisit",
      key: "lastVisit",
      render: (lastVisit) => <span>{lastVisit}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (_, el) => (
        <div className="flex items-center gap-4">
          <Link
            href={(() => {
              const setActiveTab = new URLSearchParams();
              setActiveTab.set("q", activeKey ?? "prescription")
              const query = setActiveTab.toString();
              return `${pathname}/${el?.patientId}/summary?${query}`
            })()}
            className="text-sm !text-white font-medium bg-[#1175C0] rounded-lg px-3 py-2"
          >
            View
          </Link>
          <SofiaDropdown
            label={
              <button type="button">
                <DotsVertical />
              </button>
            }
            items={patientItems(
              el.patientId,
              setOpenEditForm,
              setGetPatientId,
              setStep
            )}
          />
        </div>
      ),
    },
  ];

  return columns;
};

export const PatientRecordsColumnss = (searchValue = "") => {
  const router = useRouter();

  const columns: TableProps<IPatientRecords>["columns"] = [
    {
      title: "PATIENT ID",
      dataIndex: "patientId",
      key: "patientId",
       render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
    ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "AGE",
      dataIndex: "age",
      key: "age",
      
    },
    {
      title: "LAST VISIT",
      dataIndex: "lastVisit",
      key: "lastVisit",
      
    },
    {
      title: "DATE OF EXPIRY",
      dataIndex: "dateOfExpiry",
      key: "dateOfExpiry",
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 50,
      render: (_, record) => (
          <Button
            size="small"
            className="!rounded-lg !bg-[#1175C0] !text-white !p-4 hover:!bg-[#1175C0]/90"
            onClick={() => {
              console.log("Send email for", record.patientId);
            }}
          >
              View
          </Button>
      ),
    },
    {
      title: "",
      key: "dropdown",
      width: 50,
      render: (_, record) => (
        <SofiaDropdown
          label={
            <button>
              <DotsVertical />
            </button>
          }
          items={patientsSummaryTableRowActions(record, router)}
        />
      ),
    },
  ];

  return columns;
};
