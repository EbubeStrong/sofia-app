import React from "react";

import RoomLayout from "@/layouts/configuration-setup/RoomLayout";
import { fetchRooms } from "@/hooks/use-server-fetchers";
import { TRoomsResp } from "@/interfaces/configuration";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
  };
};

const ConfigRoomsModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;

  const roomParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
  });

  const rooms = await fetchRooms(roomParams);

  return <RoomLayout initialData={rooms?.data as TRoomsResp["data"]} />;
};

export default ConfigRoomsModule;
