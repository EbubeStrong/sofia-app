"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaPagination from "@/components/Pagination";
import { usePatientDoctorNotes } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import HistoryHeader from "@/components/Patients/HistoryHeaders";

interface DoctorHistoryProps {
  patientId: string;
}

const DoctorHistoryLayout: React.FC<DoctorHistoryProps> = ({ patientId }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientDoctorNotes, isFetching: isFetchingNotes } =
    usePatientDoctorNotes(patientId, pageNumber, pageSize);

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

  if (isFetchingNotes) {
    return (
      <ComponentLoader label="Loading recent doctor's notes..." height={380} />
    );
  }

  return (
    <div>
      {(patientDoctorNotes?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <HistoryHeader
            title="Doctor's Note History"
            desc="Chronological history of previous notes"
          />

          <div className="flex flex-col gap-4">
            {patientDoctorNotes?.data?.map((item) => (
              <div
                key={item.id}
                className="space-y-2 border border-[#212121]/10 rounded-lg p-3"
              >
                <div className="text-base text-[#010101] font-semibold">
                  Patient reports increased shortness of breath overnight and
                  mild chest discomfort. Denies fever or cough.
                </div>
                <div>
                  <p className="text-sm text-[#010101] font-normal">
                    Assessment:
                  </p>
                  <p className="text-sm text-[#010101] font-normal">
                    Worsening respiratory symptoms likely due to fluid overload.
                    No evidence of infection.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#010101] font-normal">
                    Plan/Doctors Orders:
                  </p>
                  <ul className="list-disc ml-4 text-sm text-[#010101] font-normal">
                    <li>Administer IV furosemide 20 mg now</li>
                    <li>
                      Monitor urine output and repeat vitals every 2 hours
                    </li>
                    <li>
                      Notify doctor if SpO2 drops below 90% or if chest pain
                      worsens
                    </li>
                    <li>
                      Encourage patient to remain in semi-Fowlers position
                    </li>
                    <li>Update care team at noon rounds</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-[#010101] font-normal">
                    Interventions (Nurse):
                  </p>
                  <ul className="list-disc ml-4 text-sm text-[#010101] font-normal">
                    <li>IV furosemide administered at 09:40</li>
                    <li>Patient positioned upright; oxygen at bedside</li>
                    <li>Monitoring per orders</li>
                  </ul>
                </div>
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

          {(patientDoctorNotes?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientDoctorNotes?.page ?? 1}
              pageSize={patientDoctorNotes?.perPage ?? 10}
              total={patientDoctorNotes?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent doctor's notes found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default DoctorHistoryLayout;
