import axiosServer from "@/config/axios-server";
import { TCheckinsResp } from "@/interfaces/checkin";
import {
  TBedsResp,
  TDepartmentsResp,
  TRoomsResp,
  TWardsResp,
} from "@/interfaces/configuration";
import {
  IDoctorResponse,
  TDoctorAppointmentResp,
  TDoctorAvailabilityResp,
  TDoctorPatientStatsProps,
} from "@/interfaces/doctors";
import { HospitalByIdResponse } from "@/interfaces/general";
import { TNursingQueueResp } from "@/interfaces/nurses";
import {
  TAllPatientsResp,
  TPatientRecordsById,
  TPatientsApiResponse,
  TPatientStatsProps,
} from "@/interfaces/patients";
import { TPharmacyPrescriptionDetailResp, TPharmacyPrescriptionQueueResp, TPharmacyQueueResp } from "@/interfaces/pharmacy";

export const fetchDoctorProfileById = async (
  id: string,
  params?: URLSearchParams
) => {
  return await axiosServer<IDoctorResponse>(`/v1/doctor/${id}/profile`, "GET", {
    params: Object.fromEntries(params ?? []),
  });
};

export const fetchDoctorAppointments = async (params?: URLSearchParams) => {
  return await axiosServer<TDoctorAppointmentResp>(
    "/v1/doctor/appointments/patients",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchDoctorAvailability = async (params?: URLSearchParams) => {
  return await axiosServer<TDoctorAvailabilityResp>(
    "/v1/doctor/availability",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchDoctorPatients = async (params?: URLSearchParams) => {
  return await axiosServer<TPatientsApiResponse>(
    "/v1/doctor/patients-profile",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchDoctorStats = async (params?: URLSearchParams) => {
  return await axiosServer<TDoctorPatientStatsProps>(
    "/v1/doctor/patients-statistics",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

// NEW APIS

export const fetchHospitals = async (id: string, params?: URLSearchParams) => {
  return await axiosServer<HospitalByIdResponse>(`/v1/hospitals/${id}`, "GET", {
    params: Object.fromEntries(params ?? []),
  });
};

export const fetchDepartments = async (params?: URLSearchParams) => {
  return await axiosServer<TDepartmentsResp>(
    "/v1/hospital/configurations/departments",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchWards = async (params?: URLSearchParams) => {
  return await axiosServer<TWardsResp>(
    "/v1/hospital/configurations/wards",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchRooms = async (params?: URLSearchParams) => {
  return await axiosServer<TRoomsResp>(
    "/v1/hospital/configurations/rooms",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchBeds = async (params?: URLSearchParams) => {
  return await axiosServer<TBedsResp>(
    "/v1/hospital/configurations/beds",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchAllCheckins = async (params?: URLSearchParams) => {
  return await axiosServer<TCheckinsResp>(
    "/v1/hospital/receptionist/dashboard/check-ins",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchAllPrescriptions = async (params?: URLSearchParams) => {
  const res =  await axiosServer<TPharmacyPrescriptionQueueResp>(
    "/v1/hospital/pharmacy/queue",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
  return res;
};



export const fetchAllPatients = async (params?: URLSearchParams) => {
  return await axiosServer<TAllPatientsResp>("/v1/hospital/patients", "GET", {
    params: Object.fromEntries(params ?? []),
  });
};

export const fetchPatientsById = async (
  id: string,
  params?: URLSearchParams
) => {
  return await axiosServer<TPatientRecordsById>(
    `/v1/hospital/patients/${id}`,
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchPatientStats = async (params?: URLSearchParams) => {
  return await axiosServer<TPatientStatsProps>(
    "/v1/hospital/patients/profile-statistics",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchAllNursingQueues = async (params?: URLSearchParams) => {
  return await axiosServer<TNursingQueueResp>(
    "/v1/hospital/nurse/queue",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};

export const fetchAllPharmacistQueues = async (params?: URLSearchParams) => {
  return await axiosServer<TPharmacyQueueResp>(
    "/v1/hospital/pharmacy/queue",
    "GET",
    {
      params: Object.fromEntries(params ?? []),
    }
  );
};
