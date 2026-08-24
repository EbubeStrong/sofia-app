import { cookies } from "next/headers";

import PatientRecordWrapper from "@/components/Patients/PatientRecordWrapper";
import VaccinesHistoryLayout from "@/layouts/vaccinations/VaccinesHistoryLayout";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { fetchPatientsById } from "@/hooks/use-server-fetchers";
import { TPatientRecordsById } from "@/interfaces/patients";

const VaccinationsHistoryModule: React.FC<{
  params: { patientId: string };
}> = async ({ params }) => {
  const { patientId } = params;
  const cookieStore = cookies();
  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;

  const patientDetails = await fetchPatientsById(patientId);

  return (
    <PatientRecordWrapper
      routeId={patientId}
      role={role}
      patientDetails={patientDetails?.data as TPatientRecordsById["data"]}
    >
      <VaccinesHistoryLayout patientId={patientId} />
    </PatientRecordWrapper>
  );
};

export default VaccinationsHistoryModule;
