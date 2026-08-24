"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientVaccinations } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface VaccinesHistoryProps {
  patientId: string;
}

const VaccinesHistoryLayout: React.FC<VaccinesHistoryProps> = ({
  patientId,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientVaccines, isFetching: isFetchingVaccines } =
    usePatientVaccinations(patientId, pageNumber, pageSize);

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

  if (isFetchingVaccines) {
    return (
      <ComponentLoader label="Loading recent vaccinations..." height={380} />
    );
  }

  return (
    <div>
      {(patientVaccines?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Vaccinations History"
            desc="Chronological history of previous vaccines"
          />

          <div className="flex flex-col gap-4">
            {patientVaccines?.data?.map((item) => (
              <div
                key={item.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-2"
              >
                <p className="text-lg text-[#010101] font-semibold">
                  Influenza (Quadrivalent, Inactivated)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Date Administered
                    </p>
                    <p className="text-base text-[#010101]">2025-10-01</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">Doses</p>
                    <p className="text-base text-[#010101]">1</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">Unit</p>
                    <p className="text-base text-[#010101]">0.5 mL</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#010101]/50 uppercase">
                    Additional Note
                  </p>
                  <p className="text-base text-[#010101]">
                    No adverse reaction observed. Next dose not required this
                    season.
                  </p>
                </div>
                <p className="text-sm text-[#010101]/50">
                  May 10, 2025 at 9:30 AM
                </p>
              </div>
            ))}
          </div>

          {(patientVaccines?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientVaccines?.page ?? 1}
              pageSize={patientVaccines?.perPage ?? 10}
              total={patientVaccines?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent vaccinations found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default VaccinesHistoryLayout;
