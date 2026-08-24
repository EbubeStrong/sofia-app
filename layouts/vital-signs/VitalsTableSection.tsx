"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { VitalsTableColumns } from "@/data/vitals-data";

interface IVitalsTableSectionProps {
  patientId: string;
}

const VitalsTableSection: React.FC<IVitalsTableSectionProps> = ({
  patientId,
}) => {
  const cssProps = {
    $height: "38px",
  };

  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024 9:51 PM",
    temperature: "98.6°F",
    bloodPressure: "120/80 mmHg",
    pulseRate: "75 BPM",
    respiratoryRate: "16 BPM",
    height: "16 inches",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5 mt-5">
      <div className="flex items-center">
        <SofiaFilterButton />
        <div className="w-full md:w-[397px]">
          <FormInput
            placeholder="Search Vitals"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={cssProps}
          />
        </div>
      </div>

      <Suspense>
        <SofiaTable
          columns={VitalsTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default VitalsTableSection;
