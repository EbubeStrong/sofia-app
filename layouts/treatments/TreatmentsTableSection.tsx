"use client";

import React, { Suspense } from "react";
import { ColumnType } from "antd/es/table";

//components
import SofiaTable from "@/components/Tables/SofiaTable";
import { TreatmentsTableColumns } from "@/data/treatments-data";
import SofiaModal from "@/components/SofiaModals";
import useTreatmentModalStore from "@/stores/treatmentsModalStore";
import TreatmentDetails from "./TreatmentDetails";

interface ITreatmentsTableSectionProps {
  patientId: string;
}

const cssProps = {
  $height: "38px",
};

const TreatmentsTableSection: React.FC<ITreatmentsTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024",
    diagnosis: "Malaria Parasite",
    prescription: "Pain Relief and Anti-inflammatory",
    instructions: "200-400 mg",
    type: "Telemedicine",
    id: index + 1,
    patientId: patientId,
  }));

  const {
    openTreatmentModal,
    handleOpenTreatmentModal,
    handleCloseTreatmentModal,
  } = useTreatmentModalStore();

  return (
    <section className="flex flex-col gap-5">
      <Suspense>
        <SofiaTable
          columns={TreatmentsTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>

      <SofiaModal
        isModalOpen={openTreatmentModal}
        handleOk={handleOpenTreatmentModal}
        handleCancel={handleCloseTreatmentModal}
        title={
          <h1 className="text-2xl text-sofia_dark font-semibold font-libre_franklin leading-normal">
            View Treatment
          </h1>
        }
        content={<TreatmentDetails />}
      />
    </section>
  );
};

export default TreatmentsTableSection;
