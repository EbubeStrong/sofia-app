"use client";

import React, { useMemo, useState } from "react";
import { Button, DatePickerProps, Modal, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SearchGrayIcon } from "@/assets/icons";

// components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";


// hooks
import { useFetchAllMedicineRequests, useSendMultipleOrders } from "@/hooks/use-client-fetchers";
import { ICartItem } from "@/interfaces/pharmacy";
import { AllCartColumns} from "@/data/pharmacy-data";
import NewMedicineRequestForm from "../Forms/newRequestForm";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";
import { quickPrint } from "@/utils/printUtils";


const AllCartsTable: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1440);
  const searchFromUrl = searchParams.get("search") ?? "";

  const [openNewSingleOrderRequest, setOpenNewSingleOrderRequest] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState("Today");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [unitTypes, setUnitTypes] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState(searchFromUrl);

  



  const { data: allRequest, isLoading } = useFetchAllMedicineRequests();
  const { mutate: sendMultipleOrders, isPending: isSendingMultipleOrders } = useSendMultipleOrders();

  const normalize = (v?: string | number) =>
    String(v ?? "").toLowerCase();

  
const allCartData: ICartItem[] = useMemo(
  () =>
    allRequest?.data?.map((item) => ({
      key: item.cartId,
      cartId: item.cartId,

      drugName: item.drugName ?? "---",
      unitType: item.unitType ?? "---",
      strength: item.strength ?? "---",
      requiredQuantity: item.requiredQuantity ?? 0,
      manufacturer: item.manufacturer ?? "---",
      addedOn: item.addedOn ?? "---",
    })) ?? [],
  [allRequest]
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

  

  const filteredAllCartData = useMemo(() => {
  return allCartData.filter((item) => {
    const matchesSearch =
      normalize(item.drugName).includes(normalize(searchFromUrl)) ||
      normalize(item.unitType).includes(normalize(searchFromUrl))
    //   normalize(item.drugCategory).includes(normalize(searchValue));

    

    return matchesSearch;
  });
}, [allCartData, searchFromUrl]);


 
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

  
  const rowSelection: TableProps<ICartItem>["rowSelection"] = {
  selectedRowKeys,
  onChange: (keys) => setSelectedRowKeys(keys),
};

const handlePlaceMultipleOrders = () => {
  const selectedItems = allCartData.filter((item) =>
    selectedRowKeys.includes(item.key as string)
  );

  const payload = {
    orders: selectedItems.map((item) => ({
      cartId: item.cartId,
      drugName: item.drugName,
      unitType: item.unitType,
      strength: item.strength,
      requiredQuantity: item.requiredQuantity,
      manufacturer: item.manufacturer,
    })),
  };

  sendMultipleOrders(payload, {
    onSuccess: () => {
      toast.success("Orders sent successfully");
    },
  });
};


const handleSingleOrder = (cartId: string) => {
  setSelectedCartId(cartId);
  setOpenNewSingleOrderRequest(true);

  const params = Object.fromEntries(searchParams.entries());

  router.replace(
    `${pathname}${paramsObjectToQueryString({
      ...params,
      cartId,
    })}`,
    { scroll: false }
  );
};


const handlePrintOrder = () => {
  quickPrint(allCartData, {
    title: "Rose Pharmacy",
    address: "12 Anthony davies drive Maryland Lagos",
    orderedBy: "Johnson Blake",

    selectedRowKeys,

    columns: [
      { header: "Drugs", accessor: (i: ICartItem) => i.drugName },
      { header: "Type", accessor: (i: ICartItem) => i.unitType },
      { header: "Strength", accessor: (i: ICartItem) => i.strength },
      { header: "Manufacturer", accessor: (i: ICartItem) => i.manufacturer },
      { header: "Quantity", accessor: (i: ICartItem) => i.requiredQuantity },
    ],
  });
};

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col md:flex-row justify-between">
                 <div>
                   <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
                     Items in your cart({allCartData.length})
                   </h4>
                   <p className=" text-xs md:text-sm font-normal">
                     All Intakes and Registration
                   </p>
                 </div>
                
                 <Button
                               type="primary"
                               variant="text"
                               onClick={handlePrintOrder}
                               className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !font-bold !transition-all duration-75 !py-6 !text-white !rounded-md"
                             >
                               Print Order
                             </Button>
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
          columns={AllCartColumns(searchValue, onDelete, handleSingleOrder)}
          dataSource={filteredAllCartData}
          loading={isLoading}
          pageTotal={filteredAllCartData.length}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </div>
      <div>
        <Button
  type="primary"
  variant="text"
  // disabled={selectedRowKeys.length < 2}
  disabled={selectedRowKeys.length < 2 || isSendingMultipleOrders}
  className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !font-bold !transition-all duration-75 !py-6 !text-white !rounded-md disabled:!bg-gray-300"
  icon={<PlusOutlined />}
  // onClick={() => {
  //   const ids = selectedRowKeys.join(",");
  //   console.log("ids", ids)

  //   router.push(
  //     `/pharmacy/multiple-order?ids=${ids}`
  //   );
  // }}
  onClick={handlePlaceMultipleOrders}
>
  {isSendingMultipleOrders ? "Sending Orders" : "Place Multiple Orders"}
</Button>

      </div>

      <SofiaDrawers
                title={
                  <>
                    <p className="text-xl text-[#101010]">Send Request</p>
                    <p className="text-sm text-[#101010]/50">
                        Fill out the form below to request for new medicine
                    </p>
                  </>
                }
                placement="right"
                open={openNewSingleOrderRequest}
                onClose={() => {
                 setOpenNewSingleOrderRequest(false);
                 setSelectedCartId(null);

                 const params = Object.fromEntries(searchParams.entries());
                 delete params.cartId;

                 router.replace(
                  `${pathname}${paramsObjectToQueryString(params)}`,
                  { scroll: false }
                 ); 
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

export default AllCartsTable;

