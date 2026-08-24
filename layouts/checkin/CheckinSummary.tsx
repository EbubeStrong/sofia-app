import React, { useState, useEffect } from "react";
import Link from "next/link";

import { UserBlueIcon, WindowIcon } from "@/assets/dashboard-icons";
import TagVariant from "@/components/TagVariant";
import { CheckinColumnsProps } from "@/data/checkin-data";
import { useCheckinDetails } from "@/services/checkins";
import { TCheckinSummaryById } from "@/interfaces/checkin";
import ComponentLoader from "@/components/Loader/ComponentLoader";

interface SummaryProps {
  checkinId: string;
}

const summaryInfo = (data: TCheckinSummaryById["data"]) => [
  {
    label: "Patient Name",
    value:
      data?.patientName !== "John Doe" ? data?.patientName ?? "---" : "---",
  },
  {
    label: "Activity",
    value: data?.activity ?? "---",
  },
  {
    label: "Event Type",
    value: data?.eventType ?? "---",
  },
  {
    label: "Priority Level",
    value: data?.priority ?? "---",
  },
  {
    label: "Check-In Date",
    value: data?.checkInDate ?? "---",
  },
  {
    label: "Check-In Time",
    value: data?.checkedInTime ?? "---",
  },
  {
    label: "Current queue",
    value: data?.currentQueue ? (
      <TagVariant
        label={data?.currentQueue}
        className="!text-sm !rounded-full !py-1 !px-3"
      />
    ) : (
      "---"
    ),
  },
  {
    label: "Forwarded to",
    value: data?.forwardTo ? (
      <TagVariant
        label={data?.forwardTo}
        className="!text-sm !rounded-full !py-1 !px-3"
      />
    ) : (
      "---"
    ),
  },
];

const CheckinSummary: React.FC<SummaryProps> = ({ checkinId }) => {
  const [getCheckinInfo, setGetCheckinInfo] = useState(
    {} as TCheckinSummaryById["data"]
  );

  const {
    data: checkinDetails,
    isSuccess: isCheckinSuccess,
    isFetching: isFetchingCheckin,
  } = useCheckinDetails(checkinId);

  useEffect(() => {
    if (isCheckinSuccess && checkinDetails) {
      setGetCheckinInfo(checkinDetails);
    }
  }, [checkinDetails, isCheckinSuccess]);

  if (isFetchingCheckin) {
    return <ComponentLoader label="Loading checkin summary..." />;
  }

  return (
    <div className="flex flex-col gap-7">
      <section>
        <div className="mb-6 flex justify-center">
          <UserBlueIcon />
        </div>
        <div className="flex flex-col gap-1">
          {getCheckinInfo?.patientEmail?.includes("emergency_") ? (
            <div className="flex justify-center">
              <TagVariant
                label="Emergency"
                className="!text-xl !rounded-full !py-1 !px-3 w-fit text-center font-semibold"
                color="red"
              />
            </div>
          ) : (
            <h2 className="text-xl text-[#101010] font-semibold text-center leading-tight">
              {getCheckinInfo?.patientName ?? "---"}
            </h2>
          )}

          {!getCheckinInfo?.patientEmail?.includes("emergency_") && (
            <p className="text-sm text-[#101010] text-center">
              {getCheckinInfo?.patientEmail}
            </p>
          )}
          <Link
            href={`/patients/${getCheckinInfo?.patientId}/summary`}
            className="flex gap-2 items-center justify-center text-sm !text-[#101010] text-center"
          >
            Open Profile <WindowIcon />
          </Link>
        </div>
      </section>

      <ul className="space-y-4">
        {summaryInfo(getCheckinInfo).map((info) => (
          <li key={info.label} className="grid grid-cols-1 md:grid-cols-2">
            <p className="text-base text-[#101010]/70">{info.label}</p>
            <p className="text-base text-[#101010] font-medium">{info.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckinSummary;
