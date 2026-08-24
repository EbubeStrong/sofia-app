import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

//components
import {
  completeDoctorProfile,
  fetchAllRequestDummy,
  fetchCountry,
  fetchDoctorAppointments,
  fetchDoctorPatients,
  fetchDoctorsAvailability,
  fetchDoctorSpeciality,
  fetchDoctorsProfile,
  fetchHospitals,
  fetchLowStockMedicineInventoryDummy,
  fetchMedicineInventoryDummy,
  fetchOrderHistoryDummy,
  fetchPracticeTypes,
  fetchStateByCountryId,
  forgotPassword,
  loginUser,
  registerUser,
  resendOtp,
  resetPassword,
  setDoctorAvailability,
  verifyOtp,
  fetchNearExpiryInventoryDummy,
  sendMultipleOrders,
  fetchMultipleOrders,
  processMultipleOrders,
  fetchMedicineInventory,
} from "./use-client-api";
import {
  AppointmentKey,
  IDoctorAppointmentData,
  IDoctorResponse,
  TDoctorAvailabilityResp,
} from "@/interfaces/doctors";
import { queryKeys } from "@/utils/queryKeys";
import { IQueryDependencies } from "@/interfaces/general";
import { TPatientsApiResponse } from "@/interfaces/patients";
import { dummyAllMedicineRequestData } from "@/components/Pharmacy/PharmacyMockData";
import { ICartItem } from "@/interfaces/pharmacy";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => loginUser(payload),
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => registerUser(payload),
  });
};

export const useCompleteProfile = (id: string) => {
  return useMutation({
    mutationFn: (payload: FormData) => completeDoctorProfile(id, payload),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => forgotPassword(payload),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => resendOtp(payload),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => verifyOtp(payload),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) => resetPassword(payload),
  });
};

export const useFetchCountry = () => {
  return useQuery({
    queryKey: queryKeys.general.countries,
    queryFn: () => {
      return fetchCountry();
    },
  });
};

export const useFetchStates = (countryId: string) => {
  return useQuery({
    queryKey: queryKeys.general.states(countryId),
    queryFn: () => {
      return fetchStateByCountryId(countryId);
    },
    enabled: !!countryId,
  });
};

export const useFetchHospitals = (dependencies: IQueryDependencies) => {
  return useQuery({
    queryKey: queryKeys.general.hospitals(dependencies.query),
    queryFn: () => {
      const params = new URLSearchParams({
        ...(dependencies.query && { searchTerm: dependencies.query ?? "" }),
      });
      return fetchHospitals(params);
    },
  });
};

export const useFetchPracticeTypes = () => {
  return useQuery({
    queryKey: queryKeys.general.practiceTypes,
    queryFn: () => {
      return fetchPracticeTypes();
    },
  });
};

export const useFetchDoctorAppointments = (
  initialData: IDoctorAppointmentData
) => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";
  const isUpcoming = searchParams.get("is_upcoming") ?? "true";

  return useQuery({
    queryKey: queryKeys.doctors.appointments(
      pageNumber,
      pageSize,
      searchQuery,
      isUpcoming
    ),
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        isUpcoming: isUpcoming ?? "true",
        ...(searchQuery && { searchTerm: searchQuery ?? "" }),
      });
      return fetchDoctorAppointments(params);
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};

export const useFetchDoctorSpeciality = () => {
  return useQuery({
    queryKey: queryKeys.general.speciality,
    queryFn: () => {
      return fetchDoctorSpeciality();
    },
  });
};

export const useFetchDoctorProfile = (
  doctorId: string,
  initialData: IDoctorResponse["data"]
) => {
  return useQuery({
    queryKey: queryKeys.doctors.profile,
    queryFn: () => {
      return fetchDoctorsProfile(doctorId);
    },
    enabled: !!doctorId,
    initialData,
  });
};

export const useFetchDoctorAvailability = (
  initialData: TDoctorAvailabilityResp["data"]
) => {
  const searchParams = useSearchParams();
  const appointmentType = searchParams.get("appointment_type") as string;

  return useQuery({
    queryKey: queryKeys.doctors.availability(appointmentType),
    queryFn: () => {
      const params = new URLSearchParams({
        appointmentType: appointmentType || AppointmentKey.PHYSICAL,
      });
      return fetchDoctorsAvailability(params);
    },
    initialData,
  });
};

export const useSetAvailability = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      setDoctorAvailability(payload),
  });
};

export const useFetchDoctorPatients = (
  initialData: TPatientsApiResponse["data"] | undefined,
  doctorId: string
) => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: queryKeys.doctors.patients(
      pageNumber,
      pageSize,
      searchQuery,
      doctorId
    ),
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        doctorId: doctorId,
        ...(searchQuery && { searchTerm: searchQuery ?? "" }),
      });
      return fetchDoctorPatients(params);
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};


export const useFetchMedicineInventory = (tabKey?: string) => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: [
      ...queryKeys.pharmacy.inventory(
        pageNumber,
        pageSize,
        searchQuery
      ),
      tabKey || "medicine"
    ],
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber,
        perPage: pageSize,
        ...(searchQuery && { searchTerm: searchQuery }),
      });

      // todo fetch real data when api is ready for now fetch dummy
      return fetchMedicineInventoryDummy(params);
      // return fetchMedicineInventory(params);
    },
    placeholderData: keepPreviousData,
  });
};

export const useFetchNearExpiryInventory = (tabKey?: string) => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: [
      ...queryKeys.pharmacy.patientInventory(
        pageNumber,
        pageSize,
        searchQuery
      ),
      tabKey || "patients"
    ],
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber,
        perPage: pageSize,
        ...(searchQuery && { searchTerm: searchQuery }),
      });

      // todo fetch real data when api is ready for now fetch dummy
      return fetchNearExpiryInventoryDummy(params);
    },
    placeholderData: keepPreviousData,
  });
};

export const useFetchLowStockMedicineInventory = () => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: queryKeys.pharmacy.lowStock(
      pageNumber,
      pageSize,
      searchQuery
    ),
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber,
        perPage: pageSize,
        ...(searchQuery && { searchTerm: searchQuery }),
      });

      // todo fetch real data when api is ready for now fetch dummy
      return fetchLowStockMedicineInventoryDummy(params);
    },
    placeholderData: keepPreviousData,
  });
};

export const useFetchAllMedicineRequests = () => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: queryKeys.pharmacy.allCartRequest(
      pageNumber,
      pageSize,
      searchQuery
    ),
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber,
        perPage: pageSize,
        ...(searchQuery && { searchTerm: searchQuery }),
      });

      // todo fetch real data when api is ready for now fetch dummy
      return fetchAllRequestDummy(params);
    },
    placeholderData: keepPreviousData,
  });
};



export const useFetchCartItemsByIds = (ids: string[]) => {
  return useQuery({
    queryKey: ["cart-items-by-ids", ids],
    enabled: ids.length > 0,
    queryFn: async (): Promise<ICartItem[]> => {
      // simulate backend filtering
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            dummyAllMedicineRequestData.filter((item:ICartItem) =>
              ids.includes(item.cartId)
            )
          );
        }, 300);
      });
    },
  });
};


export const useFetchOrderHistory = () => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";
  const searchQuery = searchParams.get("query") ?? "";

  return useQuery({
    queryKey: queryKeys.pharmacy.orderHistory(
      pageNumber,
      pageSize,
      searchQuery
    ),
    queryFn: () => {
      const params = new URLSearchParams({
        page: pageNumber,
        perPage: pageSize,
        ...(searchQuery && { searchTerm: searchQuery }),
      });

      // todo fetch real data when api is ready for now fetch dummy
      return fetchOrderHistoryDummy(params);
    },
    placeholderData: keepPreviousData,
  });
};



export const useSendMultipleOrders = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      sendMultipleOrders(payload),
  });
};

export const useFetchMultipleOrders = () => {
  return useQuery({
    queryKey: queryKeys.pharmacy.multipleOrders,
    queryFn: fetchMultipleOrders,
  });
};

export const useProcessMultipleOrders = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      processMultipleOrders(payload),
  });
};


