import React from "react";

import CheckinLayoutModule from "@/layouts/checkin";
import { fetchAllCheckins } from "@/hooks/use-server-fetchers";
import { TCheckinsResp } from "@/interfaces/checkin";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    q?: string;
    search?: string;
    priority?: string;
    visitStatus?: string;
    eventType?: string;
    date?: string;
  };
};

const CheckinModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;
  const q = searchParams.q;
  const search = searchParams.search;
  const priority = searchParams.priority;
  const visitStatus = searchParams.visitStatus;
  const eventType = searchParams.eventType;
  const date = searchParams.date;

  const checkinParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    tab: q ?? "TodaysEmergency",
    ...(search && { searchTerm: search ?? "" }),
    ...(priority && { priority: priority ?? "" }),
    ...(visitStatus && { visitStatus: visitStatus ?? "" }),
    ...(eventType && { eventType: eventType ?? "" }),
    ...(date && { date: date ?? "" }),
  });

  const allCheckins = await fetchAllCheckins(checkinParams);

  return (
    <CheckinLayoutModule
      initialData={allCheckins?.data as TCheckinsResp["data"]}
    />
  );
};

export default CheckinModule;
