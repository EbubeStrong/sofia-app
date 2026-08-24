"use client";
import MultipleOrdersTable from "@/components/Pharmacy/order-management/multipleOrdersTable";
import React from "react";


const MultipleOrdersPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <MultipleOrdersTable />
    </div>
  );
};

export default MultipleOrdersPage;