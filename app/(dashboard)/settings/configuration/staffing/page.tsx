import React from "react";

import StaffingLayout from "@/layouts/configuration-setup/StaffingLayout";
import { fetchDepartments } from "@/hooks/use-server-fetchers";
import { TDepartmentsResp } from "@/interfaces/configuration";

const ConfigStaffingModule = async () => {
  const departments = await fetchDepartments();

  return (
    <StaffingLayout
      initialData={departments?.data as TDepartmentsResp["data"]}
    />
  );
};

export default ConfigStaffingModule;
