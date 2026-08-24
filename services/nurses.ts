import {
  AssignNurseRequest,
  AssignNurseResponse,
  NursesStatsResp,
  TDropoffSummaryDetails,
  TNurseProfile,
  TNursesResp,
  TNursingQueueResp,
  TUpdateNurseProfileRequest,
  TUpdateNurseProfileResponse,
  TVitalsRequest,
  TVitalsResponse,
} from "@/interfaces/nurses";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

import client from "@/config/client";

export const useFetchNursingQueue = (
  initialData: TNursingQueueResp["data"],
  activeTab: string,
  tabQuery: string,
  query?: string,
  priorityQuery?: string,
  activityQuery?: string,
  nurseAssignedQuery?: string,
  dateQuery?: string
): UseQueryResult<TNursingQueueResp["data"], AxiosError> => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const isInitialState =
    pageNumber === "1" &&
    activeTab === tabQuery &&
    !query &&
    !priorityQuery &&
    !activityQuery &&
    !nurseAssignedQuery &&
    !dateQuery;

  return useQuery({
    queryKey: [
      "nurses_queue",
      pageNumber,
      pageSize,
      activeTab,
      query,
      priorityQuery,
      activityQuery,
      nurseAssignedQuery,
      dateQuery,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        type: activeTab,
      });

      if (query) params.append("searchTerm", query);
      if (priorityQuery) params.append("priority", priorityQuery);
      if (activityQuery) params.append("activity", activityQuery);
      if (nurseAssignedQuery) params.append("nurseId", nurseAssignedQuery);
      if (dateQuery) params.append("date", dateQuery);

      const res = await client.get<TNursingQueueResp["data"]>(
        "/v1/hospital/nurse/queue",
        { params }
      );
      return res.data;
    },
    initialData: isInitialState ? initialData : undefined,
    enabled: Boolean(activeTab),
    placeholderData: (prev) => prev,
  });
};

export const useFetchNurses = (
  isLead: boolean,
  searchQuery?: string
): UseQueryResult<TNursesResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["nurses", searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        perPage: "10",
      });

      if (searchQuery) params.append("searchTerm", searchQuery);

      const res = await client.get<TNursesResp["data"]>(`/v1/hospital/nurses`, {
        params,
      });
      return res.data;
    },
    enabled: Boolean(isLead),
  });
};

export const useAssignNurse = (): UseMutationResult<
  AssignNurseResponse["data"],
  Sofiamatics.Response<unknown>,
  AssignNurseRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: AssignNurseRequest) => {
      const response = await client.put<AssignNurseResponse["data"]>(
        "/v1/hospital/nurse/assign-nurse",
        payload.body
      );
      return response.data;
    },
  });
};

export const useNursesStats = (): UseQueryResult<
  NursesStatsResp["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["nurses_stats"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<NursesStatsResp["data"]>(
        `/v1/hospital/nurse/dashboard/statistics`,
        { params }
      );
      return res.data;
    },
  });
};

export const useDropoffSummary = (
  id: string
): UseQueryResult<TDropoffSummaryDetails["data"], AxiosError> => {
  return useQuery({
    queryKey: ["dropoff_details", id],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TDropoffSummaryDetails["data"]>(
        `/v1/hospital/nurse/dropoff/${id}`,
        { params }
      );
      return res.data;
    },
    // enabled: !!id,
    enabled: false,
  });
};

export const useCreateVitals = (
  patientId: string
): UseMutationResult<
  TVitalsResponse["data"],
  Sofiamatics.Response<unknown>,
  TVitalsRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TVitalsRequest) => {
      const response = await client.post<TVitalsResponse["data"]>(
        `/v1/hospital/nurse/patient/${patientId}/patient-vitals`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useNursesProfile = (): UseQueryResult<
  TNurseProfile["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["nurse_profile"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TNurseProfile["data"]>(
        `/v1/hospital/nurse/profile`,
        { params }
      );
      return res.data;
    },
  });
};

export const useUpdateNurseProfile = (): UseMutationResult<
  TUpdateNurseProfileResponse["data"],
  Sofiamatics.Response<unknown>,
  TUpdateNurseProfileRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TUpdateNurseProfileRequest) => {
      const response = await client.put<TUpdateNurseProfileResponse["data"]>(
        "/v1/hospital/nurse/update-profile",
        payload.body
      );
      return response.data;
    },
  });
};

