import type { TableProps } from "antd";

type IAuditLogs = {
  key: string | number;
  name: string;
  role: string;
  activityType: string;
  date: string;
  roles: string;
};

export const AuditLogTableColumn: TableProps<IAuditLogs>["columns"] = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    render: (name) => <span>{name}</span>,
  },
  {
    title: "ROLE",
    key: "role",
    dataIndex: "role",
    render: (role) => <span>{role}</span>,
  },
  {
    title: "ACTIVITY TYPE",
    dataIndex: "activityType",
    key: "activityType",
    render: (activityType) => <span>{activityType}</span>,
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
    render: (date) => <span>{date}</span>,
  },
];
