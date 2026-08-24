"use client";

import TopNavTabs from "@/components/ConfigTopMenuReusable";
import React from "react";


const ORDER_MANAGEMENT_BASE = "/pharmacy/order-management";

const inventoryNav = [
  { title: "Low Stock", link: `${ORDER_MANAGEMENT_BASE}/low-stock` },
  { title: "Cart", link: `${ORDER_MANAGEMENT_BASE}/cart` },
  { title: "Orders", link: `${ORDER_MANAGEMENT_BASE}/multiple-order` },
  { title: "Order History", link: `${ORDER_MANAGEMENT_BASE}/history` },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010]">
            Order Management
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            All intake and registration
          </p>
        </div>
      </section>

      {/* Top Navigation */}
      <TopNavTabs items={inventoryNav} />

      {/* Page content */}
      {children}
    </div>
  );
}
