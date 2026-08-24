import PatientModuleLayout from "@/layouts/patients/PatientLayout";
import {
  fetchAllPatients,
  fetchPatientStats,
} from "@/hooks/use-server-fetchers";
import { TAllPatientsResp, TPatientStatsProps } from "@/interfaces/patients";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    q?: string;
  };
};

const PatientsModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;
  const query = searchParams.q;

  const params = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    ...(query && { searchTerm: query ?? "" }),
  });

  const patients = await fetchAllPatients(params);

  const statistics = await fetchPatientStats();

  return (
    <PatientModuleLayout
      initialData={patients?.data as TAllPatientsResp["data"]}
      statsData={statistics?.data as TPatientStatsProps["data"]}
    />
  );
};

export default PatientsModule;
