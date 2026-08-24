"use client";

import React, { useMemo, useState } from "react";
import {DatePickerProps, Modal, TableProps } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchGrayIcon } from "@/assets/icons";

// components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";


// hooks
import { useFetchLowStockMedicineInventory } from "@/hooks/use-client-fetchers";
import { ILowStockItem } from "@/interfaces/pharmacy";
import { LowStockColumns } from "@/data/pharmacy-data";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";


const LowStockTable: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1440);

    const searchFromUrl = searchParams.get("search") ?? "";
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterValue, setFilterValue] = useState("Today");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
const [reqQtyMap, setReqQtyMap] = useState<Record<string, number>>({});
const unitTypeQuery = searchParams.get("unitType") as string;


  const { data: lowStock, isLoading } = useFetchLowStockMedicineInventory();


  

  const normalize = (v?: string | number) =>
    String(v ?? "").toLowerCase();

  const lowStockData: ILowStockItem[] = useMemo(
  () =>
    lowStock?.data?.map((item) => ({
      key: item.drugId,
      drugId: item.drugId,

      drugName: item.drugName ?? "---",
      strength: item.strength ?? "---",
      unitType: item.unitType ?? "---",
       
      drugCategory: item.drugCategory ?? "---", 
      manufacturer: item.manufacturer ?? "---",
      drugQuantity: item.drugQuantity ?? 0,
      reqQuantity: item.reqQuantity ?? 0,  
    })) ?? [],
  [lowStock]
);

useMemo(() => {
  if (!lowStockData.length) return;

  const initial: Record<string, number> = {};

  lowStockData.forEach((i) => {
    initial[i.drugId] = i.reqQuantity ?? 0;
  });

  setReqQtyMap(initial);
}, [lowStockData]);

const handleReqQtyChange = (id: string, value: string) => {
  setReqQtyMap((prev) => ({
    ...prev,
    [id]: Number(value || 0),
  }));
};

const handleAddToCart = (row: ILowStockItem) => {
  const payload = {
    ...row,
    reqQuantity: reqQtyMap[row.drugId] ?? 0,
  };

  console.log("ADD TO CART PAYLOAD", payload);

  // todo add to cart endpoint
  // onsuccess set everything back to initial state
   setReqQtyMap((prev) => ({
    ...prev,
    [row.drugId]: 0,
  }));

  // optionally exit edit mode for that row
  setEditingRowId(null);
};


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

  const handleUnitTypeFilter = (value: string) => {
        const params = Object.fromEntries(searchParams.entries());
        router.replace(
          `${pathname}${paramsObjectToQueryString({
            ...params,
            unitType: value,
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

  const unitTypeFilterOptions = [
      { label: "Tablet", value: "Tablet" },
      { label: "Capsule", value: "Capsule" },
      { label: "Syrup", value: "Syrup" },
      { label: "Injection", value: "Injection" },
      { label: "Ointment", value: "Ointment" },
    ];

  const filteredLowStockData = useMemo(() => {
  return lowStockData.filter((item) => {
    const matchesSearch =
      normalize(item.drugName).includes(normalize(searchFromUrl)) ||
      normalize(item.unitType).includes(normalize(searchFromUrl)) ||
      normalize(item.drugCategory).includes(normalize(searchFromUrl));

    return matchesSearch;
  });
}, [lowStockData, searchFromUrl]);


 
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

  
  const rowSelection: TableProps<ILowStockItem>["rowSelection"] = {
  selectedRowKeys,
  onChange: (keys) => setSelectedRowKeys(keys),
};


  return (
    <div className="flex flex-col gap-6">
       <div className="flex-1">
         <h2 className="text-xl font-libre_franklin font-bold text-[#101010] leading-normal">
           Low Drug Stock List
         </h2>
         <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
           All intake and registration
         </p>
       </div>

      

        <section className=" p-4 bg-white">
                <div className="space-y-4">
                  <div className="w-full max-w-full md:max-w-[49%]">
                    <FormInput
                      placeholder="Search by name, drug category or unit type"
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
                      placeholder="Select unit type"
                      options={unitTypeFilterOptions}
                      onChange={handleUnitTypeFilter}
                      allowClear
                      value={unitTypeQuery}
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
          columns={LowStockColumns({
            searchValue,
            onDelete,
            editingRowId,
            setEditingRowId,
            reqQtyMap,
            onReqQtyChange: handleReqQtyChange,
            onAdd: handleAddToCart,
            })}
          dataSource={filteredLowStockData}
          loading={isLoading}
          pageTotal={filteredLowStockData.length}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </div>

      {/* Drawer */}
      <SofiaDrawers
        title={
          <>
            <p className="text-xl">New Medicine Form</p>
            <p className="text-sm text-[#101010]/50">
              Fill out the form below
            </p>
          </>
        }
        placement="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width={520}
        maskClosable={false}
      >
        hello
      </SofiaDrawers>
    </div>
  );
};

export default LowStockTable;


{/* <section className="grid grid-cols-1 gap-4">
            <div className="bg-[#1D3354] rounded-xl p-5 text-white flex flex-col justify-between h-full min-h-[120px] shadow-sm">
               <div className="flex justify-between items-center">
                 <div className="flex flex-col">
                 <h4 className="text-sm md:text-base font-normal opacity-90">
                   Amount Left(9)
                 </h4>
                 <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
                     Paracetamol
                   </h4>
                   <p className="flex text-white/70 text-xs md:text-sm font-normal gap-4">
                     <span>73070-0102-15</span>
                     <span className="w-fit px-5 h-5 text-center rounded-xl bg-white/10 ">Pill</span>
                   </p>
                 </div>
                 <div className="flex flex-[0.5] bg-inherit px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                   <Button
                         // type="primary"
                         variant="text"
                         // color="bg-[#1175C0]"
                         className=" !transition-all duration-75 !py-6 !rounded-md w-full"
                         // onClick={handleNewMedicineClick}
                        icon={<PlusOutlined />}
                       >
                         Place Order
                       </Button>
                       <Button
                         color="default" 
                         variant="outlined"
                         // color="bg-[#1175C0]"
                         className="!bg-inherit !text-white !transition-all duration-75 !py-6 !rounded-md w-full"
                         // onClick={handleNewMedicineClick}
                         icon={<MailOutlined />}
                       >
                         Send Email
                       </Button>
                 </div>
               </div>
             </div>
       </ section> */}