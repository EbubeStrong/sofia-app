"use client";

import React, { useEffect, useState } from "react";
import type { CheckboxProps } from "antd";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import FormInputCheckbox from "@/components/FormElements/FormInputCheckbox";
import {
  availabilityData,
  endTimeOptions,
  startTimeOptions,
} from "@/utils/availability-helpers";
import AppointmentHourSection from "@/components/AppointmentHoursSection";
import { useSetAvailability } from "@/hooks/use-client-fetchers";
import Loader from "@/components/Loader";
import { IAppointmentHoursProps } from "@/interfaces/appointment-hours";
import { invalidateQuery } from "@/config/query-client";
import { queryKeys } from "@/utils/queryKeys";

type TInPersonProps = {
  data: IAppointmentHoursProps[];
  loading: boolean;
};

const InPersonAvailabilty: React.FC<TInPersonProps> = ({ data, loading }) => {
  const searchParams = useSearchParams();
  const appointmentType = searchParams.get("appointment_type") as string;

  const [hourOptions, setHourOptions] = useState(availabilityData ?? []);

  useEffect(() => {
    if (data && data?.length > 0) {
      setHourOptions(data);
    } else {
      setHourOptions(availabilityData ?? []);
    }
  }, [data]);

  const { mutate: setAvailability, isPending: isSettingAvailability } =
    useSetAvailability();

  const handleSwitchChange = (checked: boolean, id: string) => {
    const updatedOptions = hourOptions.map((item) => {
      if (item.id === id) {
        return { ...item, isAvailable: checked };
      }
      return item;
    });
    setHourOptions(updatedOptions);
  };

  const handleStartTimeChange = (value: string, id: string) => {
    const updatedOptions = hourOptions.map((item) => {
      if (item.id === id) {
        return { ...item, startTime: value };
      }
      return item;
    });
    setHourOptions(updatedOptions);
  };

  const handleEndTimeChange = (value: string, id: string) => {
    const updatedOptions = hourOptions.map((item) => {
      if (item.id === id) {
        return { ...item, endTime: value };
      }
      return item;
    });
    setHourOptions(updatedOptions);
  };

  const handleOnWeekendsChange: CheckboxProps["onChange"] = (e) => {
    const updatedOptions = hourOptions.map((item) => {
      if (
        item.formattedDayOfWeek === "Saturday" ||
        item.formattedDayOfWeek === "Sunday"
      ) {
        return { ...item, isAvailable: e.target.checked };
      }
      return item;
    });
    setHourOptions(updatedOptions);
  };

  const isWeekendAvailable = hourOptions.some(
    (item) =>
      (item.formattedDayOfWeek === "Saturday" ||
        item.formattedDayOfWeek === "Sunday") &&
      item.isAvailable
  );

  const props = {
    hourOptions,
    startTimeOptions,
    endTimeOptions,
    handleStartTimeChange,
    handleEndTimeChange,
    handleSwitchChange,
  };

  const handleAvailabilityChanges = () => {
    const options = hourOptions.map((h) => ({
      dayOfWeek: h.dayOfWeek,
      startTime: h.startTime,
      endTime: h.endTime,
      type: "Physical",
      isAvailable: h.isAvailable,
    }));

    const payload = {
      availabilities: options ?? [],
    };

    setAvailability(payload, {
      onSuccess: () => {
        toast.success("Availability set successfully");
        invalidateQuery(queryKeys.doctors.availability(appointmentType));
      },
    });
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <FormInputCheckbox
            label={
              <span className="text-base text-[#212121CC]">
                Available on weekends
              </span>
            }
            onChange={handleOnWeekendsChange}
            value={isWeekendAvailable}
          />

          <br />

          <AppointmentHourSection {...props} />

          <button
            onClick={handleAvailabilityChanges}
            className="w-full max-w-[40%] text-white bg-[#1175C0] text-base font-semibold h-[56px] rounded-lg mt-6"
          >
            {isSettingAvailability ? <Loader color="#fff" /> : "Save Changes"}
          </button>
        </>
      )}
    </div>
  );
};

export default InPersonAvailabilty;
