import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";

import client from "@/config/client";
import {
  BedsRequest,
  BedsResponse,
  DepartmentRequest,
  DepartmentResponse,
  RoomsRequest,
  RoomsResponse,
  TBedsResp,
  TBedTypesResp,
  TDepartmentsResp,
  TRoomsResp,
  TRoomTypesResp,
  TWardsResp,
  WardsRequest,
  WardsResponse,
} from "@/interfaces/configuration";

export const useDepartments = (): UseMutationResult<
  DepartmentResponse["data"],
  Sofiamatics.Response<unknown>,
  DepartmentRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: DepartmentRequest) => {
      const response = await client.post<DepartmentResponse["data"]>(
        "/v1/hospital/configurations/departments",
        payload.body
      );
      return response.data;
    },
  });
};

export const useFetchDepartments = (
  initialData?: TDepartmentsResp["data"]
): UseQueryResult<TDepartmentsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  return useQuery({
    queryKey: ["departments", pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TDepartmentsResp["data"]>(
        "/v1/hospital/configurations/departments",
        { params }
      );
      return res.data;
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};

export const useWards = (): UseMutationResult<
  WardsResponse["data"],
  Sofiamatics.Response<unknown>,
  WardsRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: WardsRequest) => {
      const response = await client.post<WardsResponse["data"]>(
        "/v1/hospital/configurations/wards",
        payload.body
      );
      return response.data;
    },
  });
};

export const useRooms = (): UseMutationResult<
  RoomsResponse["data"],
  Sofiamatics.Response<unknown>,
  RoomsRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: RoomsRequest) => {
      const response = await client.post<RoomsResponse["data"]>(
        "/v1/hospital/configurations/rooms",
        payload.body
      );
      return response.data;
    },
  });
};

export const useBeds = (): UseMutationResult<
  BedsResponse["data"],
  Sofiamatics.Response<unknown>,
  BedsRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: BedsRequest) => {
      const response = await client.post<BedsResponse["data"]>(
        "/v1/hospital/configurations/beds",
        payload.body
      );
      return response.data;
    },
  });
};

export const useFetchWards = (
  initialData?: TWardsResp["data"]
): UseQueryResult<TWardsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  return useQuery({
    queryKey: ["wards", pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TWardsResp["data"]>(
        "/v1/hospital/configurations/wards",
        { params }
      );
      return res.data;
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};

export const useFetchRoomTypes = (): UseQueryResult<
  TRoomTypesResp["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TRoomTypesResp["data"]>(
        "/v1/hospital/configurations/room-types",
        { params }
      );
      return res.data;
    },
  });
};

export const useFetchBedTypes = (): UseQueryResult<
  TBedTypesResp["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["bedTypes"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TBedTypesResp["data"]>(
        "/v1/hospital/configurations/bed-types",
        { params }
      );
      return res.data;
    },
  });
};

export const useFetchRooms = (
  initialData?: TRoomsResp["data"]
): UseQueryResult<TRoomsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  return useQuery({
    queryKey: ["rooms", pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TRoomsResp["data"]>(
        "/v1/hospital/configurations/rooms",
        { params }
      );
      return res.data;
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};

export const useFetchBeds = (
  initialData?: TBedsResp["data"]
): UseQueryResult<TBedsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  return useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TBedsResp["data"]>(
        "/v1/hospital/configurations/beds",
        { params }
      );
      return res.data;
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};
