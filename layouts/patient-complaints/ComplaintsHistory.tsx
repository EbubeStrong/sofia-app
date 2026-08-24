"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ComponentLoader from "@/components/Loader/ComponentLoader";
import SofiaPagination from "@/components/Pagination";
import HistoryHeader from "@/components/Patients/HistoryHeaders";
import EmptyTable from "@/components/Tables/EmptyTable";
import { usePatientComplaint } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";

interface ComplaintHistoryProps {
  patientId: string;
}

const ComplaintsHistory: React.FC<ComplaintHistoryProps> = ({ patientId }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: patientComplaints, isFetching: isFetchingComplaints } =
    usePatientComplaint(patientId);

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

  if (isFetchingComplaints) {
    return (
      <ComponentLoader label="Loading recent complaints..." height={380} />
    );
  }

  return (
    <div>
      {(patientComplaints?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Complaints History"
            desc="Chronological history of previous complaints"
          />

          <div className="flex flex-col gap-4">
            {patientComplaints?.data?.map((item) => (
              <div
                key={item?.id}
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

          {(patientComplaints?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientComplaints?.page ?? 1}
              pageSize={patientComplaints?.perPage ?? 10}
              total={patientComplaints?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent complaints found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default ComplaintsHistory;
