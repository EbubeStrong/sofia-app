"use client";

import { Button, DatePickerProps, TableProps } from "antd";
import React, { useState } from "react";
import { SearchGrayIcon } from "@/assets/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

// components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import NewPatientInventoryForm from "@/components/Pharmacy/Forms/NewPatientInventoryForm";

// hooks
import { useFetchNearExpiryInventory } from "@/hooks/use-client-fetchers";
import { INearExpiryItem } from "@/interfaces/pharmacy";
import { NearExpiryColumns } from "@/data/pharmacy-data";
import dayjs from "dayjs";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";

interface PatientsInventoryTableProps {
  activeKey?: string;
}

const NearExpiryMedicineTable: React.FC<PatientsInventoryTableProps> = ({ activeKey }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") ?? "";
  const isMobile = useIsMobile(1440);
  const [openNewInventoryPatient, setOpenNewInventoryPatient] =
    useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("Today");
  const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDebouncedSearch = useDebouncedCallback((value) => {
    setSearchValue(value);
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

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
    
  const filterOptions = [
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];

  const rowSelection: TableProps<INearExpiryItem>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const handleNewPatientClick = () => {
    setOpenNewInventoryPatient(true);
  };
  const {
    data: inventory,
    isLoading,
    // isError,
  } = useFetchNearExpiryInventory(activeKey);

  const normalize = (value?: string | number) =>
    String(value ?? "").toLowerCase();

  // 🔹 map API response to table data
  const inventoryPatientData: INearExpiryItem[] =
    inventory?.data?.map((item) => ({
      key: item.drugId ?? "---",
      drugName: item.drugName ?? "---",
      capacity: item.capacity ?? "---",
      drugType: item.drugType ?? "---",
      amountRemaining: item.amount as number ?? "---",
      dateOfExpiry: item.dateOfExpiry
        ? dayjs(item.dateOfExpiry).format("MMM D, YYYY")
        : "---",
    })) ?? [];

  const filteredInventoryPatientData = inventoryPatientData.filter((item) => {
    const search = normalize(searchValue);

    return (
      normalize(item.drugName).includes(search) ||
      normalize(item.drugType).includes(search) ||
      normalize(item.dateOfExpiry).includes(search)
    );
  });


  return (
    <>
      <div className="bg-white border border-solid border-dark/20 rounded-xl py-5 flex flex-col justify-between h-full min-h-[140px] shadow-sm gap-5 ">
        {/* <div className="w-full flex justify-end pr-4"> */}
        <div className="flex flex-col md:flex-row justify-between px-4">
          <div className="">
          <p className="text-base text-[#101010] font-semibold">Medications Nearing Expiry({filteredInventoryPatientData.length})</p>
          <p className="text-base text-[#101010]/50">
            Filter and search medicine by various criterias
          </p>
        </div>
          {/* <Button
            type="primary"
            variant="text"
            // color="bg-[#1175C0]"
            className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !transition-all duration-75 !py-6 !text-white !rounded-md !px-10"
            onClick={handleNewPatientClick}
          >
            <FaPlus /> Add New
          </Button> */}
        </div>
        <section className=" p-4 bg-white">
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
      </div>
      <div className="flex flex-col gap-5 bg-white border border-dark/20 p-4 rounded-lg">
        <SofiaTable
          rowSelection={rowSelection}
          columns={NearExpiryColumns(searchValue)}
          dataSource={filteredInventoryPatientData}
          loading={isLoading}
          currentPage={inventory?.page}
          pageSize={inventory?.perPage}
          pageTotal={filteredInventoryPatientData.length}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </div>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">New Patient Registration</p>
            <p className="text-sm text-[#101010]/50">
              Complete this form to register a new patient
            </p>
          </>
        }
        placement="right"
        open={openNewInventoryPatient}
        onClose={() => {
          setOpenNewInventoryPatient(false);
        }}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <NewPatientInventoryForm />
      </SofiaDrawers>
    </>
  );
};

export default NearExpiryMedicineTable;
