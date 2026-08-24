"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { TabsProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { DoctorQueueTableColumns } from "@/data/doctor-queue";
import SofiaTabs from "@/components/SofiaTabs";
import { useFetchDoctorAppointments } from "@/hooks/use-client-fetchers";
import { IDoctorAppointmentData } from "@/interfaces/doctors";
import { useIsMobile } from "@/utils/detectDeviceScreen";

import formatMinutes from "@/utils/formatMinutes";

type TQueueTableProps = {
  tableData: IDoctorAppointmentData;
};

const cssProps = {
  $height: "38px",
};

const MainDoctorQueueTable: React.FC<TQueueTableProps> = ({ tableData }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile(1440);
  const params = new URLSearchParams(searchParams);
  const upcomingQuery = searchParams.get("is_upcoming");

  const [activeKey, setActiveKey] = useState("upcoming");

  const { data: appointments, isFetching: isLoadingAppointments } =
    useFetchDoctorAppointments(tableData);

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

  const handleAppointmentTab = (key: string) => {
    setActiveKey(key);
    params.set("is_upcoming", key === "upcoming" ? "true" : "false");
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (upcomingQuery === "false") {
      setActiveKey("past");
    } else {
      setActiveKey("upcoming");
    }
  }, [upcomingQuery]);

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
      key: "upcoming",
      label: "Upcoming",
      children: renderTable(),
    },
    {
      key: "past",
      label: "Past",
      children: renderTable(),
    },
  ];

  return (
    <div className="flex flex-col gap-5 mt-4">
      <div className="flex items-center">
        <SofiaFilterButton />
        <div className="w-full md:w-[340px]">
          <FormInput
            placeholder="Search doctor's records"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={cssProps}
          />
        </div>
      </div>

      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleAppointmentTab}
      />
    </div>
  );
};

export default MainDoctorQueueTable;
