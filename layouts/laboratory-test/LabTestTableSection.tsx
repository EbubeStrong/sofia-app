"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { LabTestTableColumns } from "@/data/lab-test-data";

interface ILaboratoryTestSectionProps {
  patientId: string;
}

const LaboratoryTestSection: React.FC<ILaboratoryTestSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024 9:51 PM",
    type: "Screening",
    orderName: "Blood Glucose",
    specimen: "Blood",
    priority: "Urgent",
    orderBy: "Dr Mike Micheal, MD",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5">
      <Suspense>
        <SofiaTable
          columns={LabTestTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default LaboratoryTestSection;
