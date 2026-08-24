"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientSurgeries } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface SurgeryHistoryProps {
  patientId: string;
}

const SurgeryHistoryLayout: React.FC<SurgeryHistoryProps> = ({ patientId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientSurgery, isFetching: isFetchingSurgery } =
    usePatientSurgeries(patientId, pageNumber, pageSize);

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

  if (isFetchingSurgery) {
    return <ComponentLoader label="Loading recent surgeries..." height={380} />;
  }

  return (
    <div>
      {(patientSurgery?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Surgical History"
            desc="Chronological history of previous surgeries"
          />

          <div className="flex flex-col gap-4">
            {patientSurgery?.data?.map((item) => (
              <div
                key={item.id}
                className="border border-[#212121]/10 rounded-lg p-3"
              >
                <p className="text-lg text-[#010101] font-semibold mb-1">
                  Appendectomy
                </p>
                <p className="text-base text-[#010101]">No complications</p>
                <p className="text-sm text-[#010101]/50">
                  Provider: Dr. Sarah Johnson
                </p>
                <p className="text-sm text-[#010101]/50">
                  May 10, 2025 at 9:30 AM
                </p>
              </div>
            ))}
          </div>

          {(patientSurgery?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientSurgery?.page ?? 1}
              pageSize={patientSurgery?.perPage ?? 10}
              total={patientSurgery?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent surgeries found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default SurgeryHistoryLayout;
