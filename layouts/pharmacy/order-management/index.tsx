"use client";
import React from "react";
import { TabsProps } from "antd";
import { useState } from "react";


import SofiaTabs from "@/components/SofiaTabs";
import LowStockTable from "@/components/Pharmacy/order-management/lowStockTable";
import AllRequestTable from "@/components/Pharmacy/order-management/allCartsTable";
import OrderHistoryTable from "@/components/Pharmacy/order-management/orderHistoryTable";



const PharmacyOrderManagement = () => {
  const [activeKey, setActiveKey] = useState("low-stock");
//   const [filterValue, setFilterValue] = useState("Today");


  const handleQueueChange = (key: string) => {
    setActiveKey(key);
  };


  const renderLowStockContent = () => (
    <div className="flex flex-col gap-6">
      <LowStockTable />
    </div>
  );

  const renderAllRequestContent = () => (
    <div className="flex flex-col gap-6">
        <AllRequestTable />
    </div>
  );

  const renderPatientsContent = () => (
    <div className="p-4">
      <p className="text-base text-[#101010]/70">
        <OrderHistoryTable />
      </p>
    </div>
  );


const items: TabsProps["items"] = [
    {
      key: "low-stock",
      label: "Low Stock",
      children: renderLowStockContent(),
    },
    {
      key: "request",
      label: "Request",
      children: renderAllRequestContent(),
    },
    {
      key: "order-history",
      label: "Order History",
      children: renderPatientsContent(),
    },
  ];



  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
            Orders
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
        defaultActiveKey="low-stock"
      />
    </div>
  );
};

export default PharmacyOrderManagement;
