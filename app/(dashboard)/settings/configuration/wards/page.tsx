import React from "react";

import WardLayout from "@/layouts/configuration-setup/WardLayout";
import { fetchWards } from "@/hooks/use-server-fetchers";
import { TWardsResp } from "@/interfaces/configuration";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
  };
};

const ConfigWardsModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;

  const wardParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
  });

  const wards = await fetchWards(wardParams);

  return <WardLayout initialData={wards?.data as TWardsResp["data"]} />;
};

export default ConfigWardsModule;
