"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { NursesNoteTableColumns } from "@/data/nurses-note-data";

interface INursesNoteTableSectionProps {
  patientId: string;
}

const NursesNoteTableSection: React.FC<INursesNoteTableSectionProps> = ({
  patientId,
}) => {
  const cssProps = {
    $height: "38px",
  };

  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 Nov 2024 9:51 PM",
    complaint: "Flu symptoms",
    nursesNote:
      "Patient reported no significant concerns but underwent routine blood tests to monitor cholesterol levels. Recommendations for a balanced diet",
    collectedBy: "Dr Mike Micheal, MD",
    id: index + 1,
    patientId: patientId,
  }));

  return (
    <section className="flex flex-col gap-5 mt-5">
      <div className="flex items-center">
        <SofiaFilterButton />
        <div className="w-full md:w-[397px]">
          <FormInput
            placeholder="Search notes"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={cssProps}
          />
        </div>
      </div>

      <Suspense>
        <SofiaTable
          columns={NursesNoteTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
        />
      </Suspense>
    </section>
  );
};

export default NursesNoteTableSection;
