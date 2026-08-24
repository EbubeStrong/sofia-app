"use client";

import TopNavTabs from "@/components/ConfigTopMenuReusable";
import React from "react";


const INVENTORY_BASE = "/pharmacy/inventory";

const inventoryNav = [
  { title: "Dashboard", link: `${INVENTORY_BASE}/dashboard` },
  { title: "Medicine", link: `${INVENTORY_BASE}/medicine` },
  { title: "Near Expiry", link: `${INVENTORY_BASE}/near-expiry` },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010]">
            Inventory management
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            All intake and registration
          </p>
        </div>
      </section>

      <TopNavTabs items={inventoryNav} />
      {children}
    </div>
  );
}
