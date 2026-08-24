import { cookies } from "next/headers";

import { fetchDoctorProfileById } from "@/hooks/use-server-fetchers";
import ProfessionalDetails from "@/layouts/settings/ProfessionalDetails";
import { IDoctorResponse } from "@/interfaces/doctors";

const ProfessionalDetailsModule = async () => {
  const cookieStore = cookies();
  const doctorId = cookieStore.get("doctorId")?.value as string;

  if (!doctorId) {
    throw new Error(`doctorId is required to fetch doctor's profile`);
  }

  const doctorProfile = await fetchDoctorProfileById(doctorId);

  return (
    <ProfessionalDetails
      doctorProfile={doctorProfile?.data as IDoctorResponse["data"]}
      doctorId={doctorId}
    />
  );
};

export default ProfessionalDetailsModule;
