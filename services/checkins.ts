import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

import client from "@/config/client";
import {
  TCheckinsResp,
  TCheckinStats,
  TCheckinSummaryById,
  TCreateCheckinRequest,
  TCreateCheckinResponse,
  TCreateEmergencyRequest,
  TCreateEmergencyResponse,
  TCreateInsuranceRequest,
  TCreateInsuranceResponse,
  TCreatePatientRequest,
  TCreatePatientResponse,
  TExistingCheckinResponse,
  TReceptionProfile,
  TUpdateProfileRequest,
  TUpdateProfileResponse,
} from "@/interfaces/checkin";
import {
  TChangePasswordRequest,
  TChangePasswordResponse,
} from "@/interfaces/hospital";

export const useCreatePatientInfo = (): UseMutationResult<
  TCreatePatientResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePatientRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePatientRequest) => {
      const response = await client.post<TCreatePatientResponse["data"]>(
        "/v1/hospital/receptionist/check-in/create-patient",
        payload.body
      );
      return response.data;
    },
  });
};

export const useCreateInsuranceInfo = (
  patientId: string
): UseMutationResult<
  TCreateInsuranceResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreateInsuranceRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreateInsuranceRequest) => {
      const response = await client.post<TCreateInsuranceResponse["data"]>(
        `/v1/hospital/receptionist/check-in/patients/${patientId}/insurance`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useCreateEmergencyInfo = (
  patientId: string
): UseMutationResult<
  TCreateEmergencyResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreateEmergencyRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreateEmergencyRequest) => {
      const response = await client.post<TCreateEmergencyResponse["data"]>(
        `/v1/hospital/receptionist/check-in/patients/${patientId}/emergency-contact`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useCreateCheckin = (): UseMutationResult<
  TCreateCheckinResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreateCheckinRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreateCheckinRequest) => {
      const response = await client.post<TCreateCheckinResponse["data"]>(
        `/v1/hospital/receptionist/check-in`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useExistingCheckins = (
  query: string
): UseQueryResult<TExistingCheckinResponse["data"], AxiosError> => {
  return useQuery({
    queryKey: ["existing_patients", query],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        perPage: "10",
        ...(query && { searchTerm: query }),
      });
      const res = await client.get<TExistingCheckinResponse["data"]>(
        "/v1/hospital/receptionist/check-in/search",
        { params }
      );
      return res.data;
    },
  });
};

export const useFetchCheckins = (
  initialData: TCheckinsResp["data"],
  activeTab: string,
  query?: string,
  priorityQuery?: string,
  visitStatusQuery?: string,
  eventTypeQuery?: string,
  dateQuery?: string
): UseQueryResult<TCheckinsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const isInitialState =
    pageNumber === "1" &&
    activeTab === "TodaysEmergency" &&
    !query &&
    !priorityQuery &&
    !visitStatusQuery &&
    !eventTypeQuery &&
    !dateQuery;

  return useQuery({
    queryKey: [
      "checkins",
      pageNumber,
      pageSize,
      activeTab,
      query,
      priorityQuery,
      visitStatusQuery,
      eventTypeQuery,
      dateQuery,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        tab: activeTab,
      });

      if (query) params.append("searchTerm", query);
      if (priorityQuery) params.append("priority", priorityQuery);
      if (visitStatusQuery) params.append("visitStatus", visitStatusQuery);
      if (eventTypeQuery) params.append("eventType", eventTypeQuery);
      if (dateQuery) params.append("date", dateQuery);

      const res = await client.get<TCheckinsResp["data"]>(
        "/v1/hospital/receptionist/dashboard/check-ins",
        { params }
      );
      return res.data;
    },
    // initialData: pageNumber === "1" && !activeTab ? initialData : undefined,
    initialData: isInitialState ? initialData : undefined,
    enabled: Boolean(activeTab),
    placeholderData: (prev) => prev,
  });
};

export const useCheckinDetails = (
  id: string
): UseQueryResult<TCheckinSummaryById["data"], AxiosError> => {
  return useQuery({
    queryKey: ["checkin_details", id],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TCheckinSummaryById["data"]>(
        `/v1/hospital/receptionist/check-in/${id}`,
        { params }
      );
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCheckinStats = (): UseQueryResult<
  TCheckinStats["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["checkin_stats"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TCheckinStats["data"]>(
        `/v1/hospital/receptionist/dashboard/statistics`,
        { params }
      );
      return res.data;
    },
  });
};

export const useReceptionProfile = (): UseQueryResult<
  TReceptionProfile["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["reception_profile"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TReceptionProfile["data"]>(
        `/v1/hospital/receptionist/dashboard/profile`,
        { params }
      );
      return res.data;
    },
  });
};

export const useUpdateReceptionProfile = (): UseMutationResult<
  TUpdateProfileResponse["data"],
  Sofiamatics.Response<unknown>,
  TUpdateProfileRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TUpdateProfileRequest) => {
      const response = await client.put<TUpdateProfileResponse["data"]>(
        "/v1/hospital/receptionist/dashboard/profile",
        payload.body
      );
      return response.data;
    },
  });
};

export const useChangeReceptionPassword = (): UseMutationResult<
  TChangePasswordResponse["data"],
  Sofiamatics.Response<unknown>,
  TChangePasswordRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TChangePasswordRequest) => {
      const response = await client.post<TChangePasswordResponse["data"]>(
        "/v1/hospital/receptionist/dashboard/change-password",
        payload.body
      );
      return response.data;
    },
  });
};
