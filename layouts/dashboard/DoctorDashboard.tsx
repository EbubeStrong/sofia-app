"use client";

import { useState } from "react";

import { DoctorStats } from "@/data/doctor-queue";
import DoctorQueueTableSection from "../dashboard/DoctorQueueTable";
import { CONSULTATION_DATA } from "@/data/doctor-queue";
import SegmentedVariant from "@/components/SegmentedVariant";
import AreaChartVariant from "@/components/Charts/AreaChart";
import { FollowUpIcon } from "@/assets/dashboard-icons";
import StatsCardVariant from "@/components/StatsCardVariant";

type TQueueProps = {
  initialData: object;
};

const DoctorDashboardLayout: React.FC<TQueueProps> = ({ initialData }) => {
  const [plan, setPlan] = useState<string>("Today");

  return (
    <div className="flex flex-col gap-6">
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
        {DoctorStats.map((stat) => (
          <StatsCardVariant
            key={stat.id}
            id={stat.id}
            title={stat.title}
            amount={stat.amount}
            icon={stat.icon}
            // extra={stat.extra}
          />
        ))}
      </section>

      <section className="flex flex-col xl:flex-row gap-5 w-full max-w-full">
        <div className="w-full max-w-full xl:max-w-[70%] h-fit border border-solid border-dark/20 rounded-lg p-4 bg-white">
          <div className="mb-6 flex justify-between">
            <div>
              <p className="text-base font-semibold text-[#1D2129] leading-normal">
                Consultation Activity
              </p>
              <p className="text-sm text-[#212121]/80 font-normal">
                Track your consultation patterns
              </p>
            </div>
            <SegmentedVariant
              options={["Today", "Week", "Month"]}
              onChange={(value) => {
                setPlan(value as string);
              }}
              value={plan}
              size="middle"
              shape="round"
            />
          </div>

          <AreaChartVariant
            data={CONSULTATION_DATA}
            xKey="month"
            areas={[
              {
                dataKey: "number",
                stroke: "#2563EB",
                fill: "#2563EB40",
                name: "Consultation",
                type: "linear",
              },
            ]}
          />
        </div>

        <div className="w-full max-w-full xl:max-w-[30%] min-h-[300px] h-fit py-4 hidden lg:flex flex-col divide-y divide-dark/20 bg-white border border-solid border-dark/20 rounded-lg">
          <div className="px-4 pb-3">
            <h4 className="text-base text-[#101010] font-semibold">
              Notifications
            </h4>
          </div>
          <div className="flex flex-col divide-y divide-dark/20 px-4">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex py-2">
                <div className="flex-1">
                  <p className="text-sm text-[#101010] font-semibold flex items-center gap-1">
                    <FollowUpIcon /> New Patient Assigned
                  </p>
                  <p className="text-sm text-[#101010]/70">
                    John Doe assigned by Nurse A
                  </p>
                </div>
                <p className="text-sm text-[#101010]/50">9:30am</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DoctorQueueTableSection tableData={initialData} type="dashboard" />
    </div>
  );
};

export default DoctorDashboardLayout;
