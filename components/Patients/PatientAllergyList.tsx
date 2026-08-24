"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import SofiaPagination from "@/components/Pagination";
import EmptyTable from "@/components/Tables/EmptyTable";
import { Allergy, ApiPaginatedResponse } from "@/interfaces/patients";

const SeverityBadge = ({ severity }: { severity: Allergy["severity"] }) => {
  let styles = "bg-gray-100 text-gray-600";

  if (severity === "Mild") styles = "bg-[#E6F6F4] text-[#00A389]";
  if (severity === "Moderate") styles = "bg-[#FFF4E5] text-[#F79009]";
  if (severity === "Severe") styles = "bg-[#FFEBEB] text-[#D92D20]";

  return (
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles}`}>
      {severity}
    </span>
  );
};


interface Props {
  data: any;
  loading: boolean;
  pagination: {
    page: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}

const PatientAllergyList = ({
  data,
  loading,
  pagination,
  onPageChange,
}: Props) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("q") ?? "allergies";

  const { page, size } = pagination;
  const totalCount = data?.totalCount ?? 0;
  const allergies = data?.data ?? [];

  const startIndex = (page - 1) * size + 1;
  const endIndex = Math.min(page * size, totalCount);

  if (activeTab !== "allergies") return null;

  if (!loading && totalCount === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
        <div className="flex justify-center">
          <EmptyTable
            message="No allergy history found"
            description="Recorded allergies will appear here"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#101010]">Allergy History</h2>
        <p className="text-sm text-gray-500">
          Documented allergic reactions and sensitivities
        </p>
      </div>

     
      <div className="space-y-6">
        {allergies.map((item: Allergy) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-5"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Allergen</p>
                <h3 className="text-base font-semibold text-[#101010]">
                  {item.allergen}
                </h3>
              </div>

              <SeverityBadge severity={item.severity} />
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Reaction</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.reaction}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Agent</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.agent}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Noted On</p>
                <p className="text-sm font-medium text-[#101010]">
                  {item.notedOn}
                </p>
              </div>
            </div>

           
            {item.additionalNotes && (
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-1">Additional Notes</p>
                <p className="text-sm text-[#101010] leading-relaxed">
                  {item.additionalNotes}
                </p>
              </div>
            )}

           
            <div className="text-[10px] text-gray-400">
              Added by {item.addedBy}
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

export default PatientAllergyList;
