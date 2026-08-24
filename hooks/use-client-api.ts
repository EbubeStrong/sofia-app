import { dummyAllMedicineRequestData, dummyInventoryData, dummyLowStockInventoryData, dummyOrderHistoryData, dummyInventoryNearExpiryData } from "@/components/Pharmacy/PharmacyMockData";
import axiosClient from "@/config/axios-client";
import {
  IDoctorAppointmentData,
  IDoctorResponse,
  TDoctorAvailabilityData,
} from "@/interfaces/doctors";
import {
  ICountries,
  IDocSpeciality,
  IHospitalData,
  IPraticeTypes,
  IStates,
} from "@/interfaces/general";
import { TPatientsApiResponse } from "@/interfaces/patients";
import { IAllRequestMedicineResponse, ILowStockInventoryResponse, IMedicineInventoryResponse, IPatientInventoryResponse, IOrderHistoryResponse } from "@/interfaces/pharmacy";

export const loginUser = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor-auth/login",
    data: payload,
  });

  return response;
};

export const registerUser = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor-auth/sign-up",
    data: payload,
  });

  return response;
};

export const completeDoctorProfile = async (id: string, payload: FormData) => {
  const response = await axiosClient.Api({
    method: "PUT",
    url: `/v1/doctor/${id}/update-profile`,
    data: payload,
  });

  return response;
};

export const forgotPassword = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/auth/hospital/forgot-password",
    data: payload,
  });

  return response;
};

export const fetchCountry = async () => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/countries`,
  });
  const data: ICountries[] = response?.data;
  return data;
};

export const fetchStateByCountryId = async (id: string) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/states-by-country/${id}`,
  });
  const data: IStates[] = response?.data;
  const filteredStates = data?.map((s) => ({
    label: s.name,
    value: s.id.toString(),
  }));
  return filteredStates;
};

export const fetchHospitals = async (params: URLSearchParams) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/hospitals`,
    params,
  });
  const data: IHospitalData = response?.data;
  return data;
};

export const fetchPracticeTypes = async () => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/practice-types`,
  });
  const data: IPraticeTypes[] = response?.data;
  return data;
};

export const fetchDoctorSpeciality = async () => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor-speciality`,
  });
  const data: IDocSpeciality[] = response?.data;
  return data;
};

export const resendOtp = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor-auth/resend-otp",
    data: payload,
  });

  return response;
};

export const verifyOtp = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor-auth/verify-otp",
    data: payload,
  });

  return response;
};

export const resetPassword = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor-auth/reset-password",
    data: payload,
  });

  return response;
};

export const changePassword = async (payload: Record<string, unknown>) => {
  const response = await axiosClient.Api({
    method: "PUT",
    url: "/v1/doctor-auth/change-password",
    data: payload,
  });

  return response;
};

export const fetchDoctorsById = async (id: string) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor/${id}`,
  });
  const data: IDoctorResponse = response?.data;
  return data;
};

export const fetchDoctorAppointments = async (params: URLSearchParams) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor/appointments/patients`,
    params,
  });

  const data: IDoctorAppointmentData = response?.data;
  return data;
};

export const fetchDoctorsProfile = async (id: string) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor/${id}/profile`,
  });

  const data = response?.data;
  return data;
};

export const fetchDoctorsAvailability = async (params: URLSearchParams) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor/availability`,
    params,
  });

  const data: TDoctorAvailabilityData[] = response?.data;
  return data;
};

export const setDoctorAvailability = async (
  payload: Record<string, unknown>
) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/doctor/availability",
    data: payload,
  });

  return response;
};

export const fetchDoctorPatients = async (params: URLSearchParams) => {
  const response = await axiosClient.Api({
    method: "GET",
    url: `/v1/doctor/patients-profile`,
    params,
  });

  const data: TPatientsApiResponse["data"] = response?.data;
  return data;
};

export const fetchMedicineInventory = async (
  params: URLSearchParams
) => {

  const response = await axiosClient.Api({
    method: "GET", 
    url: `/v1/hospital/pharmacy/inventory`,
    params,
  });
  
  const data: IMedicineInventoryResponse["data"] = response?.data;
  return data;
};



export const fetchMedicineInventoryDummy = async (
  params: URLSearchParams
): Promise<IMedicineInventoryResponse> => {
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page,
        perPage,
        totalCount: dummyInventoryData.length,
        data: dummyInventoryData,
      });
    }, 500); 
  });
};

export const fetchNearExpiryInventoryDummy = async (
  params: URLSearchParams
): Promise<IPatientInventoryResponse> => {
  
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page,
        perPage,
        totalCount: dummyInventoryNearExpiryData.length,
        data: dummyInventoryNearExpiryData,
      });
    }, 500); 
  });
};

export const fetchLowStockMedicineInventoryDummy = async (
  params: URLSearchParams
): Promise<ILowStockInventoryResponse> => {
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page,
        perPage,
        totalCount: dummyLowStockInventoryData.length,
        data: dummyLowStockInventoryData,
      });
    }, 500); 
  });
};

export const fetchAllRequestDummy = async (
  params: URLSearchParams
): Promise<IAllRequestMedicineResponse> => {
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page,
        perPage,
        totalCount: dummyAllMedicineRequestData.length,
        data: dummyAllMedicineRequestData,
      });
    }, 500); 
  });
};

export const fetchOrderHistoryDummy = async (
  params: URLSearchParams
): Promise<IOrderHistoryResponse> => {
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        page,
        perPage,
        totalCount: dummyOrderHistoryData.length,
        data: dummyOrderHistoryData,
      });
    }, 500); 
  });
};

export const sendMultipleOrders = async (
  payload: Record<string, unknown>
) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/pharmacy/multiple-orders",
    data: payload,
  });

  return response;
};

export const fetchMultipleOrders = async () => {
  const response = await axiosClient.Api({
    method: "GET",
    url: "/v1/pharmacy/multiple-orders",
  });

  return response.data;
};

export const processMultipleOrders = async (
  payload: Record<string, unknown>
) => {
  const response = await axiosClient.Api({
    method: "POST",
    url: "/v1/pharmacy/multiple-orders/process",
    data: payload,
  });

  return response;
};

