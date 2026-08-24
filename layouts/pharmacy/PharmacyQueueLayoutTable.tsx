"use client";

import React, { useState } from "react";
import { ColumnType } from "antd/es/table";
import { DatePickerProps, TabsProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
// import formatMinutes from "@/utils/formatMinutes";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaTabs from "@/components/SofiaTabs";
import { PharmacyLayoutQueueColumns } from "@/data/pharmacy-data";
import { 
  TPharmacyPrescriptionQueueData,
 } from "@/interfaces/pharmacy";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { mockAppointmentsByTab } from "@/components/Pharmacy/PharmacyMockData";
import { PharmacyReviewAction } from "@/components/Pharmacy/PharmacyReviewAction";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";
import { SearchGrayIcon } from "@/assets/icons";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { useFetchPrescriptionTableData } from "@/services/pharmacy";
import { HospitalByIdResponse } from "@/interfaces/general";
import { calculateAge } from "@/utils/calculate-age";
import { formatDate } from "@/utils/format-date";

type TQueueTableProps = {
  // tableData: object;
  tableData: TPharmacyPrescriptionQueueData;
  type: "queue" | "dashboard";
  hospitals: HospitalByIdResponse["data"];
};



const PharmacyQueueLayoutTable: React.FC<TQueueTableProps> = ({
  tableData,
  hospitals,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const isMobile = useIsMobile(1440);
  const searchFromUrl = searchParams.get("search") ?? "";
  const priorityQuery = searchParams.get("priority") as string;
  const visitStatusQuery = searchParams.get("visitStatus") as string;
  const eventTypeQuery = searchParams.get("eventType") as string;
  const dateQuery = searchParams.get("date") as string;

  // states
  // const [activeKey, setActiveKey] = useState("new");
  const [activeKey, setActiveKey] = useState<string>(
    searchParams.get("q") ?? "prescription"
  );
  // const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [filterValue, setFilterValue] = useState("Today");

  const { data: prescriptions, isFetching: isFetchingPrescriptions } = useFetchPrescriptionTableData(
      tableData,
      activeKey,
      searchFromUrl,
      priorityQuery,
      visitStatusQuery,
      eventTypeQuery,
      dateQuery
    );
  

  // useEffect(() => {
  //   const urlQuery = searchParams.get("q");
  //   if (urlQuery && urlQuery !== activeKey) {
  //     setActiveKey(urlQuery);
  //   }
  // }, [activeKey, searchParams]);

  const handleQueueChange = (key: string) => {
    setActiveKey(key);
    params.set("q", key);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };


  const renderPharmacyAction = (status: string, patientId: string, patientConsultationId: number, hospitals: HospitalByIdResponse["data"] ) => {
    switch (status) {
      case "prescription":
        return (
          <PharmacyReviewAction
            status="prescription"
            buttonText="Review"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
          />
        );

      case "archived":
        return (
          <PharmacyReviewAction
            status="archived"
            buttonText="View Archive"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
          />
        );

      case "approved":
        return (
          <PharmacyReviewAction
            status="approved"
            buttonText="Fill"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
          />
        );

      case "reject":
        return (
          <PharmacyReviewAction
            status="reject"
            buttonText="Edit"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
          />
        );

      case "completed":
        return (
          <PharmacyReviewAction
            status="completed"
            buttonText="Archive"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
          />
        );

      default:
        return null;
    }
  };

  
  console.log("Prescriptions data:", prescriptions);

  const mapMockToTableRow = (appointment: {
    appointmentId: string;
    patientName: string;
    gender: string;
    age: number;
    drugs: string;
    doctor: string;
    date: string;
    priority: string;
    action?: React.ReactNode;
    patientId: string;
  }) => ({
    key: appointment.appointmentId,
    prescId: appointment.appointmentId,
    patient: (
      <div>
        <div className="font-medium">{appointment.patientName}</div>
        <div className="text-xs text-gray-400">
          {appointment.gender}, Age {appointment.age}
        </div>
      </div>
    ),
    drug: appointment.drugs,
    doctor: appointment.doctor,
    date: appointment.date,
    priority: (
      <span className="px-5 py-1 text-xs border border-[#D91F1180] text-[#D91F1180] bg-[#FCF3F2] rounded-full">
        {appointment.priority}
      </span>
    ),
    action: appointment.action ?? null,
    patientId: appointment.patientId,
  });

  const isUsingMock = !prescriptions?.data?.length;

  const tableDataSource = React.useMemo(() => {
    if (isUsingMock) {
      return (mockAppointmentsByTab[activeKey] ?? []).map(mapMockToTableRow);
    }

    return (
      prescriptions?.data?.map((item) => {
        const patientName = `${item.patient.firstName} ${item.patient.lastName}`;

        const doctorName = item.doctor
          ? `Dr. ${item.doctor.firstName} ${item.doctor.lastName}`
          : "-";
        const age = calculateAge(item.patient.dob);
        const date = formatDate(item.medication.createdAt);

        return {
          key: item.consultation.id,

          prescId: item.consultation.id,

          patient: (
            <div>
              <div className="font-medium">{patientName}</div>
              <div className="text-xs text-gray-400">
                {item.patient.gender}, Age {age ?? "---"}
              </div>
            </div>
          ),

          // drug: item.medication?.drug ?? "---",
          drug: "------",
          doctor: doctorName,

          date: date,
          priority: (
            <span className="px-5 py-1 text-xs border border-[#D91F1180] text-[#D91F1180] bg-[#FCF3F2] rounded-full">
              {item.consultation.priority}
            </span>
          ),

          action: renderPharmacyAction(
            activeKey,
            item.patient.id,
            item.consultation.id,
            hospitals
          ),
        };
      }) ?? []
    );
  }, [prescriptions, activeKey, hospitals, isUsingMock]);

  const items: TabsProps["items"] = [
    { key: "prescription", label: "New Prescription" },
    { key: "approved", label: "Approved" },
    { key: "reject", label: "Rejected" },
    { key: "completed", label: "Completed" },
    { key: "archived", label: "Archived" },
  ];

  const handleDebouncedSearch = useDebouncedCallback((value) => {
        // setSearchValue(value);
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
    const filterOptions = [
      { label: "Today", value: "Today" },
      { label: "Week", value: "Week" },
      { label: "Month", value: "Month" },
      { label: "Year", value: "Year" },
    ];

  const hasData = tableDataSource.length > 0;
  return (
    <div className="flex flex-col gap-5 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      {hasData && (
        <section className=" p-4 bg-white">
                        <div className="space-y-4">
                          <div className="w-full max-w-full md:max-w-[49%]">
                            <FormInput
                              placeholder="Search by email"
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
                              // options={priorityOptions}
                              // onChange={handlePriorityFilter}
                              options={filterOptions}
                              onChange={(value) => setFilterValue(value as string)}
                              allowClear
                              // value={priorityQuery}
                              value={filterValue}
                            />
                            <FormInputDropdown
                              placeholder="Select visit status"
                              // options={visitStatusOption}
                              // onChange={handleVisitStatusFilter}
                              // allowClear
                              // value={visitStatusQuery}
                              options={filterOptions}
                              onChange={(value) => setFilterValue(value as string)}
                              allowClear
                              value={filterValue}
                            />
                            <FormInputDropdown
                              placeholder="Select event type"
                              // options={eventTypeOptions}
                              // onChange={handleEventTypeFilter}
                              // allowClear
                              // value={eventTypeQuery}
                              options={filterOptions}
                              onChange={(value) => setFilterValue(value as string)}
                              allowClear
                              value={filterValue}
                            />
                            <FormInputDate 
                            onChange={handleDateFilter} 
                            format={"YYYY-MM-DD"} 
                            />
                          </div>
                        </div>
                      </section>
      )}

      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleQueueChange}
      />

      <SofiaTable
        columns={PharmacyLayoutQueueColumns() as ColumnType[]}
        dataSource={tableDataSource}
        loading={isFetchingPrescriptions}
        currentPage={prescriptions?.page}
        pageSize={prescriptions?.perPage}
        pageTotal={prescriptions?.totalCount ?? 0}
        scroll={isMobile ? { x: "max-content" } : undefined}
      />
    </div>
  );
};

export default PharmacyQueueLayoutTable;
