import React from "react";

import BedTypeLayout from "@/layouts/configuration-setup/BedTypeLayout";
import { TBedsResp } from "@/interfaces/configuration";
import { fetchBeds } from "@/hooks/use-server-fetchers";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
  };
};

const ConfigBedsModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;

  const bedParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
  });

  const beds = await fetchBeds(bedParams);

  return <BedTypeLayout initialData={beds?.data as TBedsResp["data"]} />;
};

export default ConfigBedsModule;
