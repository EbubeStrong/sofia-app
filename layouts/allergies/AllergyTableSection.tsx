"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { AllergyTableColumns } from "@/data/allergy-data";

interface IAllergyTableSectionProps {
  patientId: string;
}

const cssProps = {
  $height: "38px",
};

const AllergyTableSection: React.FC<IAllergyTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024",
    type: "Food",
    agent: "Pineapple",
    condition: "Drug allergy (Disorder)",
    severity: "Low",
    reaction: "Itching, redness...",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5 mt-5">
      <div className="flex items-center">
        <SofiaFilterButton />
        <div className="w-full md:w-[397px]">
          <FormInput
            placeholder="Search Allergies"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={cssProps}
          />
        </div>
      </div>

      <Suspense>
        <SofiaTable
          columns={AllergyTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default AllergyTableSection;
