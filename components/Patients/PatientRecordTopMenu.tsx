"use client";

import { PatientTab } from "@/interfaces/patients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";


interface IRecordTopMenuProps {
  activeTab: PatientTab;
  updateURL: (updates: {
    q?: PatientTab;
    page?: number;
    size?: number;
  }) => void;
}



const PatientRecordTopMenu: React.FC<IRecordTopMenuProps> = ({activeTab, updateURL}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const activeTab = searchParams.get("q") ?? "prescription";

 const patientTabs: { title: string; key: PatientTab }[] = useMemo(
    () => [
      { title: "Prescription", key: "prescription" },
      { title: "Allergies", key: "allergies" },
      { title: "Vaccinations", key: "vaccinations" },
      { title: "Logs", key: "logs" },
    ],
    []
  );

  const handleTabChange = (tabKey: PatientTab) => {
    // const params = new URLSearchParams(searchParams.toString());
    // params.set("q", tabKey);
    // router.replace(`${pathname}${params.toString() ? `?${params}` : ""}`, {
    //   scroll: false,
    // });
    updateURL({
    q: tabKey,
    page: 1,
  });
  };

  return (
    <div className="flex flex-row gap-6 flex-nowrap overflow-x-auto mb-1 border-b border-gray-200 px-1">
      {patientTabs.map((menu) => (
        <button
          key={menu.key}
          type="button"
          onClick={() => handleTabChange(menu.key)}
          className={`${
            activeTab === menu.key
              ? "border-b-2 border-[#D33B52] text-[#101010CC] font-bold"
              : "font-normal text-[#101010]/70 hover:text-[#101010]"
          } text-sm whitespace-nowrap py-3 px-1 transition-colors duration-200`}
        >
          {menu.title}
        </button>
      ))}
    </div>
  );
};

export default PatientRecordTopMenu;