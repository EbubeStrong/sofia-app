import React, { SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import FormInput from "@/components/FormElements/FormInput";
import { useCreateCheckin, useExistingCheckins } from "@/services/checkins";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import EmptyTable from "@/components/Tables/EmptyTable";
import { SearchIcon } from "@/assets/icons";
import { TExistingCheckinResponse } from "@/interfaces/checkin";
import { ACTIVITY, EVENT_TYPE, PRIORITY } from "@/utils/checkin-enums";
import { invalidateQuery } from "@/config/query-client";
import Loader from "@/components/Loader";

interface PatientListProps {
  setOpenNewCheckin: React.Dispatch<SetStateAction<boolean>>;
  setOpenExistingCheckin: React.Dispatch<SetStateAction<boolean>>;
}

const PatientList: React.FC<PatientListProps> = ({
  setOpenNewCheckin,
  setOpenExistingCheckin,
}) => {
  const router = useRouter();

  const [getPatientList, setGetPatientList] = useState<
    TExistingCheckinResponse["data"]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const {
    data: patientList,
    isFetching: isFetchingPatientList,
    isSuccess: isPatientListSuccess,
  } = useExistingCheckins(debouncedSearch);

  const { mutate, isPending } = useCreateCheckin();

  useEffect(() => {
    if (isPatientListSuccess) {
      setGetPatientList(patientList);
    }
  }, [isPatientListSuccess, patientList]);

  const handleDebouncedSearch = useDebouncedCallback((value) => {
    setDebouncedSearch(value);
  }, 1000);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleDebouncedSearch(value);
  };

  const handleEmergencyCheckin = () => {
    const payload = {
      emergencyPatientName: "John Doe",
      priority: PRIORITY.EMERGENCY,
      activity: ACTIVITY.URGENT_CARE,
      eventType: EVENT_TYPE.IN_PERSON,
    };
    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Emergency check-in registered successfully");
          router.push(`/check-in`);
          invalidateQuery(["checkins"]);
          setOpenExistingCheckin(false);
          return;
        },
      }
    );
  };

  const renderEmergencyButton = () => {
    return (
      <button
        type="button"
        onClick={handleEmergencyCheckin}
        className="text-sm text-[#D91F11] font-semibold border border-solid border-[#D91F11] rounded-md w-full max-w-[172px] px-4 py-2"
      >
        {isPending ? <Loader color="#D91F11" /> : "Emergency Check-in"}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-[#101010] leading-tight">
        Existing Patients
      </h2>

      <FormInput
        onChange={handleSearchValue}
        placeholder="Enter a patient name or ID"
        value={inputValue}
        allowClear
      />

      {isFetchingPatientList ? (
        <ComponentLoader label="Loading patient list..." height={250} />
      ) : (
        <React.Fragment>
          {getPatientList?.length ? (
            <>
              <div className="flex bg-[#F9F9F9] rounded-lg border p-2 md:p-3">
                <div className="flex-1">
                  <p className="text-sm text-[#101010] font-semibold">
                    Emergency
                  </p>
                  <p className="text-sm text-[#101010]/50">
                    Check-in patients who are critical
                  </p>
                </div>
                {renderEmergencyButton()}
              </div>

              <ul className="flex flex-col divide-y">
                {getPatientList?.map((list) => (
                  <li key={list?.id} className="flex items-center py-3">
                    <div className="flex-1">
                      <p className="text-base text-[#101010] font-semibold mb-1">
                        {!list?.email?.includes("emergency_")
                          ? list?.fullName
                          : "---"}
                      </p>
                      <div className="flex divide-x">
                        <p className="text-sm text-[#101010]/70 pr-3">
                          Patient ID: {list?.patientId ?? "---"}
                        </p>
                        <p className="text-sm text-[#101010]/70 px-3">
                          Date of birth:{" "}
                          {list?.dateOfBirth
                            ? dayjs(list?.dateOfBirth).format("MMMM D, YYYY")
                            : "---"}
                        </p>
                        <p className="text-sm text-[#101010]/70 pl-3">
                          {list?.gender ?? "---"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/check-in/register-patient?patient_id=${list?.patientId}`}
                      className="text-sm font-semibold !text-white px-3 py-1.5 bg-[#1175C0] rounded-md h-fit"
                    >
                      Checkin
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyTable
              icon={<SearchIcon />}
              description="Not finding who you are looking for? Try Inviting them"
              extra={
                <div className="flex justify-center gap-3 mt-2">
                  <button
                    type="button"
                    className="text-sm font-semibold text-white px-3 py-2 bg-[#1175C0] rounded-md h-fit"
                    onClick={() => {
                      setOpenNewCheckin(true);
                      setOpenExistingCheckin(false);
                    }}
                  >
                    Add New Patient
                  </button>
                  {renderEmergencyButton()}
                </div>
              }
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default PatientList;
