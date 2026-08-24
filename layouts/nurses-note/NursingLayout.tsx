"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { DatePickerProps } from "antd";

import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { SearchGrayIcon } from "@/assets/icons";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { activityOptions, priorityOptions } from "@/data/checkin-data";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import NursingQueueTable from "./NursingQueueTable";
import { TNursingQueueResp } from "@/interfaces/nurses";
import { useFetchNurses, useFetchNursingQueue } from "@/services/nurses";
import { toTitleCase } from "@/utils/getInitials";

interface NursingModuleLayoutProps {
  initialData: TNursingQueueResp["data"];
  isLead: boolean;
  tabQuery: string;
}

const NursingModuleLayout: React.FC<NursingModuleLayoutProps> = ({
  initialData,
  isLead,
  tabQuery,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchQuery = searchParams.get("search") as string;
  const priorityQuery = searchParams.get("priority") as string;
  const activityQuery = searchParams.get("activity") as string;
  const nurseAssignedQuery = searchParams.get("nurseId") as string;
  const dateQuery = searchParams.get("date") as string;

  const [activeKey, setActiveKey] = useState<string>(
    searchParams.get("q") ?? tabQuery
  );
  const [searchValue, setSearchValue] = useState("");

  const { data: nursingQueue, isFetching: isFetchingQueue } =
    useFetchNursingQueue(
      initialData,
      activeKey,
      tabQuery,
      searchQuery,
      priorityQuery,
      activityQuery,
      nurseAssignedQuery,
      dateQuery
    );

  const { data: nurses, isFetching: isFetchingNurses } = useFetchNurses(
    isLead,
    searchValue
  );

  const fetchNurses = useMemo(
    () =>
      nurses?.data?.map((nurse) => ({
        label: toTitleCase(`${nurse?.firstName} ${nurse?.lastName}`),
        value: nurse?.id.toString(),
      })),
    [nurses?.data]
  );

  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery && urlQuery !== activeKey) {
      setActiveKey(urlQuery);
    }
  }, [activeKey, searchParams]);

  const handleNurseSearch = useDebouncedCallback((value) => {
    setSearchValue(value);
  }, 1000);

  const handleDebouncedSearch = useDebouncedCallback((value) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        search: value,
      })}`,
      {
        scroll: false,
      }
    );
  }, 1000);

  const handlePriorityFilter = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        priority: value,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handleActivityFilter = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        activity: value,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handleNurseAssignedFilter = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        nurseId: value,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handleDateFilter: DatePickerProps["onChange"] = (_, dateString) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        date: dateString,
      })}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl text-[#101010] font-semibold">
            Nursing Queue
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            Comprehensive patient flow management and metrics
          </p>
        </div>
      </section>

      <section className="border border-solid border-dark/20 rounded-lg p-4 pb-5 bg-white">
        <div className="mb-4">
          <p className="text-base text-[#101010] font-semibold">Filter</p>
          <p className="text-base text-[#101010]/50">
            Filter and search patients by various criterias
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-full max-w-full md:max-w-[35%]">
            <FormInput
              placeholder="Search by name or patient ID"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDebouncedSearch(e.target.value)
              }
              prefix={<SearchGrayIcon />}
              cssProps={{ $height: "38px" }}
              allowClear
            />
          </div>
          <div className={`hidden md:grid grid-cols-4 gap-4`}>
            <FormInputDropdown
              placeholder="Select priority"
              options={priorityOptions}
              onChange={handlePriorityFilter}
              allowClear
              value={priorityQuery}
            />
            <FormInputDropdown
              placeholder="Select activity"
              options={activityOptions}
              onChange={handleActivityFilter}
              allowClear
              value={activityQuery}
            />
            {isLead && (
              <FormInputDropdown
                placeholder="Select nurse assigned"
                options={fetchNurses ?? []}
                onChange={handleNurseAssignedFilter}
                loading={isFetchingNurses}
                showSearch
                allowClear
                value={nurseAssignedQuery}
                onSearch={handleNurseSearch}
                filterOption={false}
                onSelect={() => setSearchValue("")}
              />
            )}
            <FormInputDate onChange={handleDateFilter} format={"YYYY-MM-DD"} />
          </div>
        </div>
      </section>

      <NursingQueueTable
        tableData={nursingQueue as TNursingQueueResp["data"]}
        type="queue"
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        loading={isFetchingQueue}
        isLead={isLead}
      />
    </div>
  );
};

export default NursingModuleLayout;
