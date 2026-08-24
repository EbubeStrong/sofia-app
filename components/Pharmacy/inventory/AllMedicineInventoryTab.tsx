import { SearchGrayIcon } from "@/assets/icons";
import SofiaDrawers from "@/components/Drawers";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { Button } from "antd";
import React, { useState } from "react";


const AllMedicinesInventory = () => {
    const [openNewInventoryMedicine, setOpenNewInventoryMedicine] = useState<boolean>(false)
    const [filterValue, setFilterValue] = useState("Today");
    

      const filterOptions = [
        { label: "Today", value: "Today" },
        { label: "Week", value: "Week" },
        { label: "Month", value: "Month" },
        { label: "Year", value: "Year" },
      ];

    const handleNewMedicineClick = () => {
        setOpenNewInventoryMedicine(true)
    }

  return (
    <section className="">
      <div className="bg-white rounded-xl p-5 flex flex-col justify-between h-full min-h-[140px] shadow-sm gap-5">
        <div className="flex flex-col md:flex-row px-2 py-4 justify-between">
          <div>
            <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
              All Medicines(count)
            </h4>
            <p className=" text-xs md:text-sm font-normal">
              All Intakes and Registration
            </p>
          </div>
         
          <Button
                        type="primary"
                        variant="text"
                        // color="bg-[#1175C0]"
                        className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !transition-all duration-75 !py-6 !text-white !rounded-md !font-bold"
                        onClick={handleNewMedicineClick}
                      >
                        Add New
                      </Button>
        </div>
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
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
            placeholder="Search by product name"
            prefix={<SearchGrayIcon />}
            cssProps={{ $height: "38px" }}
            allowClear
          />
        </div>
      </section>
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
            {/* new medicine component here */} hello
          </SofiaDrawers>
    </section>
  );
};

export default AllMedicinesInventory;