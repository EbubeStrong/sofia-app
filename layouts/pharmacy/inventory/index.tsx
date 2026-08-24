"use client";
import React from "react";
import { TabsProps } from "antd";
import { useState } from "react";
import SofiaTabs from "@/components/SofiaTabs";
import FormInput from "@/components/FormElements/FormInput";
import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import { SearchGrayIcon } from "@/assets/icons";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import MedicineInventoryTable from "@/components/Pharmacy/inventory/MedicineInventoryTab";
import NearExpiryMedicineTable from "@/components/Pharmacy/inventory/NearExpiryMedicineTab";
import ExpiryInventoryDashboard from "@/components/Pharmacy/inventory/expiryInventory";
import SalesOverview from "@/components/Pharmacy/inventory/salesInventoryOverview";
import SummaryInventory from "@/components/Pharmacy/inventory/summaryInventory";

const PharmacyInventory = () => {
  const [activeKey, setActiveKey] = useState("inventory-dashboard");
  const [filterValue, setFilterValue] = useState("Today");

  const handleQueueChange = (key: string) => {
    setActiveKey(key);
  };

  const filterOptions = [
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ];

  const renderInventoryDashboardContent = () => (
    <div className="flex flex-col gap-6">
      {/* Overview Section */}
      <div className="flex-1">
        <h2 className="text-xl font-libre_franklin font-bold text-[#101010] leading-normal">
          Overview
        </h2>
        <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
          All intake and registration
        </p>
      </div>

      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        {/* <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto"> */}
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
        {/* </div> */}
      </section>

      <SummaryInventory />

      <ExpiryInventoryDashboard />

      <SalesOverview />
    </div>
  );


  const renderMedicineContent = () => (
    <div className="flex flex-col gap-6">
        <MedicineInventoryTable activeKey={activeKey} />
    </div>
  );

  const renderNearExpiryContent = () => (
    <div className="flex flex-col gap-6">
        <NearExpiryMedicineTable activeKey={activeKey} />
    </div>
  );


  const items: TabsProps["items"] = [
    {
      key: "inventory-dashboard",
      label: "Dashboard",
    },
    {
      key: "medicine",
      label: "Medicine",
    },
    {
      key: "patients",
      label: "Patients",
    },
  ];


  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
            Inventory management
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            All intake and registration
          </p>
        </div>
      </section>

      {/* Tabs */}
      <SofiaTabs
        items={items}
        activeKey={activeKey}
        onChange={handleQueueChange}
        defaultActiveKey="dashboard"
      />

      {/* Tab Content */}
      {activeKey === "inventory-dashboard" && renderInventoryDashboardContent()}
      {activeKey === "medicine" && renderMedicineContent()}
      {activeKey === "near-expiry" && renderNearExpiryContent()}
    </div>
  );
};

export default PharmacyInventory;

