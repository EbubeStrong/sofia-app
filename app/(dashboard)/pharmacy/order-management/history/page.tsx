"use client";
import React from "react";
import OrderHistoryTable from "@/components/Pharmacy/order-management/orderHistoryTable";

const OrderHistoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <OrderHistoryTable />
    </div>
  );
};

export default OrderHistoryPage;
