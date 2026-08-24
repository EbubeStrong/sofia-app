"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { ReviewSummaryColumns } from "@/data/review-summary-data";

interface IReviewSummaryProps {
  patientId: string;
}

const ReviewSummaryLayout: React.FC<IReviewSummaryProps> = ({ patientId }) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    indexNo: index + 1,
    newTreatment: "Patient Complaint",
    note: "Shortness of breath on exertion, Previously diagnosed with acute bronchitis and treated with bronchodilators, empiric antibiotics, and a short course oral steroid taper",
    fileAttached: "xray-biometric.pdf",
    patientId: patientId,
  }));

  return (
    <div>
      <div className="flex flex-col gap-5">
        <Suspense>
          <SofiaTable
            columns={ReviewSummaryColumns() as ColumnType[]}
            dataSource={genericList}
            loading={false}
            pageTotal={genericList.length}
          />
        </Suspense>

        <div className="flex items-center justify-end mt-6">
          <button className="w-full max-w-[30%] h-[50px] text-white font-semibold text-base bg-[#1175C0] rounded-lg">
            Sign & Submit Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummaryLayout;
