"use client";

import React, { Suspense, useState } from "react";
// import Image from "next/image";
import { ColumnType } from "antd/es/table";
import { TabsProps } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useFetchDoctorAppointments } from "@/hooks/use-client-fetchers";
import formatMinutes from "@/utils/formatMinutes";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaTabs from "@/components/SofiaTabs";
import { PharmacyDashboardQueueColumns } from "@/data/pharmacy-data";

type TQueueTableProps = {
  tableData: object;
  type: "queue" | "dashboard";
};

const PharmacyQueueDashboardTable: React.FC<TQueueTableProps> = ({
  tableData,
  type,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const isMobile = useIsMobile(1440);

  // states
  const [activeKey, setActiveKey] = useState("new");

  const handleQueueChange = (key: string) => {
    setActiveKey(key);
    params.set("q", key);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const { data: appointments, isFetching: isLoadingAppointments } =
    useFetchDoctorAppointments(tableData as never);

  const appointmentData = appointments?.data?.map((appointment) => ({
    key: appointment?.appointmentId,
    time: appointment?.appointmentTime ?? "---",
    date: appointment?.appointmentDate
      ? dayjs(appointment?.appointmentDate).format("MMMM D, YYYY")
      : "---",
    duration: formatMinutes(appointment?.durationMinutes) ?? "",
    patientName: appointment?.patientName ?? "---",
    activity: appointment?.activity ?? "---",
    reasonForVisit: appointment?.complaint ?? "---",
    eventType: appointment?.appointmentType ?? "---",
    id: appointment?.appointmentId,
    callId: appointment?.callId,
    patientId: appointment?.patientId,
  }));

  const renderTable = () => {
    return (
      <Suspense>
        <SofiaTable
          columns={PharmacyDashboardQueueColumns() as ColumnType[]}
          dataSource={appointmentData ?? []}
          loading={isLoadingAppointments}
          currentPage={appointments?.page}
          pageSize={appointments?.perPage}
          pageTotal={appointments?.totalCount ?? 0}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </Suspense>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "new",
      label: "New Prescription",
      children: renderTable(),
    },
    // {
    //   key: "reviewed",
    //   label: "Reviewed",
    //   children: renderTable(),
    // },
    // {
    //   key: "filled",
    //   label: "Filled",
    //   children: renderTable(),
    // },
    {
      key: "approved",
      label: "Approved",
      children: renderTable(),
    },
    {
      key: "rejected",
      label: "Rejected",
      children: renderTable(),
    },
    {
      key: "completed",
      label: "Completed",
      children: renderTable(),
    },
    {
      key: "archived",
      label: "Archived",
      children: renderTable(),
    },
  ];

  return (
    <div className="flex flex-col gap-5 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      {/* {type === "dashboard" && (
        <div>
          <p className="text-base text-[#101010] font-semibold">
            Prescription Records
          </p>
          <p className="text-sm text-[#101010]/70 font-normal font-libre_franklin">
            Manage and track all prescription requests
          </p>
        </div>
      )} */}

      <SofiaTabs
              items={items}
              activeKey={activeKey}
              onChange={handleQueueChange}
              tabBarExtraContent={
                type === "dashboard" && (
                  <button
                    onClick={() => router.push(`/pharmacy/new-prescription`)}
                    type="button"
                    className="text-base text-[#667085] font-semibold px-4 py-1.5 border rounded-md"
                  >
                    View all
                  </button>
                )
              }
            />
    </div>
  );
};

export default PharmacyQueueDashboardTable;
