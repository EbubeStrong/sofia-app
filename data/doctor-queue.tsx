import type { TableProps } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

//components
import SofiaDropdown from "@/components/Dropdowns";
import { useRescheduleModalStore } from "@/stores/archiveModalStore";
import { IDoctorAppointmentItem, IDoctorResponse } from "@/interfaces/doctors";
import { formatFullName, toTitleCase } from "@/utils/getInitials";
import {
  CheckInIcon,
  DroppedCaseIcon,
  PatientIcon,
  UserIcon,
  EmergencyIcon,
  BedIcon,
  DischargedIcon,
  ClockIcon,
} from "@/assets/dashboard-icons";

export const DoctorQueueTableColumns = () => {
  const { openRescheduleModal } = useRescheduleModalStore();

  const router = useRouter();

  const columns: TableProps<IDoctorAppointmentItem>["columns"] = [
    {
      title: "TIME ASSIGNED",
      dataIndex: "time",
      key: "time",
      render: (time) => <span>{time}</span>,
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
      title: "EVENT TYPE",
      dataIndex: "eventType",
      key: "eventType",
      render: (eventType) => <span>{eventType}</span>,
    },
    {
      title: "REASON FOR VISIT",
      dataIndex: "reasonForVisit",
      key: "reasonForVisit",
      // width: 250,
      render: (reasonForVisit) => <span>{reasonForVisit}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      // width: 250,
      render: (priority) => <span>{priority}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      // width: 200,
      render: (_, el) => {
        return (
          <button
            onClick={() =>
              router.push(
                `/queues/${el.patientId}/consultation?roomId=${el.callId}`
              )
            }
            className="text-[15px] text-white font-medium bg-[#1175C0] rounded-lg px-3 py-2"
          >
            Start consultation
          </button>
        );
      },
    },
    {
      title: "",
      dataIndex: "action1",
      key: "action1",
      width: 50,
      render: () => {
        return (
          <SofiaDropdown
            items={[
              {
                label: (
                  <button
                    onClick={openRescheduleModal}
                    className="w-full flex justify-start"
                  >
                    Reschedule
                  </button>
                ),
                key: 1,
              },
              {
                label: (
                  <Link href={`#link`} passHref>
                    View Booking Details
                  </Link>
                ),
                key: 2,
              },
              {
                label: (
                  <Link href={`#link`} passHref>
                    Edit Event Type
                  </Link>
                ),
                key: 3,
              },
              {
                label: <button className="text-[#D92D20]">Delete Event</button>,
                key: 4,
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

export const profileList = (data: IDoctorResponse["data"]) => {
  const profile = [
    {
      label: "Doctors Name",
      value: formatFullName(`${data?.firstName} ${data?.lastName}`),
      id: 1,
    },
    {
      label: "Email",
      value: data?.email ?? "---",
      id: 2,
    },
    {
      label: "Country of practice",
      value: data?.country?.name ? toTitleCase(data?.country?.name) : "---",
      id: 3,
    },
    {
      label: "Practice type",
      value: data?.practiceType ?? "---",
      id: 4,
    },
    {
      label: "User ID",
      value: data?.id,
      id: 5,
    },
    {
      label: "Licence",
      value: data?.folioNumber ?? "---",
      id: 6,
    },
    {
      label: "Hospital Name",
      value: data?.hospital?.hospitalName ?? "---",
      id: 7,
    },
    {
      label: "Joined",
      value: data?.createdAt
        ? dayjs(data?.createdAt).format("MMMM D, YYYY")
        : "---",
      id: 8,
    },
  ];
  return profile;
};

export const DoctorStats = [
  {
    title: "Total Assigned Patients",
    amount: "0",
    icon: <UserIcon />,
    id: "totalPatients",
  },
  {
    title: "Pending Tests",
    amount: "0",
    icon: <CheckInIcon />,
    id: "totalCheckins",
  },
  {
    title: "Completed Consultations",
    amount: "0",
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "Patients Dropped Off",
    amount: "0",
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const DoctorQueueStats = [
  {
    title: "No of Patients",
    amount: "0",
    icon: <UserIcon />,
    id: "totalPatients",
  },
  {
    title: "Total Waiting",
    amount: "0",
    icon: <CheckInIcon />,
    id: "totalCheckins",
  },
  {
    title: "In Progress",
    amount: "0",
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "High Risk Cases",
    amount: "0",
    icon: <EmergencyIcon />,
    id: "totalEmergency",
  },
  {
    title: "Average time per visit",
    amount: "0",
    icon: <BedIcon />,
    id: "admittedPatients",
  },
  {
    title: "% of drop-offs",
    amount: "0",
    icon: <DischargedIcon />,
    id: "totalDischargedPatients",
  },
  {
    title: "Total High Risk",
    amount: "0",
    icon: <ClockIcon />,
    id: "priorityCases",
  },
  {
    title: "Total Admitted Cases",
    amount: "0",
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const CONSULTATION_DATA = [
  { month: "10am", number: 400 },
  { month: "11am", number: 600 },
  { month: "12pm", number: 800 },
  { month: "1pm", number: 700 },
  { month: "2pm", number: 900 },
  { month: "3pm", number: 600 },
  { month: "4pm", number: 800 },
  { month: "5pm", number: 700 },
];
