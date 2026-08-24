"use client";

import React, {
  SetStateAction,
  Suspense,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ColumnType } from "antd/es/table";
import { TabsProps } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import SofiaTabs from "@/components/SofiaTabs";
import { NurseQueueColumns } from "@/data/nurses-note-data";
import { TNurseQueueData, TNursingQueueResp } from "@/interfaces/nurses";
import { formatFullName, toTitleCase } from "@/utils/getInitials";
import { useAssignNurse, useFetchNurses } from "@/services/nurses";
import Loader from "@/components/Loader";
import { invalidateQuery } from "@/config/query-client";
import SofiaDropdown from "@/components/Dropdowns";
import SofiaDrawers from "@/components/Drawers";
import TakeVitalsRecordForm from "@/components/RecordVitalsForm";
import CheckinSummary from "../checkin/CheckinSummary";
import DropoffSummary from "./DropoffSummary";

type TQueueTableProps = {
  tableData: TNursingQueueResp["data"];
  type: "queue" | "dashboard";
  activeKey: string;
  setActiveKey: React.Dispatch<SetStateAction<string>>;
  loading: boolean;
  isLead: boolean;
};

const NursingQueueTable: React.FC<TQueueTableProps> = ({
  tableData,
  type,
  activeKey,
  setActiveKey,
  loading,
  isLead,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  // states
  const [nurseValue, setNurseValue] = useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [loadingNurses, setLoadingNurses] = useState<Record<string, boolean>>(
    {}
  );
  const [openVitalsForm, setOpenVitalsForm] = useState(false);
  const [openDropOff, setOpenDropOff] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const [checkinInfo, setCheckinInfo] = useState<string>("");
  const [nurseData, setNurseData] = useState({} as TNurseQueueData);

  const { data: nurses, isFetching: isFetchingNurses } = useFetchNurses(
    isLead,
    searchValue
  );

  const { mutateAsync: assignNurseAsync } = useAssignNurse();

  const fetchNurses = useMemo(
    () =>
      nurses?.data?.map((nurse) => ({
        label: toTitleCase(`${nurse?.firstName} ${nurse?.lastName}`),
        value: nurse?.id.toString(),
      })),
    [nurses?.data]
  );

  useEffect(() => {
    if (!tableData?.data) return;

    const prefilled = tableData?.data?.reduce((acc, queue) => {
      if (queue.assignedTo?.id) {
        acc[queue.id] = queue.assignedTo.id;
      }
      return acc;
    }, {} as Record<string, string>);

    setNurseValue(prefilled);
  }, [tableData?.data]);

  const handleQueueChange = (key: string) => {
    setActiveKey(key);
    params.set("q", key);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleNurseSearch = useDebouncedCallback((value) => {
    setSearchValue(value);
  }, 1000);

  const setLoadingTrue = useCallback((queueId: string) => {
    setLoadingNurses((prev) => ({
      ...prev,
      [queueId]: true,
    }));
  }, []);

  const setLoadingFalse = useCallback((queueId: string) => {
    setLoadingNurses((prev) => ({
      ...prev,
      [queueId]: false,
    }));
  }, []);

  const handleAssignNurse = useCallback(
    async (nurseId: string, queueId: string) => {
      setLoadingTrue(queueId);

      const payload = {
        nurseId,
        queueMovementId: queueId,
      };

      try {
        await assignNurseAsync({ body: payload });

        toast.success("Nurse assigned successfully");

        invalidateQuery(["nurses_queue"]);
        invalidateQuery(["nurses"]);
      } catch {
        toast.error("Failed to assign nurse");
      } finally {
        setLoadingFalse(queueId);
      }
    },
    [assignNurseAsync, setLoadingTrue, setLoadingFalse]
  );

  const nursesQueueData = useMemo(() => {
    if (!tableData?.data?.length) return [];

    return tableData.data.map((queue) => {
      const consultation = queue.patientConsultation;
      const patient = queue.patient;
      const doctor = queue.doctorAssignedTo;

      return {
        key: queue.id,
        checkin: consultation?.consultationDate
          ? dayjs(consultation.consultationDate).format("MMM D, YYYY, h:mm a")
          : "---",
        patientName: patient?.firstName
          ? formatFullName(`${patient.firstName} ${patient.lastName}`)
          : "---",
        activity: consultation?.activity ?? "---",
        priority: consultation?.priority ?? "---",
        complaint: consultation?.reasonForVisit || "---",
        id: queue.id,
        patientId: patient?.patientId,
        doctorAssigned: doctor?.firstName
          ? formatFullName(`${doctor?.firstName} ${doctor?.lastName}`)
          : "---",
        assignTo: (
          <FormInputDropdown
            placeholder="Select nurse"
            options={fetchNurses ?? []}
            className="[&_.ant-select-selector]:!h-10"
            loading={isFetchingNurses}
            showSearch
            allowClear
            value={nurseValue[queue.id]}
            onChange={(value) => {
              setNurseValue((prev) => ({
                ...prev,
                [queue.id]: value,
              }));
            }}
            onSearch={handleNurseSearch}
            filterOption={false}
            onSelect={() => setSearchValue("")}
          />
        ),
        action: (
          <button
            type="button"
            onClick={() => handleAssignNurse(nurseValue[queue?.id], queue?.id)}
            className="text-sm w-full text-white font-semibold bg-[#1175C0] rounded-lg px-3 py-2 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!nurseValue[queue?.id] || loadingNurses[queue.id]}
          >
            {loadingNurses[queue.id] ? <Loader color="#fff" /> : "Assign"}
          </button>
        ),
        action1: (
          <SofiaDropdown
            items={[
              {
                label: (
                  <button
                    onClick={() => {
                      setNurseData(queue);
                      setOpenVitalsForm(true);
                    }}
                    className="w-full flex justify-start"
                    type="button"
                  >
                    Take Vitals
                  </button>
                ),
                key: 2,
              },
              {
                label: (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckinInfo(consultation?.id?.toString());
                      setOpenSummary(true);
                    }}
                  >
                    View Checkin Summary
                  </button>
                ),
                key: 1,
              },
              {
                label: (
                  <Link
                    href={`/patients/${patient?.patientId}/summary`}
                    passHref
                  >
                    View Patient Profile
                  </Link>
                ),
                key: 3,
              },
              ...(isLead
                ? [
                    {
                      label: (
                        <button
                          onClick={() => setOpenDropOff(true)}
                          type="button"
                        >
                          View Dropoff summary
                        </button>
                      ),
                      key: 4,
                    },
                  ]
                : []),
            ]}
            label={
              <button type="button">
                <BsThreeDotsVertical />
              </button>
            }
          />
        ),
      };
    });
  }, [
    fetchNurses,
    handleAssignNurse,
    handleNurseSearch,
    isFetchingNurses,
    isLead,
    loadingNurses,
    nurseValue,
    tableData.data,
  ]);

  const renderTable = () => {
    return (
      <Suspense>
        <SofiaTable
          columns={NurseQueueColumns(isLead) as ColumnType[]}
          dataSource={nursesQueueData ?? []}
          loading={loading}
          currentPage={tableData?.page}
          pageSize={tableData?.perPage}
          pageTotal={tableData?.totalCount ?? 0}
          scroll={{ x: "max-content" }}
          hasPagination={type === "queue"}
        />
      </Suspense>
    );
  };

  const items: TabsProps["items"] = [
    isLead && {
      key: "unassigned",
      label: "Unassigned",
      children: renderTable(),
    },
    {
      key: "assigned",
      label: "Assigned",
      children: renderTable(),
    },
    isLead && {
      key: "drop-off",
      label: "Drop-Offs",
      children: renderTable(),
    },
    {
      key: "closed",
      label: "Closed",
      children: renderTable(),
    },
  ].filter(Boolean) as TabsProps["items"];

  return (
    <div className="flex flex-col gap-5 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleQueueChange}
        tabBarExtraContent={
          type === "dashboard" && (
            <button
              onClick={() => router.push(`/nurses`)}
              type="button"
              className="text-base text-[#667085] font-semibold px-4 py-1 border rounded-md"
            >
              View all
            </button>
          )
        }
      />

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">Dropoff Summary</p>
            <p className="text-sm text-[#101010]/50">
              Basic dropoff information summary
            </p>
          </>
        }
        placement="right"
        open={openDropOff}
        onClose={() => setOpenDropOff(false)}
        width={600}
        maskClosable={false}
        zIndex={1005}
      >
        <DropoffSummary />
      </SofiaDrawers>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">Vital Signs</p>
            <p className="text-sm text-[#101010]/50">
              Complete this form to register vital signs
            </p>
          </>
        }
        placement="right"
        open={openVitalsForm}
        onClose={() => setOpenVitalsForm(false)}
        width={600}
        maskClosable={false}
        zIndex={1005}
      >
        <TakeVitalsRecordForm
          nurseData={nurseData}
          setOpenVitalsForm={setOpenVitalsForm}
        />
      </SofiaDrawers>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">Check-in Summary</p>
            <p className="text-sm text-[#101010]/50">
              Basic patient information summary
            </p>
          </>
        }
        placement="right"
        open={openSummary}
        onClose={() => setOpenSummary(false)}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <CheckinSummary checkinId={checkinInfo} />
      </SofiaDrawers>
    </div>
  );
};

export default NursingQueueTable;
