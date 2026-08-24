"use client";

import React, { useMemo, useState } from "react";
import { DatePickerProps, Modal, TableProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchGrayIcon } from "@/assets/icons";

// components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";


// hooks
import { useFetchOrderHistory } from "@/hooks/use-client-fetchers";
import { IOrderHistoryItem } from "@/interfaces/pharmacy";
import { OrderHistoryColumns } from "@/data/pharmacy-data";
import { sliceText } from "@/utils/sliceText";
import NewMedicineRequestForm from "../Forms/newRequestForm";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";


const OrderHistoryTable: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1440);
   const searchFromUrl = searchParams.get("search") ?? "";

  const [openNewRequest, setOpenNewRequest] = useState(false);
  const [filterValue, setFilterValue] = useState("Today");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState(searchFromUrl);

 


  const { data: orderHistory, isLoading } = useFetchOrderHistory();

  const normalize = (v?: string | number) =>
    String(v ?? "").toLowerCase();

  
const orderHistoryData: IOrderHistoryItem[] = useMemo(
  () =>
    orderHistory?.data?.map((item) => ({
      key: item.requestId,
      requestId: item.requestId,

      from: item.from ?? "---",
      to: item.to ?? "---",
      subject: sliceText(item.subject ?? "---", 8),
      body: sliceText(item.body ?? "---", 14),
      orderDate: item.orderDate,
    })) ?? [],
  [orderHistory]
);

 

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
  const filterOptions = [
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];


  const filteredOrderHistoryData = useMemo(() => {
  return orderHistoryData.filter((item) => {
    const matchesSearch =
      normalize(item.from).includes(normalize(searchFromUrl)) ||
      normalize(item.to).includes(normalize(searchFromUrl))

   
    return matchesSearch;
  });
}, [orderHistoryData, searchFromUrl]);


 
  const onDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Medicine",
      content: "Are you sure you want to delete this medicine?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Deleting:", id);
        // todo integrate api here
      },
    });
  };

  
  const rowSelection: TableProps<IOrderHistoryItem>["rowSelection"] = {
  selectedRowKeys,
  onChange: (keys) => setSelectedRowKeys(keys),
};

const handleNewRequestClick = () => {
          setOpenNewRequest(true)
      }
  


  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col md:flex-row justify-between">
                 <div>
                   <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
                     Order History({orderHistoryData.length})
                   </h4>
                   <p className=" text-xs md:text-sm font-normal">
                     All Intakes and Registration
                   </p>
                 </div>
               </div>
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

      <div className="bg-white border rounded-lg p-4">
        <SofiaTable
          rowSelection={rowSelection}
          columns={OrderHistoryColumns(searchValue, onDelete)}
          dataSource={filteredOrderHistoryData}
          loading={isLoading}
          pageTotal={filteredOrderHistoryData.length}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </div>

      <SofiaDrawers
                title={
                  <>
                    <p className="text-xl text-[#101010]">Order History</p>
                    <p className="text-sm text-[#101010]/50">
                        Fill out the form below to request for new medicine
                    </p>
                  </>
                }
                placement="right"
                open={openNewRequest}
                onClose={() => {
                  setOpenNewRequest(false);
                }}
                width={520}
                maskClosable={false}
                zIndex={1005}
              >
                < NewMedicineRequestForm />
              </SofiaDrawers>
    </div>
  );
};

export default OrderHistoryTable;