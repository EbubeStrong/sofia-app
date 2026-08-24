"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SofiaPagination from "@/components/Pagination";
import SofiaDropdown from "@/components/Dropdowns";
import { DotsVertical } from "@/assets/icons";
import type { MenuProps } from "antd";
import EmptyTable from "@/components/Tables/EmptyTable";
import { Prescription } from "@/interfaces/patients";
 



interface Props {
  data: any;
  loading: boolean;
  pagination: {
    page: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}


// --- Status Badge Component ---
const StatusBadge = ({ status }: { status: string }) => {
  let styles = "bg-gray-100 text-gray-600";
  
  if (status === "Completed") styles = "bg-[#E6F6F4] text-[#00A389]"; 
  if (status === "Rejected") styles = "bg-[#FFEBEB] text-[#D92D20]"; 
  if (status === "Stand by") styles = "bg-[#EBEBEB] text-[#5A5A5A]"; 

  return (
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};


const PatientPrescriptionList = ({
  data,
  loading,
  pagination,
  onPageChange,
}: Props) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("q") ?? "prescription";
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10;
  const { page, size } = pagination;

  const totalCount = data?.totalCount ?? 0;
  // const { items, total } = data;

  // const pagedPrescriptions = useMemo(() => {
  //   const start = (currentPage - 1) * pageSize;
  //   return MOCK_PRESCRIPTIONS.slice(start, start + pageSize);
  // }, [currentPage]);

  // const pagedPrescriptions = useMemo(() => {
  //   const start = (page - 1) * size;
  //   return data.slice(start, start + size);
  // }, [page]);

  // const startIndex = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  // const endIndex = Math.min(currentPage * pageSize, totalCount);

  const prescriptions = data?.data ?? [];

  const startIndex =
  (page - 1) * size + 1;

const endIndex = Math.min(
  page * size,
  totalCount
);

  const emptyState = (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <div className="flex justify-center">
        <EmptyTable
          message="No recent activity found"
          description="Actions on the records appear here"
        />
      </div>
    </div>
  );


  if (totalCount === 0) return emptyState;

  const getMenuItems = (id: number, status: string): MenuProps["items"] => [
    {
      key: "edit",
      label: (
        <button type="button" className="w-full flex">
          Edit
        </button>
      ),
      onClick: () => console.log("edit", id),
    },
    {
      key: "view-upload",
      label: (
        <button type="button" className="w-full flex">
          View Upload
        </button>
      ),
      onClick: () => console.log("view-upload", id),
    },
    {
      key: "fill-medication",
      disabled: status === "Rejected",
      label: (
        <button type="button" className="w-full flex">
          Fill Medication
        </button>
      ),
      onClick: () => {
        if (status === "Rejected") return;
        console.log("fill-medication", id);
      },
    },
    {
      key: "archive",
      label: (
        <button type="button" className="w-full flex">
          Archive
        </button>
      ),
      onClick: () => console.log("archive", id),
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#101010]">Prescription History</h2>
        <p className="text-sm text-gray-500">Previous surgical procedures</p> 
      </div>

      <div className="space-y-4">
        {prescriptions.map((item: Prescription) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Brand Name</p>
                <h3 className="text-base font-semibold text-[#101010]">{item.brandName}</h3>
              </div>
              <SofiaDropdown
                label={
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <DotsVertical />
                  </button>
                }
                items={getMenuItems(item.id, item.status)}
              />
            </div>

           
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Strength</p>
                <p className="text-sm font-medium text-[#101010]">{item.strength}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Pack</p>
                <p className="text-sm font-medium text-[#101010]">{item.pack}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Generic Name</p>
                <p className="text-sm font-medium text-[#101010]">{item.genericName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Refill Number</p>
                <p className="text-sm font-medium text-[#101010]">{item.refillNumber}</p>
              </div>
              
            
              <div>
                <p className="text-xs text-gray-400 mb-1">Form</p>
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {item.form}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total</p>
                <p className="text-sm font-medium text-[#101010]">{item.total}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">All Substitute</p>
                <p className="text-sm font-medium text-[#101010]">{item.substitute}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <StatusBadge status={item.status} />
              </div>
            </div>

           
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Directions</p>
              <p className="text-sm text-[#101010] leading-relaxed">
                {item.directions}
              </p>
            </div>

           
            <div className="text-[10px] text-gray-400">
              {item.date}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-transparent">
        <p className="text-sm text-gray-500">
          Showing Results: {startIndex} - {endIndex} of {totalCount}
        </p>

        <SofiaPagination
          current={page}
          pageSize={size}
          total={totalCount}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default PatientPrescriptionList;