import { RedPillIcon, UserDoubleIcon } from "@/assets/dashboard-icons";
import React from "react";

const SummaryInventory = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-4">
      {/* 1. Stock Shortage Card (Dark Blue) */}
      <div className="bg-[#1D3354] rounded-xl p-5 text-white flex flex-col justify-between h-full min-h-[140px] shadow-sm">
        {/* Top Row: Title + Badge */}
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-sm md:text-base font-normal opacity-90">
            Stock Shortage
          </h4>
          <div className="bg-white/10 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <span>↑</span>
            <span>20%</span>
          </div>
        </div>

        {/* Bottom Row: Content + Icon */}
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-lg md:text-xl font-bold font-libre_franklin mb-1">
              Paracetamol
            </h4>
            <p className="text-white/70 text-xs md:text-sm font-normal">
              Only 50 units left
            </p>
          </div>
          {/* Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
           <UserDoubleIcon color="#fff"/>
          </div>
        </div>
      </div>

      {/* 2. Sale of the Day (White Card) */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-full min-h-[140px] shadow-sm">
        {/* Top Row: Title + Badge */}
        <div className="flex justify-between items-start border-b border-gray-50 pb-3 mb-1">
          <h4 className="text-sm md:text-base font-normal text-gray-600">
            Sale of the Day
          </h4>
          <div className="bg-[#027A48] text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <span>↑</span>
            <span>20%</span>
          </div>
        </div>

        {/* Bottom Row: Content + Icon */}
        <div className="flex justify-between items-end pt-2">
          <div>
            <h3 className="text-[#101010] text-lg md:text-xl font-bold font-libre_franklin mb-1">
              Amoxicillin
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-normal">
              Sold 2,000 units
            </p>
          </div>
          {/* Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-[#FEF3F2] flex items-center justify-center shrink-0">
            <RedPillIcon />
          </div>
        </div>
      </div>

      {/* 3. Sale of the Month (White Card) */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-full min-h-[140px] shadow-sm">
        {/* Top Row: Title + Badge */}
        <div className="flex justify-between items-start border-b border-gray-50 pb-3 mb-1">
          <h4 className="text-sm md:text-base font-normal text-gray-600">
            Sale of the Month
          </h4>
          <div className="bg-[#D92D20] text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <span>↓</span>
            <span>20%</span>
          </div>
        </div>

        {/* Bottom Row: Content + Icon */}
        <div className="flex justify-between items-end pt-2">
          <div>
            <h3 className="text-[#101010] text-lg md:text-xl font-bold font-libre_franklin mb-1">
              Ibuprofen
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-normal">
              Sold 2,000 units
            </p>
          </div>
          {/* Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-[#2121211A] flex items-center justify-center shrink-0">
           <UserDoubleIcon color="#212121"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummaryInventory;
