import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import client from "@/config/client";
import {
  TChangePasswordRequest,
  TChangePasswordResponse,
  TDoctorListResp,
  THospitalProfileRequest,
  THospitalProfileResponse,
} from "@/interfaces/hospital";

export const useHospitalProfile = (): UseQueryResult<
  THospitalProfileResponse["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["hospital_profile"],
    queryFn: async () => {
      const res = await client.get<THospitalProfileResponse["data"]>(
        "/v1/hospital/profile"
      );
      return res.data;
    },
  });
};

export const useUpdateHospitalProfile = (): UseMutationResult<
  THospitalProfileResponse["data"],
  Sofiamatics.Response<unknown>,
  THospitalProfileRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: THospitalProfileRequest) => {
      const response = await client.put<THospitalProfileResponse["data"]>(
        "/v1/hospital/profile",
        payload.body
      );
      return response.data;
    },
  });
};

export const useChangePassword = (): UseMutationResult<
  TChangePasswordResponse["data"],
  Sofiamatics.Response<unknown>,
  TChangePasswordRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TChangePasswordRequest) => {
      const response = await client.post<TChangePasswordResponse["data"]>(
        "/v1/hospital/profile/change-password",
        payload.body
      );
      return response.data;
    },
  });
};

export const useFetchDoctors = (
  searchQuery?: string
): UseQueryResult<TDoctorListResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["hospitalDoctorsList", searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        perPage: "10",
      });

      if (searchQuery) params.append("searchTerm", searchQuery);

      const res = await client.get<TDoctorListResp["data"]>(
        `/v1/hospital/dashboard/doctors`,
        {
          params,
        }
      );
      return res.data;
    },
  });
};

export const useChangeUserPassword = (): UseMutationResult<
  TChangePasswordResponse["data"],
  Sofiamatics.Response<unknown>,
  TChangePasswordRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TChangePasswordRequest) => {
      const response = await client.post<TChangePasswordResponse["data"]>(
        "/v1/hospital/users/change-password",
        payload.body
      );
      return response.data;
    },
  });
};
