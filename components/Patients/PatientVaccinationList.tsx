"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import SofiaPagination from "@/components/Pagination";
import EmptyTable from "@/components/Tables/EmptyTable";
import SofiaDropdown from "@/components/Dropdowns";
import { DotsVertical } from "@/assets/icons";
import type { MenuProps } from "antd";
import { Vaccination, ApiPaginatedResponse } from "@/interfaces/patients";

interface Props {
  data?: ApiPaginatedResponse<Vaccination>;
  loading: boolean;
  pagination: {
    page: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}

const PatientVaccinationList = ({
  data,
  loading,
  pagination,
  onPageChange,
}: Props) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("q") ?? "vaccination";

  const { page, size } = pagination;
  const totalCount = data?.totalCount ?? 0;
  const vaccinations = data?.data ?? [];
  console.log("vaccinations", vaccinations)

  const startIndex = (page - 1) * size + 1;
  const endIndex = Math.min(page * size, totalCount);

  if (activeTab !== "vaccinations") return null;

  if (!loading && totalCount === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
        <div className="flex justify-center">
          <EmptyTable
            message="No vaccination history found"
            description="Vaccination records will appear here"
          />
        </div>
      </div>
    );
  }

  const menuItems = (id: number): MenuProps["items"] => [
    {
      key: "view",
      label: <button className="w-full flex">View Details</button>,
      onClick: () => console.log("view", id),
    },
    {
      key: "edit",
      label: <button className="w-full flex">Edit</button>,
      onClick: () => console.log("edit", id),
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
     
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#101010]">
          Vaccination History
        </h2>
        <p className="text-sm text-gray-500">
          Immunization records and administration details
        </p>
      </div>

      
      <div className="space-y-6">
        {vaccinations.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-5"
          >
           
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Vaccine</p>
                <h3 className="text-lg font-semibold text-[#101010]">
                  {item.vaccineName}
                </h3>
              </div>

              <SofiaDropdown
                label={
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <DotsVertical />
                  </button>
                }
                items={menuItems(item.id)}
              />
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Severity</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.severity}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Unit</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Date Administered</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.administeredOn}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Patient Consent</p>
                <p className="text-sm font-medium text-[#101010]">
                  Confirmed by patient
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Doses</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.dose}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Scheduled Date</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.scheduledOn}
                </p>
              </div>
            </div>

            
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Additional Notes</p>
              <p className="text-sm text-[#101010] leading-relaxed">
                {item.additionalNotes}
              </p>
            </div>

           
            <div className="text-[10px] text-gray-400">
              Added {item.addedOn}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex items-center justify-between mt-8 pt-4">
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

export default PatientVaccinationList;
