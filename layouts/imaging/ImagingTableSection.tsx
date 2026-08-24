"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { ColumnType } from "antd/es/table";
import type { TableProps } from "antd";

//components
import FormInput from "@/components/FormElements/FormInput";
import SearchIcon from "@/public/images/search-icon-light.svg";
import SofiaTable from "@/components/Tables/SofiaTable";
import SofiaFilterButton from "@/components/SofiaFilterButton";
import { IImagingProps } from "@/interfaces/tableDataTypes";
import { ImagingTableColumns } from "@/data/imaging-data";

interface IImagingTableSectionProps {
  patientId: string;
}

const cssProps = {
  $height: "38px",
};

const ImagingTableSection: React.FC<IImagingTableSectionProps> = ({
  patientId,
}) => {
  const genericList = Array.from({ length: 6 }, (_, index) => ({
    key: index,
    date: "12 NOV 2024 9:51 PM",
    fileName: "Test document.pdf",
    fileSize: "200KB",
    uploadedBy: "Amina Mohammed",
    id: index + 1,
    patientId: patientId,
  }));

  const rowSelection: TableProps<IImagingProps>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IImagingProps[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <section className="flex flex-col gap-5 mt-5">
      <div className="flex items-center">
        <SofiaFilterButton />
        <div className="w-full md:w-[397px]">
          <FormInput
            placeholder="Search Imaging"
            prefix={<Image src={SearchIcon} alt="An Icon to Search" priority />}
            cssProps={cssProps}
          />
        </div>
      </div>

      <Suspense>
        <SofiaTable
          columns={ImagingTableColumns() as ColumnType[]}
          dataSource={genericList}
          loading={false}
          pageTotal={genericList.length}
          rowSelection={{ ...rowSelection }}
        />
      </Suspense>
    </section>
  );
};

export default ImagingTableSection;
