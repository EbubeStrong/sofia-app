import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

import { UserBlueIcon, WindowIcon } from "@/assets/dashboard-icons";
import TagVariant from "@/components/TagVariant";
import { CheckinColumnsProps, priorityOptions } from "@/data/checkin-data";
import { useCheckinDetails } from "@/services/checkins";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import { useDropoffSummary } from "@/services/nurses";
import { BsInfoCircle } from "react-icons/bs";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import FormInputTextarea from "@/components/FormElements/FormInputTextarea";
import FormInputButton from "@/components/FormElements/FormInputButton";
import { useFetchDoctors } from "@/services/hospital";
import { TDropoffSummaryDetails } from "@/interfaces/nurses";
import { useDebouncedCallback } from "use-debounce";
import { toTitleCase } from "@/utils/getInitials";

interface SummaryProps {
  checkinInfo?: CheckinColumnsProps;
}

const summaryInfo = (data: TDropoffSummaryDetails["data"]) => [
  {
    label: "Patient Name",
    value:
      data?.patientName !== "John Doe"
        ? data?.patientName ?? "Jonathan Bradshaw"
        : "---",
  },
  {
    label: "Activity",
    value: data?.activity ?? "Checkup",
  },
  {
    label: "Event Type",
    value: data?.eventType ?? "In person",
  },
  {
    label: "Priority Level",
    value: data?.priority ?? "High risk",
  },
  {
    label: "Check-In Type",
    value: "Normal",
  },
  {
    label: "Drop-off time",
    value: "Sep 24, 15:31pm",
  },
  {
    label: "Dropped by",
    value: "Dr. Brown",
  },
  {
    label: "Time elapsed",
    value: "42 minutes",
  },
];

const DropoffSummary: React.FC<SummaryProps> = ({ checkinInfo }) => {
  const [getDropoffInfo, setGetDropoffInfo] = useState(
    {} as TDropoffSummaryDetails["data"]
  );
  const [searchValue, setSearchValue] = useState("");
  const [doctorValue, setDoctorValue] = useState<string>();

  const {
    data: dropoffInfo,
    isSuccess: isDropoffSuccess,
    isFetching: isFetchingDropoff,
  } = useDropoffSummary(checkinInfo?.id?.toString() ?? "1");

  const { data: doctors, isFetching: isFetchingDoctors } =
    useFetchDoctors(searchValue);

  useEffect(() => {
    if (isDropoffSuccess && dropoffInfo) {
      setGetDropoffInfo(dropoffInfo);
    }
  }, [dropoffInfo, isDropoffSuccess]);

  const fetchDoctors = useMemo(
    () =>
      doctors?.data?.map((doctor) => ({
        label: toTitleCase(`${doctor?.firstName} ${doctor?.lastName}`),
        value: doctor?.id.toString(),
      })),
    [doctors?.data]
  );

  const handleDoctorSearch = useDebouncedCallback((value) => {
    setSearchValue(value);
  }, 1000);

  if (isFetchingDropoff) {
    return <ComponentLoader label="Loading checkin summary..." />;
  }

  return (
    <div className="flex flex-col gap-7">
      <section>
        <h3 className="font-semibold text-base xl:text-lg mb-4">
          Patient summary
        </h3>
        <ul className="space-y-4">
          {summaryInfo(getDropoffInfo).map((info) => (
            <li key={info.label} className="grid grid-cols-1 md:grid-cols-2">
              <p className="text-sm text-[#101010]/70">{info.label}</p>
              <p className="text-base text-[#101010] font-medium">
                {info.value}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <div className="rounded-lg bg-[#F5F5F5] p-3.5">
          <h3 className="font-semibold text-base xl:text-lg mb-4">
            Reason for drop-off
          </h3>
          <p className="text-sm text-[#101010] font-normal">
            Shortness of breath on exertion, Previously diagnosed with acute
            bronchitis and treated with bronchodilators, empiric antibiotics,
            and a short course oral steroid taper
          </p>
        </div>
        <p className="text-sm text-[#101010] flex gap-1.5 items-center">
          <BsInfoCircle /> Added by Doctor Jane Doe
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-base xl:text-lg mb-4">
          Reassignment Actions
        </h3>
        <FormInputDropdown
          label="Select a doctor"
          placeholder="Choose a preferred doctor"
          options={fetchDoctors ?? []}
          className="[&_.ant-select-selector]:!h-10"
          loading={isFetchingDoctors}
          showSearch
          allowClear
          value={doctorValue}
          onChange={(value) => setDoctorValue(value)}
          onSearch={handleDoctorSearch}
          filterOption={false}
          onSelect={() => setSearchValue("")}
        />
      </section>

      <section>
        <h3 className="font-semibold text-base xl:text-lg mb-4">
          Update Priority
        </h3>
        <div className="space-y-4">
          <FormInputDropdown
            label="Select priority level"
            placeholder="Choose priority level"
            options={priorityOptions ?? []}
            className="[&_.ant-select-selector]:!h-10"
          />

          <FormInputTextarea
            label="Additional Information"
            placeholder="Add additional information to the next department"
          />
        </div>
      </section>

      <section className="mt-12">
        <FormInputButton cssProps={{ $height: "48px" }}>
          Confirm Reassignment
        </FormInputButton>
      </section>
    </div>
  );
};

export default DropoffSummary;
