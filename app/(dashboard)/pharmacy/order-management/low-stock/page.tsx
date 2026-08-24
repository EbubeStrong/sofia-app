"use client";
import React from "react";
import LowStockTable from "@/components/Pharmacy/order-management/lowStockTable";

const LowStockPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <LowStockTable />
    </div>
  );
};

export default LowStockPage;
