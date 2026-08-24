import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

import client from "@/config/client";
import {
  Countries,
  CountryResponse,
  HospitalResponse,
  IHospitalData,
  InsuranceResponse,
  IStates,
  RolesResponse,
  StatesResponse,
} from "@/interfaces/general";
import { queryKeys } from "@/utils/queryKeys";
import { ROLES } from "@/utils/roles-enum";

export const useCountries = (): UseQueryResult<Countries[], AxiosError> => {
  return useQuery({
    queryKey: [queryKeys.general.countries],
    queryFn: async () => {
      const res = await client.get<CountryResponse["data"]>("/v1/countries");
      return res.data;
    },
  });
};

export const useStates = (
  countryId: string
): UseQueryResult<IStates[], AxiosError> => {
  return useQuery({
    queryKey: [queryKeys.general.states(countryId)],
    queryFn: async () => {
      const params = new URLSearchParams({
        countryId: countryId,
      });
      const res = await client.get<StatesResponse["data"]>(
        `/v1/states-by-country/${countryId}`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(countryId),
  });
};

export const useHospitals = (
  countryId: string,
  query: string
): UseQueryResult<IHospitalData, AxiosError> => {
  return useQuery({
    queryKey: [queryKeys.general.hospitals(query, countryId)],
    queryFn: async () => {
      const params = new URLSearchParams({
        countryId: countryId,
        ...(query && { searchTerm: query }),
      });
      const res = await client.get<HospitalResponse["data"]>("/v1/hospitals", {
        params,
      });
      return res.data;
    },
    enabled: Boolean(countryId) || query.length > 0,
  });
};

export const useFetchRoles = (
  role: string
): UseQueryResult<RolesResponse["data"], AxiosError> => {
  return useQuery({
    queryKey: [queryKeys.general.roles(role)],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<RolesResponse["data"]>(
        "/v1/hospital/get-roles",
        {
          params,
        }
      );
      return res.data;
    },
    enabled: role === ROLES.HOSPITAL,
  });
};

export const useInsurance = (
  query: string
): UseQueryResult<InsuranceResponse["data"], AxiosError> => {
  return useQuery({
    queryKey: [queryKeys.general.insurance(query)],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(query && { searchTerm: query }),
      });
      const res = await client.get<InsuranceResponse["data"]>(
        "/v1/insurances",
        { params }
      );
      return res.data;
    },
    // enabled: query.length > 0,
  });
};
