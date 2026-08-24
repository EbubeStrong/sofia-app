import React from "react";
import { cookies } from "next/headers";

import NursingModuleLayout from "@/layouts/nurses-note/NursingLayout";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { stringToBoolean } from "@/utils/getInitials";
import { fetchAllNursingQueues } from "@/hooks/use-server-fetchers";
import { TNursingQueueResp } from "@/interfaces/nurses";

type TNursesProps = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    q?: string;
    search?: string;
    priority?: string;
    activity?: string;
    nurseId?: string;
    date?: string;
  };
};

const NursesModule: React.FC<TNursesProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const isLead = cookieStore.get(STORAGE_KEYS.IS_LEAD)?.value as string;
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;
  const q = searchParams.q;
  const search = searchParams.search;
  const priority = searchParams.priority;
  const activity = searchParams.activity;
  const nurseId = searchParams.nurseId;
  const date = searchParams.date;
  const tabQuery = stringToBoolean(isLead) ? "unassigned" : "assigned";

  const nursingQueueParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    type: q ?? tabQuery,
    ...(search && { searchTerm: search ?? "" }),
    ...(priority && { priority: priority ?? "" }),
    ...(activity && { activity: activity ?? "" }),
    ...(nurseId && { nurseId: nurseId ?? "" }),
    ...(date && { date: date ?? "" }),
  });

  const nursingQueue = await fetchAllNursingQueues(nursingQueueParams);

  return (
    <NursingModuleLayout
      initialData={nursingQueue?.data as TNursingQueueResp["data"]}
      isLead={stringToBoolean(isLead)}
      tabQuery={tabQuery}
    />
  );
};

export default NursesModule;
