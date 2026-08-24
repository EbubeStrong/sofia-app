import React from "react";

import AvailabilitySection from "@/layouts/settings/AvailabilityModule";
import { fetchDoctorAvailability } from "@/hooks/use-server-fetchers";
import { AppointmentKey, TDoctorAvailabilityResp } from "@/interfaces/doctors";

type AvailabilityProps = {
  searchParams: {
    appointment_type?: string;
  };
};

const AvailabilityModule: React.FC<AvailabilityProps> = async ({
  searchParams,
}) => {
  const appointmentType = searchParams.appointment_type as string;

  const params = new URLSearchParams({
    appointmentType: appointmentType || AppointmentKey.PHYSICAL,
  });

  const availability = await fetchDoctorAvailability(params);

  return (
    <AvailabilitySection
      availabilityData={availability?.data as TDoctorAvailabilityResp["data"]}
    />
  );
};

export default AvailabilityModule;
