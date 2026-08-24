"use client";

import { IDoctorAppointmentData } from "@/interfaces/doctors";
import { DoctorQueueStats } from "@/data/doctor-queue";
import { DCard, DTitle } from "@/styles/HospitalCard";
import DoctorQueueTableSection from "../dashboard/DoctorQueueTable";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";

type TQueueProps = {
  initialData: IDoctorAppointmentData;
};

const options = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Week",
    value: "Week",
  },
  {
    label: "Month",
    value: "Month",
  },
];

const DoctorQueueLayout: React.FC<TQueueProps> = ({ initialData }) => {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
            Doctor&apos;s Queue
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            Comprehensive patient flow management and metrics
          </p>
        </div>
        <div className="hidden md:block md:w-full md:max-w-[200px]">
          <FormInputDropdown
            placeholder="Select date"
            options={options}
            defaultValue="today"
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {DoctorQueueStats.map((stat) => (
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

      <DoctorQueueTableSection tableData={initialData} type="queue" />
    </div>
  );
};

export default DoctorQueueLayout;
