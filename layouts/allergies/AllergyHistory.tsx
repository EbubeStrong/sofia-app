"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientAllergies } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface AllergyHistoryProps {
  patientId: string;
}

const AllergyHistoryLayout: React.FC<AllergyHistoryProps> = ({ patientId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientAllergies, isFetching: isFetchingAllergies } =
    usePatientAllergies(patientId, pageNumber, pageSize);

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

  if (isFetchingAllergies) {
    return <ComponentLoader label="Loading recent allergies..." height={380} />;
  }

  return (
    <div>
      {(patientAllergies?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Allergies History"
            desc="Chronological history of previous allergies"
          />

          <div className="flex flex-col gap-4">
            {patientAllergies?.data?.map((item) => (
              <div
                key={item.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-2"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-[#010101] leading-tight uppercase">
                      DRUG
                    </p>
                    <p className="text-lg text-[#010101] font-semibold">
                      Penicillin
                    </p>
                  </div>
                  <p className="w-fit h-fit px-2.5 py-1 text-sm text-[#D33B52] bg-[#D33B52]/10 rounded-lg">
                    Severe
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Condition
                    </p>
                    <p className="text-base text-[#010101]">
                      Asthma exacerbation
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Patient Instruction
                    </p>
                    <p className="text-base text-[#010101]">
                      Avoid all penicillins; carry epinephrine auto-injector
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#010101]/50 uppercase">
                      Reaction
                    </p>
                    <p className="text-base text-[#010101]">
                      Anaphylaxis (hives, shortness of breath, hypotension)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#010101]/50">
                  May 10, 2025 at 9:30 AM
                </p>
              </div>
            ))}
          </div>

          {(patientAllergies?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientAllergies?.page ?? 1}
              pageSize={patientAllergies?.perPage ?? 10}
              total={patientAllergies?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent allergies found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default AllergyHistoryLayout;
