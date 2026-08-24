"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import SofiaPagination from "@/components/Pagination";
import EmptyTable from "@/components/Tables/EmptyTable";
import { ApiPaginatedResponse, MedicalLog } from "@/interfaces/patients";
import PatientLogCard from "./PatientLogCard";

interface Props {
  data?: ApiPaginatedResponse<MedicalLog>;
  loading: boolean;
  pagination: {
    page: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}

const PatientLogList = ({
  data,
  loading,
  pagination,
  onPageChange,
}: Props) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("q") ?? "logs";

  const { page, size } = pagination;
  const totalCount = data?.totalCount ?? 0;
  const logs = data?.data ?? [];

  const startIndex = (page - 1) * size + 1;
  const endIndex = Math.min(page * size, totalCount);

  if (activeTab !== "logs") return null;

  if (!loading && totalCount === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
        <div className="flex justify-center">
          <EmptyTable
            message="No recent activity found"
            description="Patient activity history will appear here"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
     
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#101010]">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-500">
          Chronological history of treatments, diagnoses, and interventions
        </p>
      </div>

      {/* the cards to be rendered */}
      <div className="space-y-3">
        {logs.map((log, index) => (
          <PatientLogCard
            key={log.id}
            log={log}
            isFirst={index === 0}
            isLast={index === logs.length - 1}
          />
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

export default PatientLogList;
