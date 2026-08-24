"use client";

import React, { useEffect, useState } from "react";
import { TabsProps } from "antd";

import SofiaTabs from "@/components/SofiaTabs";
import InPersonAvailabilty from "./InPersonAvailabilty";
import TelemedicineAvailability from "./TelemedicineAvailability";
import { AppointmentKey, TDoctorAvailabilityResp } from "@/interfaces/doctors";
import { useFetchDoctorAvailability } from "@/hooks/use-client-fetchers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TAvailabilityProps = {
  availabilityData: TDoctorAvailabilityResp["data"];
};

const AvailabilitySection: React.FC<TAvailabilityProps> = ({
  availabilityData,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const pathname = usePathname();
  const appointmentType = searchParams.get("appointment_type");

  const [availabilityKey, setAvailabilityKey] = useState<
    "Physical" | "Virtual"
  >(AppointmentKey.PHYSICAL);

  const { data: fetchDocAvailability, isFetching: isFetchingAvailability } =
    useFetchDoctorAvailability(availabilityData);

  const transFormedData = fetchDocAvailability.map((d) => ({
    formattedDayOfWeek: d.formattedDayOfWeek,
    dayOfWeek: d.dayOfWeek,
    startTime: d.startTime,
    endTime: d.endTime,
    isAvailable: d.isAvailable,
    id: String(d.id),
  }));

  useEffect(() => {
    if (appointmentType === AppointmentKey.PHYSICAL) {
      setAvailabilityKey(AppointmentKey.PHYSICAL);
    } else {
      setAvailabilityKey(AppointmentKey.VIRTUAL);
    }
  }, [appointmentType]);

  const items: TabsProps["items"] = [
    {
      key: AppointmentKey.PHYSICAL,
      label: "In-person",
      children: (
        <InPersonAvailabilty
          data={transFormedData ?? []}
          loading={isFetchingAvailability}
        />
      ),
    },
    {
      key: AppointmentKey.VIRTUAL,
      label: "Telemedicine",
      children: (
        <TelemedicineAvailability
          data={transFormedData ?? []}
          loading={isFetchingAvailability}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-title text-lg md:text-2xl font-semibold leading-relaxed">
          Availability
        </h1>
        <p className="text-[#101010B2] text-sm">
          Let patients know when you are available to schedule appointments
        </p>
      </div>

      <SofiaTabs
        items={items}
        onChange={(key: string) => {
          setAvailabilityKey(key as AppointmentKey);
          params.set("appointment_type", key);
          router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
          });
        }}
        activeKey={availabilityKey}
      />
    </div>
  );
};

export default AvailabilitySection;
