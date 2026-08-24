"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientDiagnosis } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface DiagnosisHistoryProps {
  patientId: string;
}

const DiagnosisHistoryLayout: React.FC<DiagnosisHistoryProps> = ({
  patientId,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientDiagnosis, isFetching: isFetchingDiagnosis } =
    usePatientDiagnosis(patientId, pageNumber, pageSize);

  const handlePageChange = (page: number, pageSize: number) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        page_number: page.toString(),
        page_size: pageSize.toString(),
      })}`,
      {
        scroll: false,
      }
    );
  };

  if (isFetchingDiagnosis) {
    return <ComponentLoader label="Loading recent diagnosis..." height={380} />;
  }

  return (
    <div>
      {(patientDiagnosis?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Diagnosis History"
            desc="Chronological history of previous diagnosis"
          />

          <div className="flex flex-col gap-4">
            {patientDiagnosis?.data?.map((item) => (
              <div
                key={item?.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-2"
              >
                <p className="text-base text-[#101010] font-semibold">
                  Diagnosis for Cough and Fever
                </p>
                <ul className="text-sm text-[#010101]">
                  <li>
                    Acute bronchitis: Supported by recent URI, no focal lung
                    findings.
                  </li>
                  <li>
                    Pneumonia: Consider due to fever and abnormal chest X-ray.
                  </li>
                  <li>
                    Pulmonary embolism: Less likely; no risk factors or
                    pleuritic pain.Plan: Order sputum culture and repeat chest
                    X-ray if no improvement.
                  </li>
                </ul>
                <div>
                  <p className="text-sm text-[#010101]/50">
                    Provider: Dr. Sarah Johnson
                  </p>
                  <p className="text-sm text-[#010101]/50">
                    May 10, 2025 at 9:30 AM
                  </p>
                </div>
              </div>
            ))}
          </div>

          {(patientDiagnosis?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientDiagnosis?.page ?? 1}
              pageSize={patientDiagnosis?.perPage ?? 10}
              total={patientDiagnosis?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent diagnosis found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistoryLayout;
