"use client";

import MedicineInventoryTable from "@/components/Pharmacy/inventory/MedicineInventoryTab";

const MedicineInventoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <MedicineInventoryTable activeKey="medicine" />
    </div>
  );
};

export default MedicineInventoryPage;
