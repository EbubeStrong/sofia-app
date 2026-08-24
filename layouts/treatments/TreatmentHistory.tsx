"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientTreatments } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface TreatmentHistoryProps {
  patientId: string;
}

const TreatmentHistoryLayout: React.FC<TreatmentHistoryProps> = ({
  patientId,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientTreatments, isFetching: isFetchingTreatments } =
    usePatientTreatments(patientId, pageNumber, pageSize);

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

  if (isFetchingTreatments) {
    return (
      <ComponentLoader label="Loading recent treatments..." height={380} />
    );
  }

  return (
    <div>
      {(patientTreatments?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Treatment History"
            desc="Chronological history of previous treatments"
          />

          <div className="flex flex-col gap-4">
            {patientTreatments?.data?.map((item) => (
              <div
                key={item.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-[#010101] uppercase">
                      Brand Name
                    </p>
                    <p className="text-lg text-[#010101] font-semibold">
                      Augmentin
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101] uppercase">
                      Generic Name
                    </p>
                    <p className="text-lg text-[#010101] font-semibold">
                      Amoxicillin/Clavulanate Potassium
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Refill Number
                    </p>
                    <p className="text-base text-[#010101]">2</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">Form</p>
                    <p className="text-base text-[#010101]">Tablet</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Strength
                    </p>
                    <p className="text-base text-[#010101]">875 mg/125 mg</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Allow Substitute
                    </p>
                    <p className="text-base text-[#010101]">Yes</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Directions
                    </p>
                    <p className="text-base text-[#010101]">
                      Take 1 tablet by mouth every 12 hours for 10 days
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#010101]/50">
                  May 10, 2025 at 9:30 AM
                </p>
              </div>
            ))}
          </div>

          {(patientTreatments?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientTreatments?.page ?? 1}
              pageSize={patientTreatments?.perPage ?? 10}
              total={patientTreatments?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent treatments found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default TreatmentHistoryLayout;
