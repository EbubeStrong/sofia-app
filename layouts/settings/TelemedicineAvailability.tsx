import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import {
  endTimeOptions,
  startTimeOptions,
  availabilityData,
} from "@/utils/availability-helpers";
import AppointmentHourSection from "@/components/AppointmentHoursSection";
import { IAppointmentHoursProps } from "@/interfaces/appointment-hours";
import { useSetAvailability } from "@/hooks/use-client-fetchers";
import Loader from "@/components/Loader";
import { invalidateQuery } from "@/config/query-client";
import { queryKeys } from "@/utils/queryKeys";

type TVirtualProps = {
  data: IAppointmentHoursProps[];
  loading: boolean;
};

const TelemedicineAvailability: React.FC<TVirtualProps> = ({
  data,
  loading,
}) => {
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
      type: "Virtual",
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

export default TelemedicineAvailability;
