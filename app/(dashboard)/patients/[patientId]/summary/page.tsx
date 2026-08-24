import { cookies } from "next/headers";

import PatientRecordWrapper from "@/components/Patients/PatientRecordWrapper";
import SummaryTimelineLayout from "@/layouts/dashboard/SummaryTimeline";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { fetchPatientsById } from "@/hooks/use-server-fetchers";
import { TPatientRecordsById } from "@/interfaces/patients";

type Props = {
  params: { patientId: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

const SummaryModule: React.FC<Props> = async ({ params, searchParams }) => {
  const { patientId } = params;
  const cookieStore = cookies();
  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;

  const patientDetails = await fetchPatientsById(patientId);
  const getParam = (key: string) => {
    const value = searchParams?.[key];
    return Array.isArray(value) ? value[0] : value;
  };
  const fallbackDetails = {
    patientId,
  };

  return (
    <PatientRecordWrapper
      routeId={patientId}
      role={role}
      patientDetails={
        (patientDetails?.data as TPatientRecordsById["data"]) ??
        fallbackDetails
      }
    >
      <SummaryTimelineLayout patientId={patientId} />
    </PatientRecordWrapper>
  );
};

export default SummaryModule;

