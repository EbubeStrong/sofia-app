import { BsThreeDotsVertical } from "react-icons/bs";
import type { TableProps } from "antd";

import {
  CheckInIcon,
  PatientIcon,
  EmergencyIcon,
} from "@/assets/dashboard-icons";
import { BedSetupColumnProps } from "@/interfaces/bed-setup";
import SofiaDropdown from "@/components/Dropdowns";

export const BedSetupStats = [
  {
    title: "Total Wards",
    amount: "0",
    icon: <CheckInIcon />,
    id: "totalCheckins",
    extra: "actively admitted",
  },
  {
    title: "Total Rooms",
    amount: "0",
    icon: <EmergencyIcon />,
    id: "totalEmergency",
    extra: "actively admitted",
  },
  {
    title: "Total Beds",
    amount: "0",
    icon: <PatientIcon />,
    id: "totalActivePatients",
    extra: "occupancy rate",
  },
];

export const DepartmentTableColumns = () => {
  const columns: TableProps<BedSetupColumnProps>["columns"] = [
    {
      title: "DEPARTMENT NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "EXCELLENCE",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "STAFF COUNT",
      dataIndex: "staffCount",
      key: "staffCount",
      render: (staffCount) => <span>{staffCount}</span>,
    },
    {
      title: "ADDED BY",
      dataIndex: "addedBy",
      key: "addedBy",
      render: (addedBy) => <span>{addedBy}</span>,
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateAdded",
      key: "dateAdded",
      render: (dateAdded) => <span>{dateAdded}</span>,
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
                    onClick={() => {}}
                    className="w-full flex justify-start"
                  >
                    Edit
                  </button>
                ),
                key: 1,
              },
              {
                label: <button className="text-[#D92D20]">Delete Event</button>,
                key: 2,
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
