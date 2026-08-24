import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import { fetchHospitals } from "@/hooks/use-server-fetchers";
import { HospitalByIdResponse } from "@/interfaces/general";
import OnboardingCompletionLayout from "@/layouts/auth/OnboardingCompletionLayout";
import { STORAGE_KEYS } from "@/utils/roles-enum";
import { cookies } from "next/headers";

const OnboardingCompletionModule = async () => {
  const cookieStore = cookies();
  const hospitalId = cookieStore.get(STORAGE_KEYS.HOSPITAL_ID)?.value as string;

  const hospitals = await fetchHospitals(hospitalId);

  return (
    <AuthWrapper>
      <OnboardingCompletionLayout
        hospitals={hospitals?.data as HospitalByIdResponse["data"]}
      />
    </AuthWrapper>
  );
};

export default OnboardingCompletionModule;
