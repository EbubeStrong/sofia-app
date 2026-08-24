"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import StatsCardVariant from "@/components/StatsCardVariant";
import { CheckinStats } from "@/data/checkin-data";
import CheckinTableSection from "@/components/CheckinTableSection";
import { TCheckinsResp, TCheckinStats } from "@/interfaces/checkin";
import { useCheckinStats, useFetchCheckins } from "@/services/checkins";

interface CheckinLayoutProps {
  initialData: TCheckinsResp["data"];
}

const ReceptionDashboardLayout: React.FC<CheckinLayoutProps> = ({
  initialData,
}) => {
  const searchParams = useSearchParams();

  const [getStats, setGetStats] = useState({} as TCheckinStats["data"]);
  const [activeKey, setActiveKey] = useState<string>(
    searchParams.get("q") ?? "TodaysEmergency"
  );

  const { data: checkins, isFetching: isFetchingCheckins } = useFetchCheckins(
    initialData,
    activeKey
  );

  const { data: checkinStatsData, isSuccess: isCheckinStatSuccess } =
    useCheckinStats();

  useEffect(() => {
    if (isCheckinStatSuccess && checkinStatsData) {
      setGetStats(checkinStatsData);
    }
  }, [checkinStatsData, isCheckinStatSuccess]);

  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
            Dashboard
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            Comprehensive patient flow management and metrics
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {CheckinStats(getStats)?.map((stat) => (
          <StatsCardVariant
            key={stat.id}
            id={stat.id}
            title={stat.title}
            amount={stat.amount}
            icon={stat.icon}
          />
        ))}
      </section>

      <section className="border border-solid border-dark/20 rounded-lg p-4 bg-white">
        <CheckinTableSection
          tableData={checkins as TCheckinsResp["data"]}
          loading={isFetchingCheckins}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          type="dashboard"
        />
      </section>
    </div>
  );
};

export default ReceptionDashboardLayout;
