"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";
import { TabsProps } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import { DoctorQueueTableColumns } from "@/data/doctor-queue";
import { useFetchDoctorAppointments } from "@/hooks/use-client-fetchers";
import formatMinutes from "@/utils/formatMinutes";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import SofiaTabs from "@/components/SofiaTabs";

type TQueueTableProps = {
  tableData: object;
  type: "queue" | "dashboard";
};

const options = [
  {
    label: "Complete Blood Count",
    value: "Complete Blood Count",
  },
  {
    label: "Urinalysis",
    value: "Urinalysis",
  },
  {
    label: "Wyder test",
    value: "Wyder test",
  },
];

const DoctorQueueTableSection: React.FC<TQueueTableProps> = ({
  tableData,
  type,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const isMobile = useIsMobile(1440);

  // states
  const [activeKey, setActiveKey] = useState("unattended");

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
          columns={DoctorQueueTableColumns() as ColumnType[]}
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
      key: "unattended",
      label: "Unattended",
      children: renderTable(),
    },
    {
      key: "attended",
      label: "Attended",
      children: renderTable(),
    },
    {
      key: "dropOff",
      label: "Drop-Off",
      children: renderTable(),
    },
  ];

  return (
    <div className="flex flex-col gap-5 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      {type === "dashboard" && (
        <div>
          <p className="text-base text-[#101010] font-semibold">
            Doctors Queue (5)
          </p>
          <p className="text-sm text-[#101010]/70 font-normal font-libre_franklin">
            Manage and track all prescription requests
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="w-full md:w-[397px]">
          <FormInput
            placeholder="Search by name or patientId"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={{ $height: "38px" }}
          />
        </div>
        <div className="hidden md:block md:w-full md:max-w-[220px]">
          <FormInputDropdown placeholder="Select status" options={options} />
        </div>
      </div>

      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleQueueChange}
      />
    </div>
  );
};

export default DoctorQueueTableSection;
