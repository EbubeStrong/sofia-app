import client from "@/config/client";
import {  TPharmacyPrescriptionQueueResp } from "@/interfaces/pharmacy";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";


export const useFetchAdmissionTableData = (
  tableData: TPharmacyPrescriptionQueueResp["data"],
  activeTab: string,
  query?: string,
  priorityQuery?: string,
  visitStatusQuery?: string,
  eventTypeQuery?: string,
  dateQuery?: string
): UseQueryResult<TPharmacyPrescriptionQueueResp["data"], AxiosError> => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  // const isInitialState =
  //   pageNumber === "1" &&
  //   activeTab === "prescription" &&
  //   !query &&
  //   !priorityQuery &&
  //   !visitStatusQuery &&
  //   !eventTypeQuery &&
  //   !dateQuery;

  return useQuery({
    queryKey: queryKeys.pharmacy.prescriptions.list(
    pageNumber,
    pageSize,
    activeTab,
    query,
    priorityQuery,
    visitStatusQuery,
    eventTypeQuery,
    dateQuery
  ),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        type: activeTab,
      });

      if (query) params.append("searchTerm", query);
      if (priorityQuery) params.append("priority", priorityQuery);
      if (visitStatusQuery) params.append("visitStatus", visitStatusQuery);
      if (eventTypeQuery) params.append("eventType", eventTypeQuery);
      if (dateQuery) params.append("date", dateQuery);

      const res = await client.get<TPharmacyPrescriptionQueueResp>(
        "/v1/hospital/admission/queue",
        { params }
      );
      return res.data.data;
    },
    enabled: Boolean(activeTab),
    placeholderData: (prev) => prev,
  });
};