"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { SurgeryTableColumns } from "@/data/surgeries-data";

interface ISurgeryTableSectionProps {
  patientId: string;
}

const SurgeryTableSection: React.FC<ISurgeryTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024",
    type: "Elective",
    procedure: "Open heart",
    diagnosis: "Decision to perform surgery",
    performedBy: "Dr Mike Micheal, MD",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5">
      <Suspense>
        <SofiaTable
          columns={SurgeryTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default SurgeryTableSection;
