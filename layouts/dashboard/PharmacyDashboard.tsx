"use client";

// import { useState } from "react";

import { DCard, DTitle } from "@/styles/HospitalCard";
import PharmacyQueueDashboardTable from "../pharmacy/PharmacyQueueDashboardTable";
import {
  PharmacyDashboardStats,
} from "@/data/pharmacy-data";
// import BarChartVariant from "@/components/Charts/BarChart";

type TQueueProps = {
  initialData: object;
};

const PharmacyDashboardLayout: React.FC<TQueueProps> = ({ initialData }) => {
console.log("Initial Data in Pharmacy Dashboard:", initialData);
  // const [plan, setPlan] = useState<string>("Today");

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
        {PharmacyDashboardStats.map((stat) => (
          <DCard $type={stat.id} key={stat.id} className="relative">
            <DTitle $type={stat.id}>{stat.title}</DTitle>

            <div className="flex flex-col gap-2 justify-center">
              <p
                className={`${
                  stat.id === "totalPatients" ? "text-white" : "text-sofia_dark"
                } text-xl md:text-2xl font-bold text-sofia_dark font-libre_franklin`}
              >
                {stat.amount}
              </p>
            </div>

            <div
              className={`absolute top-0 right-0 m-4 w-11 h-11 flex items-center justify-center rounded-full`}
            >
              {stat.icon}
            </div>
          </DCard>
        ))}
      </section>

      {/* <section className="flex flex-col xl:flex-row gap-5 w-full max-w-full">
        <div className="w-full max-w-full xl:max-w-[70%] h-fit border border-solid border-dark/20 rounded-lg p-4 bg-white">
          <div className="mb-6 flex justify-between">
            <div>
              <p className="text-base font-semibold text-[#1D2129] leading-normal">
                Top Prescribed Medications
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

          <BarChartVariant
            data={PRESCRIPTION_DATA}
            xKey="drug"
            bars={[{ dataKey: "value", fill: "#1D3354", name: "Prescription" }]}
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
      </section> */}

      <PharmacyQueueDashboardTable tableData={initialData} type="dashboard" />
    </div>
  );
};

export default PharmacyDashboardLayout;
