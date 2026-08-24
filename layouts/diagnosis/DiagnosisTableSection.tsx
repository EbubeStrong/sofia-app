"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { DiagnosisTableColumns } from "@/data/diagnosis-data";

interface IDiagnosisTableSectionProps {
  patientId: string;
}

const DiagnosisTableSection: React.FC<IDiagnosisTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024 9:51 PM",
    title: "Patient reported no significant",
    history: "SARS Cov2...",
    collectedBy: "Dr Mike Micheal, MD",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5">
      <Suspense>
        <SofiaTable
          columns={DiagnosisTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default DiagnosisTableSection;
