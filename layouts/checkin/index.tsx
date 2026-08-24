"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { SearchGrayIcon } from "@/assets/icons";
import FormInputDate from "@/components/FormElements/FormInputDate";
import CheckinTableSection from "@/components/CheckinTableSection";
import SofiaDrawers from "@/components/Drawers";
import NewPatientForm from "@/components/NewPatientForm";
import SofiaModal from "@/components/SofiaModals";
import CheckinSuccessLayout from "./CheckinSuccess";
import PatientList from "./PatientList";
import { TCheckinsResp } from "@/interfaces/checkin";
import { useFetchCheckins } from "@/services/checkins";
import {
  eventTypeOptions,
  priorityOptions,
  visitStatusOption,
} from "@/data/checkin-data";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { DatePickerProps } from "antd";

interface CheckinLayoutProps {
  initialData: TCheckinsResp["data"];
}

const CheckinLayoutModule: React.FC<CheckinLayoutProps> = ({ initialData }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchQuery = searchParams.get("search") as string;
  const priorityQuery = searchParams.get("priority") as string;
  const visitStatusQuery = searchParams.get("visitStatus") as string;
  const eventTypeQuery = searchParams.get("eventType") as string;
  const dateQuery = searchParams.get("date") as string;

  const [openNewCheckin, setOpenNewCheckin] = useState(false);
  const [openCheckinSuccess, setOpenCheckinSuccess] = useState(false);
  const [openExistingCheckin, setOpenExistingCheckin] = useState(false);
  const [activeKey, setActiveKey] = useState<string>(
    searchParams.get("q") ?? "TodaysEmergency"
  );

  const { data: checkins, isFetching: isFetchingCheckins } = useFetchCheckins(
    initialData,
    activeKey,
    searchQuery,
    priorityQuery,
    visitStatusQuery,
    eventTypeQuery,
    dateQuery
  );

  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery && urlQuery !== activeKey) {
      setActiveKey(urlQuery);
    }
  }, [activeKey, searchParams]);

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

  const handleVisitStatusFilter = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        visitStatus: value,
      })}`,
      {
        scroll: false,
      }
    );
  };

  const handleEventTypeFilter = (value: string) => {
    const params = Object.fromEntries(searchParams.entries());
    router.replace(
      `${pathname}${paramsObjectToQueryString({
        ...params,
        eventType: value,
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
            Check-in and Registration
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            Search for existing patients or register new ones to begin their
            visit
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setOpenNewCheckin(true)}
            className="text-base text-white bg-[#1175C0] font-semibold rounded-lg py-3 px-5 w-fit h-fit"
          >
            New Patient
          </button>
          <button
            type="button"
            onClick={() => setOpenExistingCheckin(true)}
            className="text-base text-[#1175C0] font-semibold bg-white border border-solid border-[#1175C0] rounded-lg py-3 px-5 w-fit h-fit"
          >
            Existing Patient
          </button>
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
              placeholder="Search by name or patientId"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDebouncedSearch(e.target.value)
              }
              prefix={<SearchGrayIcon />}
              cssProps={{ $height: "38px" }}
              allowClear
            />
          </div>
          <div className="hidden md:grid grid-cols-4 gap-4">
            <FormInputDropdown
              placeholder="Select priority"
              options={priorityOptions}
              onChange={handlePriorityFilter}
              allowClear
              value={priorityQuery}
            />
            <FormInputDropdown
              placeholder="Select visit status"
              options={visitStatusOption}
              onChange={handleVisitStatusFilter}
              allowClear
              value={visitStatusQuery}
            />
            <FormInputDropdown
              placeholder="Select event type"
              options={eventTypeOptions}
              onChange={handleEventTypeFilter}
              allowClear
              value={eventTypeQuery}
            />
            <FormInputDate onChange={handleDateFilter} format={"YYYY-MM-DD"} />
          </div>
        </div>
      </section>

      <section className="border border-solid border-dark/20 rounded-lg p-4 bg-white">
        <CheckinTableSection
          tableData={checkins as TCheckinsResp["data"]}
          loading={isFetchingCheckins}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          type="checkin"
        />
      </section>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">Add New Patient</p>
            <p className="text-sm text-[#101010]/50">
              Basic patient demographics and contact information
            </p>
          </>
        }
        placement="right"
        open={openNewCheckin}
        onClose={() => setOpenNewCheckin(false)}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <NewPatientForm
          setOpenNewCheckin={setOpenNewCheckin}
          setOpenCheckinSuccess={setOpenCheckinSuccess}
        />
      </SofiaDrawers>

      <SofiaModal
        isModalOpen={openCheckinSuccess}
        handleOk={() => setOpenCheckinSuccess(false)}
        handleCancel={() => setOpenCheckinSuccess(false)}
        width={600}
        maskClosable={false}
        content={
          <CheckinSuccessLayout setOpenCheckinSuccess={setOpenCheckinSuccess} />
        }
        closeIcon={false}
      />

      <SofiaModal
        isModalOpen={openExistingCheckin}
        handleOk={() => setOpenExistingCheckin(false)}
        handleCancel={() => setOpenExistingCheckin(false)}
        width={700}
        maskClosable={false}
        content={
          <PatientList
            setOpenNewCheckin={setOpenNewCheckin}
            setOpenExistingCheckin={setOpenExistingCheckin}
          />
        }
      />
    </div>
  );
};

export default CheckinLayoutModule;
