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
  PatientTab,
  TAllPatientsResp,
  TPatientActivityResp,
  TPatientAllergiesResp,
  TPatientComplaintResp,
  TPatientDiagnosisResp,
  TPatientDoctorNotesResp,
  TPatientImagingResp,
  TPatientNursesNoteResp,
  TPatientRecordsById,
  TPatientSurgeriesResp,
  TPatientTestsResp,
  TPatientTreatmentsResp,
  TPatientVaccinationsResp,
  TPatientVitalsResp,
} from "@/interfaces/patients";
import {
  TCreateEmergencyRequest,
  TCreateEmergencyResponse,
  TCreateInsuranceRequest,
  TCreateInsuranceResponse,
  TCreatePatientRequest,
  TCreatePatientResponse,
} from "@/interfaces/checkin";
import { fetchPatientTabMock } from "@/components/Pharmacy/PharmacyMockData";

export const useUpdatePatientInfo = (
  id: string
): UseMutationResult<
  TCreatePatientResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePatientRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePatientRequest) => {
      const response = await client.put<TCreatePatientResponse["data"]>(
        `/v1/hospital/patients/${id}`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useUpdateInsuranceInfo = (
  id: string
): UseMutationResult<
  TCreateInsuranceResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreateInsuranceRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreateInsuranceRequest) => {
      const response = await client.put<TCreateInsuranceResponse["data"]>(
        `/v1/hospital/patients/${id}/insurance`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useUpdateEmergencyInfo = (
  id: string
): UseMutationResult<
  TCreateEmergencyResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreateEmergencyRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreateEmergencyRequest) => {
      const response = await client.put<TCreateEmergencyResponse["data"]>(
        `/v1/hospital/patients/${id}/emergency-contact`,
        payload.body
      );
      return response.data;
    },
  });
};

export const usePatientSingleRecord = (
  patientId: string
): UseQueryResult<TPatientRecordsById["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_single_record", patientId],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TPatientRecordsById["data"]>(
        `/v1/hospital/patients/${patientId}`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const useFetchPatients = (
  initialData: TAllPatientsResp["data"],
  query: string
): UseQueryResult<TAllPatientsResp["data"], AxiosError> => {
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  return useQuery({
    queryKey: ["patients", pageNumber, pageSize, query],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        ...(query && { searchTerm: query }),
      });
      const res = await client.get<TAllPatientsResp["data"]>(
        "/v1/hospital/patients",
        { params }
      );
      return res.data;
    },
    initialData: pageNumber === "1" ? initialData : undefined,
  });
};

export const usePatientActivity = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientActivityResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_activity", pageNumber, pageSize, patientId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientActivityResp["data"]>(
        `/v1/hospital/patients/${patientId}/recent-activity`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientComplaint = (
  patientId: string
): UseQueryResult<TPatientComplaintResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_complaint", patientId],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TPatientComplaintResp["data"]>(
        `/v1/hospital/patients/${patientId}/complaints`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientVitals = (
  patientId: string
): UseQueryResult<TPatientVitalsResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_vitals", patientId],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TPatientVitalsResp["data"]>(
        `/v1/hospital/patients/${patientId}/vitals`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientDiagnosis = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientDiagnosisResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_diagnosis", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientDiagnosisResp["data"]>(
        `/v1/hospital/patients/${patientId}/diagnoses`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientTests = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientTestsResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_tests", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientTestsResp["data"]>(
        `/v1/hospital/patients/${patientId}/tests`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientImaging = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientImagingResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_imaging", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientImagingResp["data"]>(
        `/v1/hospital/patients/${patientId}/imaging`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientDoctorNotes = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientDoctorNotesResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_doctor_notes", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientDoctorNotesResp["data"]>(
        `/v1/hospital/patients/${patientId}/doctors-notes`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientAllergies = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientAllergiesResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_allergies", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientAllergiesResp["data"]>(
        `/v1/hospital/patients/${patientId}/allergies`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientTreatments = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientTreatmentsResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_treatments", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientTreatmentsResp["data"]>(
        `/v1/hospital/patients/${patientId}/treatment`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientNursesNotes = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientNursesNoteResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_nurses_notes", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientNursesNoteResp["data"]>(
        `/v1/hospital/patients/${patientId}/nurses-notes`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientSurgeries = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientSurgeriesResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_surgeries", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
        
      });
      const res = await client.get<TPatientSurgeriesResp["data"]>(
        `/v1/hospital/patients/${patientId}/surgeries`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};

export const usePatientVaccinations = (
  patientId: string,
  pageNumber: string,
  pageSize: string
): UseQueryResult<TPatientVaccinationsResp["data"], AxiosError> => {
  return useQuery({
    queryKey: ["patient_vaccinations", patientId, pageNumber, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: pageNumber ?? "1",
        perPage: pageSize ?? "10",
      });
      const res = await client.get<TPatientVaccinationsResp["data"]>(
        `/v1/hospital/patients/${patientId}/vaccinations`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(patientId),
  });
};


export const useFetchPatientsDataByTab = (
  patientId: string,
  tab: PatientTab,
  pageNumber: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["patient-checkins", patientId, tab, pageNumber, pageSize,],
    // actual function for calling the api
    // queryFn: async () => {
    //   const params = new URLSearchParams({
    //     page: pageNumber.toString() ?? "1",
    //     perPage: pageSize.toString() ?? "10",
    //     tab: tab,
    //   });
    //   const res = await client.get(
    //     `/patients/${patientId}/tabs`,
    //     { params }
    
      // );
      // return res.data;
    //},
     queryFn: () =>
      fetchPatientTabMock(tab, pageNumber, pageSize),
    enabled: !!patientId && !!tab,
    placeholderData: (prev) => prev,
  });
};