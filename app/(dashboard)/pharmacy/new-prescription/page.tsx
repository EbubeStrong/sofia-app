import { fetchAllPrescriptions, fetchHospitals } from "@/hooks/use-server-fetchers";
import { HospitalByIdResponse } from "@/interfaces/general";
import PharmacyLayoutModule from "@/layouts/pharmacy";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { cookies } from "next/headers";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    search?: string;
    priority?: string;
    visitStatus?: string;
    eventType?: string;
    date?: string;
    q?: string;
  };
};

const NewPrescriptionPage = async ({ searchParams }: Props) => {
     const cookieStore = cookies();
     const hospitalId = cookieStore.get(STORAGE_KEYS.HOSPITAL_ID)?.value as string;
  const {
    page_number,
    page_size,
    search,
    priority,
    visitStatus,
    eventType,
    date,
    q,
  } = searchParams;

  const params = new URLSearchParams({
    page: page_number ?? "1",
    perPage: page_size ?? "10",
    type:q ?? "prescription",
    ...(search && { searchTerm: search }),
    ...(priority && { priority }),
    ...(visitStatus && { visitStatus }),
    ...(eventType && { eventType }),
    ...(date && { date }),
  });

  const data = await fetchAllPrescriptions(params);
  const hospitals = await fetchHospitals(hospitalId);
  // console.log("hospitalId:", hospitalId);
  // console.log("hospital response:", JSON.stringify(hospitals, null, 2));
  // console.log("Fetched prescriptions data:", JSON.stringify(data, null, 2));


  return (
    <PharmacyLayoutModule
      initialData={
        data?.data ?? {
          data: [],
          page: 1,
          perPage: 10,
          totalCount: 0,
          totalPages: 0,
        }
      }
       hospitals={hospitals?.data as HospitalByIdResponse["data"]}
    />
  );
};

export default NewPrescriptionPage;
