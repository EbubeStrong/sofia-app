import { DarkPillIcon, RedPillIcon } from "@/assets/dashboard-icons";
import React from "react";

// --- Mock Data ---
const NEAR_EXPIRY_DATA = [
  {
    name: "Amoxicillin",
    expiresIn: "30 days",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiresIn: "30 days",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiresIn: "30 days",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiresIn: "30 days",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
];

const EXPIRED_DATA = [
  {
    name: "Amoxicillin",
    expiredDays: "30 ago",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiredDays: "30 ago",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiredDays: "30 ago",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
  {
    name: "Amoxicillin",
    expiredDays: "30 ago",
    ndc: "73070-0102-15",
    shelf: "Shelf A3",
  },
];

const ExpiryInventoryDashboard = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* 1. Near Expiry Card */}
      <div className="w-full bg-transparent border border-gray-200 rounded-xl p-5 shadow-sm">
        <h4 className="text-lg text-gray-900 font-bold mb-5">Near Expiry</h4>

        <div className="flex flex-col space-y-5">
          {NEAR_EXPIRY_DATA.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0"
            >
              {/* Left Side: Icon + Name */}
              <div className="flex items-center gap-4">
                {/* Red Circle Icon */}
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <RedPillIcon />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide mb-0.5">
                    Name
                  </span>
                  <span className="text-base font-bold text-gray-800 leading-tight">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Expires in {item.expiresIn}
                  </span>
                </div>
              </div>

              {/* Right Side: NDC + Shelf */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide mb-0.5">
                  NDC
                </span>
                <span className="text-sm font-semibold text-gray-700 leading-tight">
                  {item.ndc}
                </span>
                <span className="text-xs text-gray-500 mt-1">{item.shelf}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Expired Card */}
      <div className="w-full bg-transparent border border-gray-200 rounded-xl p-5 shadow-sm">
        <h4 className="text-lg text-gray-900 font-bold mb-5">Expired</h4>

        <div className="flex flex-col space-y-5">
          {EXPIRED_DATA.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0"
            >
              {/* Left Side: Icon + Name */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <DarkPillIcon />
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide mb-0.5">
                    Name
                  </span>
                  <span className="text-base font-bold text-gray-800 leading-tight">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    Expired {item.expiredDays}
                  </span>
                </div>
              </div>

              {/* Right Side: NDC + Shelf */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide mb-0.5">
                  NDC
                </span>
                <span className="text-sm font-semibold text-gray-700 leading-tight">
                  {item.ndc}
                </span>
                <span className="text-xs text-gray-500 mt-1">{item.shelf}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpiryInventoryDashboard;
