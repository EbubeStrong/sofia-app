import { cookies } from "next/headers";

//components
import PatientRecordWrapper from "@/components/Patients/PatientRecordWrapper";
import TreatmentHistoryLayout from "@/layouts/treatments/TreatmentHistory";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { fetchPatientsById } from "@/hooks/use-server-fetchers";
import { TPatientRecordsById } from "@/interfaces/patients";

const TreatmentsHistoryModule: React.FC<{
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
      <TreatmentHistoryLayout patientId={patientId} />
    </PatientRecordWrapper>
  );
};

export default TreatmentsHistoryModule;
