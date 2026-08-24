"use client";

import NearExpiryMedicineTable from "@/components/Pharmacy/inventory/NearExpiryMedicineTab";

const PatientsInventoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <NearExpiryMedicineTable activeKey="near-expiry" />
    </div>
  );
};

export default PatientsInventoryPage;
