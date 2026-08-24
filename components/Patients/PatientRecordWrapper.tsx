
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PatientTab, TPatientRecordsById } from "@/interfaces/patients";
import PatientRecordNav from "./PatientRecordNav";
import PatientSummaryCard from "./PatientSummaryCard";
import PatientMedicalCards from "./PatientMedicalHistory";
import PatientRecordTopMenu from "./PatientRecordTopMenu";
import PatientPrescriptionList from "./PatientPrescriptionList";
import PatientAllergyList from "./PatientAllergyList";
import PatientVaccinationList from "./PatientVaccinationList";
import { useFetchPatientsDataByTab } from "@/services/patients";
import PatientLogList from "./PatientlogList";

interface RecordsProps {
  children: React.ReactNode;
  routeId: string;
  role: string;
  patientDetails: Partial<TPatientRecordsById["data"]>;
}



type PaginationState = Record<
  PatientTab,
  { page: number; size: number }
>;

const PatientRecordWrapper = ({
  routeId,
  role,
  patientDetails,
}: RecordsProps) => {
 const pathname = usePathname();
const router = useRouter();
const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<PatientTab>(
  (searchParams.get("q") as PatientTab) ?? "prescription"
);
  const [pagination, setPagination] = useState<PaginationState>({
  prescription: { page: 1, size: 10 },
  allergies: { page: 1, size: 10 },
  vaccinations: { page: 1, size: 10 },
  logs: { page: 1, size: 10 },
});
const page = Number(searchParams.get("page") ?? 1);
const size = Number(searchParams.get("size") ?? 10);

const currentPagination = pagination[activeTab];

const updateURL = (
  updates: Partial<{
    q: PatientTab;
    page: number;
    size: number;
  }>
) => {
  const params = new URLSearchParams(searchParams.toString());

  if (updates.q) params.set("q", updates.q);
  if (updates.page !== undefined)
    params.set("page", String(updates.page));
  if (updates.size !== undefined)
    params.set("size", String(updates.size));

  router.replace(`${pathname}?${params.toString()}`, {
    scroll: false,
  });
};


const onPageChange = (page: number) => {
  updateURL({ page });
};


  useEffect(() => {
  const q = searchParams.get("q") as PatientTab | null;

  if (q && q !== activeTab) {
    setActiveTab(q);
  }
}, [searchParams]);

useEffect(() => {
  setPagination((prev) => ({
    ...prev,
    [activeTab]: { page, size },
  }));
}, [activeTab, page, size]);


  const {
    data,
    isFetching,
    // isError,
  } = useFetchPatientsDataByTab(routeId, activeTab, currentPagination.page, currentPagination.size);

  const renderActiveTab = () => {
  const commonProps = {
    data,
    loading: isFetching,
    pagination: currentPagination,
    onPageChange
  };

  switch (activeTab) {
    case "prescription":
      return <PatientPrescriptionList {...commonProps} />;

    case "allergies":
      return <PatientAllergyList {...commonProps} />;

    case "vaccinations":
      return <PatientVaccinationList {...commonProps} />;

    case "logs":
      return <PatientLogList {...commonProps} />;

    default:
      return null;
  }
};


  return (
    <div className="flex flex-col gap-5">
      <PatientRecordNav patientId={routeId} role={role} />

      <PatientSummaryCard
        bg="dark"
        type="profile"
        patientDetails={patientDetails}
      />

      <PatientMedicalCards patientDetails={patientDetails} />

      <PatientRecordTopMenu activeTab={activeTab} updateURL={updateURL}/>

      {renderActiveTab()}
    </div>
  );
};

export default PatientRecordWrapper;

