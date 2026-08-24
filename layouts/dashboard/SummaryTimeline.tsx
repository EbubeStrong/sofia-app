"use client";

import { Fragment } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SofiaTimeline from "@/components/Timeline";
import { DotIcon } from "@/assets/icons";
import { usePatientActivity } from "@/services/patients";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import SofiaPagination from "@/components/Pagination";
import { paramsObjectToQueryString } from "@/utils/params-to-query";

interface SummaryTimelineProps {
  patientId: string;
}

const SummaryTimelineLayout: React.FC<SummaryTimelineProps> = ({
  patientId,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "prescription";

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const { data: patientActivity, isFetching: isFetchingActivity } =
    usePatientActivity(patientId, pageNumber, pageSize);

  if (activeTab !== "logs") {
    return null;
  }

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

  const timelineItems = patientActivity?.data?.map((activity) => ({
    color: "#1175C0",
    dot: <DotIcon />,
    children: (
      <Fragment>
        <p className="text-base font-semibold text-[#101010] mb-1">
          {activity.activityType ?? "---"}
        </p>
        <p className="text-sm text-[#010101]">{activity?.title ?? "---"}</p>
        <p className="text-[#010101]/50 text-sm">
          Provider: {activity?.provider ?? "---"}
        </p>
        <p className="text-[#010101]/50 text-sm">{activity?.formattedDate}</p>
      </Fragment>
    ),
  }));

  if (isFetchingActivity) {
    return <ComponentLoader label="Loading recent activity..." height={380} />;
  }

  return (
    <div>
      {(patientActivity?.data?.length ?? 0) > 0 ? (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg md:text-xl text-[#101010] font-bold">
              Recent Activity
            </h3>
            <p className="text-sm md:text-base text-[#010101]/70 font-normal">
              Chronological history of treatments, diagnoses, and interventions
            </p>
          </div>

          <SofiaTimeline items={timelineItems ?? []} />

          {(patientActivity?.data?.length ?? 0) > 10 && (
            <SofiaPagination
              onChange={handlePageChange}
              align="end"
              current={patientActivity?.page ?? 1}
              pageSize={patientActivity?.perPage ?? 10}
              total={patientActivity?.totalCount}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyTable
            message="No recent activity found"
            description="Actions on the records appear here"
          />
        </div>
      )}
    </div>
  );
};

export default SummaryTimelineLayout;
