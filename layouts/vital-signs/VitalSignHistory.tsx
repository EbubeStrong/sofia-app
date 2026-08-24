"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import SofiaPagination from "@/components/Pagination";
import { usePatientVitals } from "@/services/patients";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";

interface VitalSignsProps {
  patientId: string;
}

const VitalSignsHistory: React.FC<VitalSignsProps> = ({ patientId }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: patientVitals, isFetching: isFetchingVitals } =
    usePatientVitals(patientId);

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

  if (isFetchingVitals) {
    return <ComponentLoader label="Loading recent vital..." height={380} />;
  }

  return (
    <div>
      {(patientVitals?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg md:text-xl text-[#101010] font-bold">
              Vitals History
            </h3>
            <p className="text-sm md:text-base text-[#010101]/70 font-normal">
              Chronological history of previous vitals recorded
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {patientVitals?.data?.map((vital) => (
              <div
                key={vital?.id}
                className="border border-[#212121]/10 rounded-lg p-3 space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 md:gap-y-4 gap-x-4">
                  <div>
                    <p className="text-sm text-[#010101]/50">Temperature</p>
                    <p className="text-base text-[#010101]">
                      {vital?.temperature ?? "---"}{" "}
                      <br className="block xl:hidden" />
                      {vital?.temperatureSource && (
                        <span className="bg-[#010101] text-white px-2 py-1 text-sm rounded-full leading-tight">
                          {vital?.temperatureSource}
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Blood Pressure</p>
                    <p className="text-base text-[#010101]">
                      {vital?.bloodPressure ?? "---"}{" "}
                      <br className="block xl:hidden" />
                      {vital?.bloodPressureSource && (
                        <span className="bg-[#010101] text-white px-2 py-1 text-sm rounded-full leading-tight">
                          {vital?.bloodPressureSource ?? "Left Arm"}
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Pulse (BPM)</p>
                    <p className="text-base text-[#010101]">
                      {vital?.pulse ?? "---"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Height</p>
                    <p className="text-base text-[#010101]">
                      {vital?.height ?? "---"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Weight</p>
                    <p className="text-base text-[#010101]">
                      {vital?.weight ?? "---"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">BMI</p>
                    <p className="text-base text-[#010101]">
                      {vital?.bmi ?? "---"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">
                      Head Circumference
                    </p>
                    <p className="text-base text-[#010101]">
                      {vital?.headCircumference || "---"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#010101]/50">Waist Size</p>
                    <p className="text-base text-[#010101]">
                      {vital?.waistSize || "---"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#010101]/50">
                        Reason for Visit
                      </p>
                      <p className="text-base text-[#010101]">
                        {vital?.reasonForVisit || "---"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#010101]/50">Nurses Note</p>
                      <p className="text-base text-[#010101]">
                        {vital?.nurseNotes || "---"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-[#010101]/50">
                      Provider: {vital?.createdBy || "---"}
                    </p>
                    <p className="text-sm text-[#010101]/50">
                      {vital?.createdAt
                        ? dayjs(vital?.createdAt).format("MMM DD, YYYY h:mm a")
                        : "---"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(patientVitals?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientVitals?.page ?? 1}
              pageSize={patientVitals?.perPage ?? 10}
              total={patientVitals?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent vitals found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default VitalSignsHistory;
