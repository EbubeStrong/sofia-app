"use client";

import { Button, DatePickerProps, Form } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SearchGrayIcon } from "@/assets/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// components
import SofiaTable from "@/components/Tables/SofiaTable";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
// import SofiaFilterButton from "@/components/SofiaFilterButton";

// hooks
import { useFetchMedicineInventory } from "@/hooks/use-client-fetchers";
import { IInventoryItem } from "@/interfaces/pharmacy";
import { MedicineInventoryColumns } from "@/data/pharmacy-data";
import { FaPlus } from "react-icons/fa";
import FormConfig from "@/components/FormElements/FormConfig";
import { AddMedicationSchema } from "@/layouts/pharmacy/schema";
import FormInputDate from "@/components/FormElements/FormInputDate";
import { paramsObjectToQueryString } from "@/utils/params-to-query";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { invalidateQuery } from "@/config/query-client";
import { UserInfoResponse } from "@/interfaces/general";
import storage from "@/config/storage";
import { useCreatePharmacyNewMedicineRequest } from "@/services/pharmacy";
import { ColumnType } from "antd/es/table";
import EditInventoryForm from "../Forms/EditInventoryForm";

interface MedicineInventoryTableProps {
  activeKey?: string;
}

type TNewInventoryFields = {
  name: string;
  storeLocation: string;
  formId: string;
  ndc: string;
  price: number;
  quantity: number;
  manufacturer: string;
  expiryDate: string;
  attachment?: File; // optional, include if there's a file upload
  uploadedFileUrl?: string; // optional, include if the file upload returns a URL
};


const MedicineInventoryTable: React.FC<MedicineInventoryTableProps> = ({ activeKey }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") ?? "";
  const isMobile = useIsMobile(1440);
  const [openNewInventoryMedicine, setOpenNewInventoryMedicine] =
    useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("Today");
  const [searchValue, setSearchValue] = useState(searchFromUrl);
  const [user, setUser] = useState({} as UserInfoResponse);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [getInventoryId, setGetInventoryId] = useState("");
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  
  
    useEffect(() => {
      const user = storage.getUser();
      console.log("user from inventory useEffect", user);
      setUser(user as UserInfoResponse);
    }, [user?.hospitalId, user?.id]);
  
const handleNewMedicineClick = () => {
    setOpenNewInventoryMedicine(true);
  };
  const {
    data: inventory,
    isLoading,
    // isError,
  } = useFetchMedicineInventory(activeKey);

  const { mutate: createInventory, isPending: isCreatingInventory } = useCreatePharmacyNewMedicineRequest();


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

  

  const normalize = (value?: string | number) =>
    String(value ?? "").toLowerCase();

  // 🔹 map API response to table data
  const inventoryData: IInventoryItem[] =
    inventory?.data?.map((item) => ({
      key: item.drugId,
      drugId: item.drugId,
      drugName: item.drugName ?? "---",
      drugForm: item.drugForm ?? "---",
      storageLocation: item.storageLocation ?? "---",
      drugPrice: item.drugPrice ?? "---",
      nafdacNumber: item.nafdacNumber ?? "---",
      manufacturer: item.manufacturer ?? "---",
      quantity: item.quantity ?? 0,
      expiryDate: item.expiryDate
        ? dayjs(item.expiryDate).format("MMM D, YYYY")
        : "---",
    })) ?? [];

  const filteredInventoryData = inventoryData.filter((item) => {
    const search = normalize(searchValue);

    return (
      normalize(item.drugName).includes(search) ||
      normalize(item.manufacturer).includes(search) ||
      normalize(item.nafdacNumber).includes(search)
    );
  });

  // const handleSubmitMedication = (values: unknown) => {
  //   console.log(values);
  //   // addMedication(values);
  // };

  const handleSubmitMedication = (values: TNewInventoryFields) => {
     const userId = user?.id;
  const hospitalId = user?.hospitalId;
  console.log("User ID:", userId);
  console.log("Hospital ID:", hospitalId);
  console.log("Submitting new medicine with values:", values);

  if (!userId || !hospitalId) {
    toast.error("hospital information missing");
    return;
  }
    const payload = {
      userId: userId,
      hospitalId: hospitalId,
      name: values.name,
      form: values.formId,
      storeLocation: values.storeLocation,
      price: values.price,
      quantity: values.quantity,
      manufacturer: values.manufacturer,
      nDC: values.ndc,
      expiryDate: values.expiryDate,
      attachment: values.attachment, // optional, include if there's an uploaded file
      
      uploadedFileUrl: values.uploadedFileUrl, // optional, include if the file upload returns a URL
    };
    createInventory(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Patient check-in registered successfully");
          form.resetFields();
          router.push(`/check-in`);
          invalidateQuery(["checkins"]);
          return;
        },
      }
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl py-5 flex flex-col justify-between h-full min-h-[140px] shadow-sm gap-5">
        <div className="flex flex-col px-4 md:flex-row justify-between">
          <div>
            <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
              All Medicines({inventoryData.length})
            </h4>
            <p className=" text-xs md:text-sm font-normal">
              Filter and search medicine below by various criterias
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
          <Button
            // type="primary"
            // variant="text"
            color="default" 
            variant="outlined"
            className=" !transition-all duration-75 !py-6 !rounded-md !px-10 !font-bold"
            onClick={handleNewMedicineClick}
          >
          Print Inventory
          </Button>
          <Button
            // type="primary"
            // variant="text"
            color="primary" 
            variant="outlined"
            className="!border-[#1175C0] !text-[#1175C0] !transition-all duration-75 !py-6  !rounded-md !px-10 !font-bold"
            onClick={handleNewMedicineClick}
          >
          Import
          </Button>
          <Button
            type="primary"
            variant="text"
            // color="bg-[#1175C0]"
            className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !transition-all duration-75 !py-6 !text-white !rounded-md !px-10 !font-bold"
            onClick={handleNewMedicineClick}
          >
          <FaPlus />  Add New
          </Button>
          </div>

        </div>
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
      </div>
      <div className="flex flex-col gap-5 bg-white border border-dark/20 p-4 rounded-lg">
        <SofiaTable
          columns={MedicineInventoryColumns({searchValue, setOpenEditForm, setGetInventoryId, setStep}) as ColumnType[]}
          dataSource={filteredInventoryData}
          loading={isLoading}
          currentPage={inventory?.page}
          pageSize={inventory?.perPage}
          pageTotal={filteredInventoryData.length}
          scroll={isMobile ? { x: "max-content" } : undefined}
        />
      </div>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">New Medicine Form</p>
            <p className="text-sm text-[#101010]/50">
              Fill out the form below to add new medicine to stock
            </p>
          </>
        }
        placement="right"
        open={openNewInventoryMedicine}
        onClose={() => {
          setOpenNewInventoryMedicine(false);
        }}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
         <FormConfig
            form={form}
            schema={AddMedicationSchema()}
            onSubmit={handleSubmitMedication}
            btnText="Save"
            twClassStyle="grid grid-cols-1 gap-x-6"
            btnLoading={isCreatingInventory}
            formName="add-medication-form"
          />
      </SofiaDrawers>
      <SofiaDrawers
        title={<p className="text-xl text-[#101010]">{step === 1 ? "Inventory Details" : "Edit Inventory"}</p>}
        placement="right"
        open={openEditForm}
        onClose={() => setOpenEditForm(false)}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        <EditInventoryForm
          setOpenEditForm={setOpenEditForm}
          getInventoryId={getInventoryId}
          step={step}
        />
      </SofiaDrawers>
    </>
  );
};

export default MedicineInventoryTable;
