"use client";

import { Suspense, useMemo, useState } from "react";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  AppointmentIcon,
  TotalPatientIcon,
  TotalPersonIcon,
} from "@/assets/icons";
import SofiaTable from "@/components/Tables/SofiaTable";
import { PatientRecordsColumns } from "@/data/patient-record-data";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import { TAllPatientsResp, TPatientStatsProps } from "@/interfaces/patients";
import { useFetchPatients } from "@/services/patients";
import SofiaDrawers from "@/components/Drawers";
import EditPatientForm from "@/components/EditPatientForm";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import Image from "next/image";
import FilterIcon from "@/public/images/filter-icon.svg";


type PatientProps = {
  initialData: TAllPatientsResp["data"];
  statsData: TPatientStatsProps["data"];
};

const QueueStats = (data: TPatientStatsProps["data"]) => [
  {
    label: "Total Visits",
    value: data?.totalVisits ?? 0,
    icon: <TotalPatientIcon />,
    id: 1,
    moment: "All time",
    className:
      "bg-[#1D3354] text-white col-span-1 xl:col-span-2",
  },
  {
    label: "Patients Seen",
    value: data?.patientsSeen ?? 0,
    icon: <TotalPersonIcon />,
    id: 2,
    className:
      "bg-white text-[#212121] border border-[#212121]/10 col-span-1",
    moment: "Today"
  },
  {
    label: "New Patients",
    value: data?.newPatients ?? 0,
    icon: <AppointmentIcon />,
    id: 3,
    className:
      "bg-white text-[#212121] border border-[#212121]/10 col-span-1",
    moment: "This Month"
  },
];

  const filterOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

const PatientModuleLayout: React.FC<PatientProps> = ({
  initialData,
  statsData,
}) => {
  const isMobile = useIsMobile(1440);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchQuery = searchParams.get("q") as string;

  const [openEditForm, setOpenEditForm] = useState(false);
  const [activeKey, setActiveKey] = useState("prescription");
  const [getPatientId, setGetPatientId] = useState("");
  const [step, setStep] = useState(1);

  const { data: patients, isFetching: isFetchingCheckins } = useFetchPatients(
    initialData,
    searchQuery
  );

  const scrollConfig = useMemo(
    () => (isMobile ? { x: "max-content" } : undefined),
    [isMobile]
  );

  const patientsData = patients?.data?.map((patient) => ({
    key: patient?.patientId,
    patientId: patient?.patientId,
    name: patient?.name !== "John Doe" ? patient.name ?? "---" : "---",
    age: patient?.age || "---",
    gender: patient?.gender || "---",
    email: !patient?.email?.includes("emergency_")
      ? patient?.email ?? "---"
      : "---",
    lastVisit: patient?.lastVisit
      ? dayjs(patient?.lastVisit as Date).format("MMM DD, YYYY h:mm a")
      : "---",
    id: patient?.patientId,
    // priority: patient?.priority,
  }));

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    params.set("page_size", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // const handleDebouncedSearch = useDebouncedCallback((value) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (value) {
  //     params.set("q", value);
  //   } else {
  //     params.delete("q");
  //   }
  //   router.replace(`${pathname}?${params.toString()}`, {
  //     scroll: false,
  //   });
  // }, 1000);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl xl:text-2xl text-[#010101] font-semibold">
            Patients Profile
          </h1>
          <p className="text-base text-[#010101] font-normal">
            List of all patients treated by the doctor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {QueueStats(statsData).map((item) => (
          <div key={item.id} className={`${item.className} rounded-lg p-4`}>
            <p className={`text-sm font-normal pb-1.5 border-b ${item.id === 1 ? "border-white/10" : "border-[#212121]/10"}`}>{item.label}</p>
            <div className="flex items-center justify-between pt-5 ">
              <p className="text-xl font-semibold">{item.value}</p>
              {item.icon}
            </div>
            <p className="text-md font-normal">{item.moment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 mt-4 border border-solid border-dark/20 rounded-lg bg-white">
        <div className="flex items-center px-4 pt-4">
          <div className="w-full flex gap-3 md:w-[350px]">
            {/* <FormInput
              placeholder="Search patient records"
              prefix={<SearchGrayIcon />}
              cssProps={{ $height: "38px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDebouncedSearch(e.target.value)
              }
              allowClear
            /> */}



            <button
              onClick={() => { }}
              className="flex items-center justify-center gap-2 text-base text-[#111010] font-medium font-libre_franklin bg-white border border-solid border-[#000]/8 px-4 w-auto h-12 rounded-lg"
            >
              <Image src={FilterIcon} alt="Open manage subscription" priority />
              Filter by
            </button>

            <FormInputDropdown
              placeholder="Select Gender"
              options={filterOptions}
              onChange={() => { }}
              value={undefined}
              showSearch={false}
            />
          </div>
        </div>

        <Suspense>
          <SofiaTable
            columns={
              PatientRecordsColumns({
                setOpenEditForm,
                setGetPatientId,
                setStep,
                activeKey,
              }) as ColumnType[]
            }
            dataSource={patientsData ?? []}
            loading={isFetchingCheckins}
            currentPage={patients?.page}
            pageSize={patients?.perPage}
            pageTotal={patients?.totalCount ?? 0}
            onChange={handlePageChange}
            scroll={scrollConfig}
          />
        </Suspense>
      </div>

      <SofiaDrawers
        title={<p className="text-xl text-[#101010]">Edit Patient Record</p>}
        placement="right"
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <EditPatientForm
          setOpenEditForm={setOpenEditForm}
          step={step}
          getPatientId={getPatientId}
        />
      </SofiaDrawers>
    </div>
  );
};

export default PatientModuleLayout;
