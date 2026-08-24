import React from "react";

import DepartmentLayout from "@/layouts/configuration-setup";
import { fetchDepartments } from "@/hooks/use-server-fetchers";
import { TDepartmentsResp } from "@/interfaces/configuration";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
  };
};

const DepartmentConfigModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;

  const deptParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
  });

  const departments = await fetchDepartments(deptParams);

  return (
    <DepartmentLayout
      initialData={departments?.data as TDepartmentsResp["data"]}
    />
  );
};

export default DepartmentConfigModule;
