"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DownloadIcon } from "@/assets/icons";
import DeleteButton from "@/components/Buttons/DeleteButton";
import SofiaPagination from "@/components/Pagination";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import { usePatientImaging } from "@/services/patients";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface ImagingHistoryProps {
  patientId: string;
}

const ImagingHistoryLayout: React.FC<ImagingHistoryProps> = ({ patientId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientImaging, isFetching: isFetchingImaging } =
    usePatientImaging(patientId, pageNumber, pageSize);

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

  if (isFetchingImaging) {
    return <ComponentLoader label="Loading recent diagnosis..." height={380} />;
  }

  return (
    <div>
      {(patientImaging?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Imaging History"
            desc="Chronological history of previous imaging"
          />

          <div className="flex flex-col gap-4">
            {patientImaging?.data?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 md:grid-cols-5 border border-[#212121]/10 rounded-lg p-4"
              >
                <p className="font-normal text-[#212121] text-sm">
                  Test document.pdf
                </p>
                <p className="font-normal text-[#212121] text-sm hidden md:block">
                  200KB
                </p>
                <p className="font-normal text-[#212121] text-sm hidden md:block">
                  12 NOV 2024 9:51 PM
                </p>
                <p className="font-normal text-[#212121] text-sm hidden md:block">
                  Amina Mohammed
                </p>
                <div className="flex items-center justify-end gap-5">
                  <button>
                    <DownloadIcon color="black" />
                  </button>
                  <DeleteButton onSubmitAction={() => {}} />
                </div>
              </div>
            ))}
          </div>

          {(patientImaging?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientImaging?.page ?? 1}
              pageSize={patientImaging?.perPage ?? 10}
              total={patientImaging?.totalCount}
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

export default ImagingHistoryLayout;
