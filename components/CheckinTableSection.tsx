"use client";

import { SetStateAction, Suspense, useMemo, useState } from "react";
import { TabsProps } from "antd";
import { ColumnType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CheckinTableColumns } from "@/data/checkin-data";
import SofiaTabs from "@/components/SofiaTabs";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaDrawers from "./Drawers";
import CheckinSummary from "@/layouts/checkin/CheckinSummary";
import { TCheckinsResp } from "@/interfaces/checkin";

interface CheckinTableProps {
  tableData: TCheckinsResp["data"];
  loading: boolean;
  activeKey: string;
  setActiveKey: React.Dispatch<SetStateAction<string>>;
  type: "dashboard" | "checkin";
}

const CheckinTableSection: React.FC<CheckinTableProps> = ({
  tableData,
  loading,
  activeKey,
  setActiveKey,
  type,
}) => {
  const isMobile = useIsMobile(1440);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();

  const [openSummary, setOpenSummary] = useState(false);
  const [checkinInfo, setCheckinInfo] = useState("");

  const scrollConfig = useMemo(
    () => (isMobile ? { x: "max-content" } : undefined),
    [isMobile]
  );

  const checkinData = tableData?.data?.map((checkin) => ({
    key: checkin?.patientId,
    checkedIn: checkin?.checkedInTime ?? "---",
    name: checkin?.name === "John Doe" ? "---" : checkin?.name ?? "---",
    eventType: checkin?.eventType ?? "---",
    activity: checkin?.activity ?? "---",
    priority: checkin?.priority ?? "---",
    visitStatus: checkin?.visitStatus ?? "---",
    id: checkin?.patientConsultationId,
    patientId: checkin?.patientId,
  }));

  const handleTabChange = (value: string) => {
    setActiveKey(value);
    params.set("q", value);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    params.set("page_size", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const renderTable = () => {
    return (
      <Suspense>
        <SofiaTable
          columns={
            CheckinTableColumns({
              setOpenSummary: setOpenSummary,
              setCheckinInfo: setCheckinInfo,
            }) as ColumnType[]
          }
          dataSource={checkinData ?? []}
          loading={loading}
          onChange={handlePageChange}
          currentPage={tableData?.page}
          pageSize={tableData?.perPage}
          pageTotal={tableData?.totalCount ?? 0}
          scroll={scrollConfig}
          hasPagination={type === "checkin"}
        />
      </Suspense>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "TodaysEmergency",
      label: "Today's Emergency",
      children: renderTable(),
    },
    {
      key: "TodaysCheckIn",
      label: "Today's Check-in",
      children: renderTable(),
    },
    {
      key: "CheckHistory",
      label: "Check-in History",
      children: renderTable(),
    },
    {
      key: "Reminders",
      label: "Reminder",
      children: renderTable(),
    },
  ];

  return (
    <div>
      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleTabChange}
        tabBarExtraContent={
          type === "dashboard" && (
            <button
              onClick={() => router.push(`/check-in`)}
              type="button"
              className="text-base text-[#667085] font-semibold px-4 py-1.5 border rounded-md"
            >
              View all
            </button>
          )
        }
      />

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">Check-in Summary</p>
            <p className="text-sm text-[#101010]/50">
              Basic patient information summary
            </p>
          </>
        }
        placement="right"
        open={openSummary}
        onClose={() => setOpenSummary(false)}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <CheckinSummary checkinId={checkinInfo} />
      </SofiaDrawers>
    </div>
  );
};

export default CheckinTableSection;
