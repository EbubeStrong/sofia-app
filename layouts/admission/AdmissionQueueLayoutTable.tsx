"use client";

import React, { useCallback, useState } from "react";
import { ColumnType } from "antd/es/table";
import {TabsProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
// import formatMinutes from "@/utils/formatMinutes";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaTabs from "@/components/SofiaTabs";
import {
  AdmissionLayoutQueueColumns,
  AdmissionHistoryColumns,
} from "@/data/pharmacy-data";
import {
  TPharmacyPrescriptionQueueResp,
} from "@/interfaces/pharmacy";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { mockAdmissionsByTab } from "@/components/Admission/AdmissionMockData";
import { AdmissionReviewAction } from "@/components/Admission/AdmissionReviewAction";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";
import { SearchGrayIcon } from "@/assets/icons";
// import FormInputDate from "@/components/FormElements/FormInputDate";
import { HospitalByIdResponse } from "@/interfaces/general";
import { useFetchAdmissionTableData } from "@/services/admission";
import { calculateAge } from "@/utils/calculate-age";
import { formatDate } from "@/utils/format-date";

type TQueueTableProps = {
  // tableData: object;
  tableData: TPharmacyPrescriptionQueueResp["data"];
  type: "queue" | "dashboard";
  hospitals: HospitalByIdResponse["data"];
};

type TMockAppointment = {
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
  diagnosis?: string;
  bed?: string;
  duration?: string;
  stay?: string;
};


const AdmissionQueueLayoutTable: React.FC<TQueueTableProps> = ({
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
    searchParams.get("q") ?? "admission"
  );
  // const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [timeFilterValue, setTimeFilterValue] = useState("All Time");
  const [wardFilterValue, setWardFilterValue] = useState("All Ward");

  const { data: prescriptions, isFetching: isFetchingPrescriptions } = useFetchAdmissionTableData(
    tableData,
    activeKey,
    searchFromUrl,
    priorityQuery,
    visitStatusQuery,
    eventTypeQuery,
    dateQuery
  );


  //   useEffect(() => {
  //     const urlQuery = searchParams.get("q");
  //     if (urlQuery && urlQuery !== activeKey) {
  //       setActiveKey(urlQuery);
  //     }
  //   }, [activeKey, searchParams]);

  const handleQueueChange = (key: string) => {
    setActiveKey(key);
    params.set("q", key);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };


  const renderAdmissionAction = (
    status: string,
    patientId: string,
    patientConsultationId: number,
    hospitals: HospitalByIdResponse["data"],
    admissionItem?: TPharmacyPrescriptionQueueResp["data"]["data"][number]
  ) => {
    switch (status) {
      case "admission":
        return (
          <AdmissionReviewAction
            status="admission"
            buttonText="Review"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
            admissionItem={admissionItem}
          />
        );

      case "current":
        return (
          <AdmissionReviewAction
            status="current"
            buttonText="View"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
            admissionItem={admissionItem}
          />
        );

      case "discharge":
        return (
          <AdmissionReviewAction
            status="discharge"
            buttonText="View"
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
            admissionItem={admissionItem}
          />
        );

      case "history":
        return (
          <AdmissionReviewAction
            status="history"
            buttonText="View"
            hidePrimaryButton
            patientId={patientId}
            patientConsultationId={patientConsultationId}
            hospitals={hospitals}
            admissionItem={admissionItem}
          />
        );

      default:
        return null;
    }
  };

  const isUsingMock = !prescriptions?.data?.length;



  const mapMockToTableRow = useCallback((appointment: TMockAppointment) => {
    if (activeKey === "history") {
      return {
        key: appointment.appointmentId,
        admissionId: appointment.appointmentId,
        name: appointment.patientName,
        diagnosis: appointment.diagnosis ?? appointment.drugs,
        bed: appointment.bed ?? "-",
        duration: appointment.duration ?? "-",
        stay: appointment.stay ?? "-",
        action: appointment.action ?? null,
      };
    }

    return {
      key: appointment.appointmentId,
      prescId: `${appointment.appointmentId.slice(0, 6)}...`,
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
    };
  }, [activeKey]);

  const tableDataSource = React.useMemo(() => {
    if (isUsingMock) {
      if (activeKey === "all") {
        const map = new Map<string, TMockAppointment>();

        Object.entries(mockAdmissionsByTab)
          .filter(([key]) => key !== "archived" && key !== "all")
          .forEach(([, appointments]) => {
            appointments.forEach((appointment) => {
              if (!map.has(appointment.appointmentId)) {
                map.set(appointment.appointmentId, appointment);
              }
            });
          });

        return Array.from(map.values()).map(mapMockToTableRow);
      }

      return (mockAdmissionsByTab[activeKey] ?? []).map(mapMockToTableRow);
    }

    // return (
    //   prescriptions?.data?.map((prescription) => ({
    //     key: prescription.patientConsultationId,
    //     prescId: prescription.patientConsultationId,
    //     patient: prescription.patientName,
    //     drug: prescription.allergy,
    //     doctor: prescription.prescribingDoctor,
    //     date: prescription.date,
    //     priority: prescription.priority,
    //     action: renderPharmacyAction(prescription.status, prescription.patientId, prescription.patientConsultationId, hospitals ),
    //   })) ?? []
    // );

    return (
      prescriptions?.data?.map((item) => {
        const patientName = `${item.patient.firstName} ${item.patient.lastName}`;

        const doctorName = item.doctor
          ? `Dr. ${item.doctor.firstName} ${item.doctor.lastName}`
          : "-";
        const age = calculateAge(item.patient.dob);
        const date = formatDate(item.medication.createdAt);

        if (activeKey === "history") {
          return {
            key: item.consultation.id,
            admissionId: item.consultation.id,
            name: patientName,
            diagnosis: item.consultation.reasonForVisit ?? "-",
            bed: item.consultation.eventType ?? "-",
            duration: `${formatDate(item.consultation.consultationDate)} - ${formatDate(item.consultation.createdAt)}`,
            stay: `${item.consultation.priority ?? "-"}`,
            action: renderAdmissionAction(
              activeKey,
              item.patient.id,
              item.consultation.id,
              hospitals,
              item
            ),
          };
        }

        return {
          key: item.consultation.id,

          prescId: item.consultation.id,

          patient: (
            <div>
              <div className="font-medium">{patientName}</div>
              <div className="text-xs text-gray-400">
                {item.patient.gender}, Age {age ?? "-"}
              </div>
            </div>
          ),

          drug: item.medication?.drug ?? "-",

          doctor: doctorName,

          date: date,
          priority: (
            <span className="px-5 py-1 text-xs border border-[#D91F1180] text-[#D91F1180] bg-[#FCF3F2] rounded-full">
              {item.consultation.priority}
            </span>
          ),

          action: renderAdmissionAction(
            activeKey,
            item.patient.id,
            item.consultation.id,
            hospitals,
            item
          ),
        };
      }) ?? []
    );
  }, [prescriptions, activeKey, isUsingMock, hospitals, mapMockToTableRow]);

  const items: TabsProps["items"] = [
    { key: "admission", label: "Admission Queue" },
    { key: "current", label: "Current Patients" },
    { key: "discharge", label: "Discharge" },
    { key: "history", label: "History" },
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

  // const handleDateFilter: DatePickerProps["onChange"] = (_, dateString) => {
  //   const params = Object.fromEntries(searchParams.entries());
  //   router.replace(
  //     `${pathname}${paramsObjectToQueryString({
  //       ...params,
  //       date: dateString,
  //     })}`,
  //     {
  //       scroll: false,
  //     }
  //   );
  // };
  const timeFilterOptions = [
    { label: "All Time", value: "All Time" },
    { label: "Today", value: "Today" },
    { label: "This Week", value: "This Week" },
    { label: "This Month", value: "This Month" },
    { label: "This Year", value: "This Year" },
  ];

  const wardFilterOptions = [
    { label: "All Ward", value: "All Ward" },
    { label: "Ward A", value: "Ward A" },
    { label: "Ward B", value: "Ward B" },
    { label: "Ward C", value: "Ward C" },
  ];

  // Get current tab data for conditional rendering
  // const currentTabData = getAppointmentData(activeKey);
  const hasData = tableDataSource.length > 0;
  return (
    <div className="flex flex-col gap-5 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      {hasData && (
        <section className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold text-[#101010]">
                Patient Filters
              </p>
              <p className="text-md text-[#101010B2]">
                Filter and search patients by various criteria
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="w-full md:w-[200px]">
                  <FormInputDropdown
                    placeholder="All Time"
                    options={timeFilterOptions}
                    onChange={(value) => setTimeFilterValue(value as string)}
                    allowClear
                    value={timeFilterValue}
                    className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
                  />
                </div>
                <div className="w-full md:w-[200px]">
                  <FormInputDropdown
                    placeholder="All Ward"
                    options={wardFilterOptions}
                    onChange={(value) => setWardFilterValue(value as string)}
                    allowClear
                    value={wardFilterValue}
                    className="[&_.ant-select-selector]:!h-10 [&_.ant-select-selector]:!rounded-md"
                  />
                </div>
              </div>

              <div className="w-full md:w-[320px]">
                <FormInput
                  placeholder="Search by name or patient ID"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleDebouncedSearch(e.target.value)
                  }
                  prefix={<SearchGrayIcon />}
                  cssProps={{ $height: "40px" }}
                  allowClear
                />
              </div>
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
        columns={
          (activeKey === "history"
            ? AdmissionHistoryColumns()
            : AdmissionLayoutQueueColumns()) as ColumnType[]
        }
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

export default AdmissionQueueLayoutTable;
