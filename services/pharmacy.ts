import client from "@/config/client";
// import { TCheckinsResp } from "@/interfaces/checkin";
import { PharmacyStatsResp, TCreatePharmacyNewMedicineRequest, TCreatePharmacyNewMedicineRequestResponse, TCreatePharmacyNewPrescriptionRequest, TCreatePharmacyNewPrescriptionResponse,TPharmacyPrescriptionDetailResp, TPharmacyPrescriptionQueueData, TPharmacyProfile, TUpdatePharmacyProfileRequest, TUpdatePharmacyProfileResponse } from "@/interfaces/pharmacy";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";



export const useCreatePharmacyNewPrescripton = (): UseMutationResult<
  TCreatePharmacyNewPrescriptionResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePharmacyNewPrescriptionRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePharmacyNewPrescriptionRequest) => {
      const response = await client.post<TCreatePharmacyNewPrescriptionResponse["data"]>(
        "/v1/hospital/receptionist/check-in/create-patient",
        payload.body
      );
      return response.data;
    },
  });
};

export const useUpdatePharmacyPrescription = (type: string, patientConsultationId?: number, patientId?: string, medicationId?: number): UseMutationResult<
  TCreatePharmacyNewPrescriptionResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePharmacyNewPrescriptionRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePharmacyNewPrescriptionRequest) => {
      if (!patientConsultationId || !patientId) {
        throw new Error("Patient Consultation ID and Patient ID are required for this operation");
      }
      const response = await client.post<TCreatePharmacyNewPrescriptionResponse["data"]>(
        `/v1/hospital/pharmacy/consultations/${patientConsultationId}/patient/${patientId}/prescriptions/${medicationId}/${type}`,
        payload.body
      );
      return response.data;
    },
  });
};

export const useUpdatePharmacyNewMedicineRequest = (
  id: string
): UseMutationResult<
  TCreatePharmacyNewMedicineRequestResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePharmacyNewMedicineRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePharmacyNewMedicineRequest) => {
      const response = await client.put<TCreatePharmacyNewMedicineRequestResponse["data"]>(
        `/v1/hospital/pharmacy/inventory/${id}`,
        payload.body
      );
      return response.data;
    },
  });
};


export const useInventoryRecordById = (
  inventoryId: string
): UseQueryResult<TCreatePharmacyNewMedicineRequestResponse["data"], AxiosError> => {
  return useQuery({
    queryKey: ["inventory_single_record", inventoryId],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TCreatePharmacyNewMedicineRequestResponse["data"]>(
        `/v1/hospital/pharmacy/inventory/${inventoryId}`,
        { params }
      );
      return res.data;
    },
    enabled: Boolean(inventoryId),
  });
};


export const useCreatePharmacyNewMedicineRequest = (): UseMutationResult<
  TCreatePharmacyNewMedicineRequestResponse["data"],
  Sofiamatics.Response<unknown>,
  TCreatePharmacyNewMedicineRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TCreatePharmacyNewMedicineRequest) => {
      const response = await client.post<TCreatePharmacyNewMedicineRequestResponse["data"]>(
        "/v1/hospital/pharmacy/inventory",
        payload.body
      );
      return response.data;
    },
  });
};

export const usePharmacyPrescriptionStats = (): UseQueryResult<
  PharmacyStatsResp["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["pharmacy_stats"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<PharmacyStatsResp["data"]>(
        `/v1/hospital/pharmacy/dashboard/statistics`,
        { params }
      );
      return res.data;
    },
  });
};


export const useFetchPrescriptionTableData = (
  tableData: TPharmacyPrescriptionQueueData,
  activeTab: string,
  query?: string,
  priorityQuery?: string,
  visitStatusQuery?: string,
  eventTypeQuery?: string,
  dateQuery?: string
): UseQueryResult<TPharmacyPrescriptionQueueData, AxiosError> => {
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page_number") ?? "1";
  const pageSize = searchParams.get("page_size") ?? "10";

  const isInitialState =
    pageNumber === "1" &&
    activeTab === "prescription" &&
    !query &&
    !priorityQuery &&
    !visitStatusQuery &&
    !eventTypeQuery &&
    !dateQuery;

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

      const res = await client.get<TPharmacyPrescriptionQueueData>(
        "/v1/hospital/pharmacy/queue",
        { params }
      );
      console.log("prescription queue response", res.data);
      return res.data;
    },
    // initialData: pageNumber === "1" && !activeTab ? initialData : undefined,
    initialData: isInitialState ? tableData : undefined,
    enabled: Boolean(activeTab),
    placeholderData: (prev) => prev,
  });
};

export const useFetchPrescriptionDataByIds = (
  // tableData: TPharmacyNewPrescriptionResp["data"],
  activeTab: string,
  patientConsultationId?: number,
  patientId?: string,

): UseQueryResult<TPharmacyPrescriptionDetailResp["data"], AxiosError> => {
  // const searchParams = useSearchParams();

  

  // const isInitialState =
  //   activeTab === "prescription" &&
  //   patientConsultationId !== undefined &&
  //   patientId !== undefined;

  return useQuery({
    queryKey: queryKeys.pharmacy.prescriptions.prescriptionById(
    patientConsultationId,
    patientId,
    activeTab
  ),
    queryFn: async () => {
      if (!patientConsultationId || !patientId) {
        throw new Error("Missing ids");
      }
      const params = new URLSearchParams({
        type: activeTab,
        // consultationId: String(patientConsultationId),
        // patientId: patientId,
      });

      const res = await client.get<TPharmacyPrescriptionDetailResp["data"]>(
        `/v1/hospital/pharmacy/consultations/${patientConsultationId}/patient/${patientId}`,
        { params }
      );
      return res.data;
    },
    // initialData: isInitialState ? tableData : undefined,
    enabled: Boolean(activeTab && patientConsultationId && patientId),
    placeholderData: (prev) => prev,
  });
};

// export const useFetchRejectedPrescription = (
//   patientId?: string,
//   patientConsultationId?: number,
//   status?: "prescription" | "approved" | "reject" | "completed" | "archived",
//   options?: Omit<
//     UseQueryOptions<any, AxiosError, any, readonly unknown[]>,
//     "queryKey" | "queryFn"
//   >
// ) => {
//   return useQuery({
//     queryKey: queryKeys.pharmacy.prescriptions.patientLastRejected(patientId),
//     queryFn: async () => {
//       const res = await client.get(
//         `/v1/hospital/pharmacy/prescriptions/${patientId}/last-rejected`
//       );
//       return res.data;
//     },
//     enabled: status === "reject" && Boolean(patientId),
//     ...options,
//   });
// };

export const usePharmacyProfile = (): UseQueryResult<
  TPharmacyProfile["data"],
  AxiosError
> => {
  return useQuery({
    queryKey: ["pharmacy_profile"],
    queryFn: async () => {
      const params = new URLSearchParams({});
      const res = await client.get<TPharmacyProfile["data"]>(
        `/v1/hospital/Pharmacy/profile`,
        { params }
      );
      return res.data;
    },
  });
};

export const useUpdatePharmacyProfile = (): UseMutationResult<
  TUpdatePharmacyProfileResponse["data"],
  Sofiamatics.Response<unknown>,
  TUpdatePharmacyProfileRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TUpdatePharmacyProfileRequest) => {
      const response = await client.put<TUpdatePharmacyProfileResponse["data"]>(
        "/v1/hospital/Pharmacy/update-profile",
        payload.body
      );
      return response.data;
    },
  });
};
