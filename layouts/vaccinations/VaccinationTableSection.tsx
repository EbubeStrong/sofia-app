"use client";

import { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { VaccinationTableColumns } from "@/data/vaccination-data";

interface IVaccinationTableSectionProps {
  patientId: string;
}

const VaccinationTableSection: React.FC<IVaccinationTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024",
    diagnosis: "Covid 19",
    vaccine: "Oxford",
    consent: "Confirmed",
    doses: "2",
    unit: "1",
    note: "Decision to perform surgery",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5">
      <Suspense>
        <SofiaTable
          columns={VaccinationTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default VaccinationTableSection;
