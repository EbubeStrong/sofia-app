"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import { AuditLogTableColumn } from "@/data/audit-logs-columns";
import ExportButton from "@/components/Buttons/ExportButton";
import SofiaTable from "@/components/Tables/SofiaTable";

const genericList = Array.from({ length: 5 }, (_, index) => {
  return {
    key: index,
    name: ["Eric Monono", "Dr. Eric Monono"][index % 2],
    role: "ericmonono@gmail.com",
    activityType: ["Patient Onboarding", "Added New Subscription"][index % 2],
    date: "12 NOV 2024 11:32 PM",
    roles: "Admin",
  };
});

export default function AuditLogsModule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-sofia_dark text-2xl font-semibold leading-snug">
            Audit Logs
          </h1>
          <p className="text-[#101010B2] text-sm">Track user account changes</p>
        </div>
        <ExportButton />
      </div>

      <div className="border rounded-md bg-white">
        <Suspense>
          <SofiaTable
            columns={AuditLogTableColumn as ColumnType[]}
            dataSource={genericList}
            loading={false}
            pageTotal={genericList.length}
          />
        </Suspense>
      </div>
    </div>
  );
}
