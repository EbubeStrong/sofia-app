"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { SearchGrayIcon } from "@/assets/icons";
import ExpiryInventoryDashboard from "@/components/Pharmacy/inventory/ExpiryInventory";
import SalesOverview from "@/components/Pharmacy/inventory/SalesInventoryOverview";
import SummaryInventory from "@/components/Pharmacy/inventory/summaryInventory";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";
import { DatePickerProps } from "antd";


const InventoryDashboardPage = () => {
    const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") ?? "";
  const [filterValue, setFilterValue] = useState("Today");
  const [searchValue, setSearchValue] = useState(searchFromUrl);

  const filterOptions = [
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];

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
    <div className="flex flex-col gap-6">
      {/* <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full flex items-center justify-between md:w-[230px]">
          <SofiaFilterButton />

          <FormInputDropdown
            placeholder="Filter by"
            options={filterOptions}
            onChange={(value) => setFilterValue(value as string)}
            value={filterValue}
            showSearch={false}
          />
        </div>

        <div className="w-full md:w-[500px]">
          <FormInput
            placeholder="Search by email"
            prefix={<SearchGrayIcon />}
            cssProps={{ $height: "38px" }}
            allowClear
          />
        </div>
      </section> */}
      <section className=" p-4 bg-white">
                      <div className="space-y-4">
                        <div className="w-full max-w-full md:max-w-[49%]">
                          <FormInput
                            placeholder="Search by name, manufacturer or NAFDAC"
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

      <SummaryInventory />
      <ExpiryInventoryDashboard />
      <SalesOverview />
    </div>
  );
};

export default InventoryDashboardPage;
