"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientTests } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";

interface LabTestHistoryProps {
  patientId: string;
}

const LabTestHistoryLayout: React.FC<LabTestHistoryProps> = ({ patientId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientTests, isFetching: isFetchingTests } = usePatientTests(
    patientId,
    pageNumber,
    pageSize
  );

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

  if (isFetchingTests) {
    return <ComponentLoader label="Loading recent tests..." height={380} />;
  }

  return (
    <div>
      {(patientTests?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg md:text-xl text-[#101010] font-bold">
              Test History
            </h3>
            <p className="text-sm md:text-base text-[#010101]/70 font-normal">
              Chronological history of previous laboratory tests
            </p>
          </div>

          <div className="space-y-5">
            {patientTests?.data?.map((item) => (
              <div
                key={item?.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-3 md:space-y-2"
              >
                <div>
                  <p className="text-sm text-[#010101] uppercase">
                    Lab test order
                  </p>
                  <p className="text-base text-[#101010] font-semibold">
                    Complete Blood Count (CBC)
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                  <div>
                    <p className="text-sm text-[#010101]/50">Type</p>
                    <p className="text-base text-[#010101]">Hematology</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Specimen</p>
                    <p className="text-base text-[#010101]">Blood (venous)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">
                      Patient Instruction
                    </p>
                    <p className="text-base text-[#010101]">
                      Fast for 8 hours before blood draw
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Service</p>
                    <p className="text-base text-[#010101]">In House Lab</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Comment</p>
                    <p className="text-base text-[#010101]">
                      Evaluate for anemia due to recent fatigue
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#010101]/50">
                  May 10, 2025 at 9:30 AM
                </p>
              </div>
            ))}
          </div>

          {(patientTests?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientTests?.page ?? 1}
              pageSize={patientTests?.perPage ?? 10}
              total={patientTests?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent tests found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default LabTestHistoryLayout;
